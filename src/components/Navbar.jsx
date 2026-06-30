import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import './Navbar.css'

const links = [
  { to: '/',         label: 'Home'     },
  { to: '/writeups', label: 'Writeups' },
  { to: '/about',    label: 'About'    },
]

export default function Navbar() {
  const [hoveredIdx, setHoveredIdx]         = useState(null)
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const [hidden, setHidden]                 = useState(false)
  const lastY   = useRef(0)
  const listRef = useRef(null)
  const canvasRef = useRef(null)
  const animRef   = useRef(null)

  /* ── hide/show on scroll ── */
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const diff = y - lastY.current
    if (y < 60)        setHidden(false)
    else if (diff >  6) setHidden(true)
    else if (diff < -6) setHidden(false)
    lastY.current = y
  })

  /* ── border tracer canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let t = 0          // progress 0..1 along the perimeter
    let dpr = window.devicePixelRatio || 1

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width  = rect.width  * dpr
      canvas.height = rect.height * dpr
      canvas.style.width  = rect.width  + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Build the rounded-rect path as a list of points, including corner arcs
    const getPoint = (progress, w, h, r) => {
      // straight segment lengths (corners eat 2r off each edge)
      const topLen    = w - 2 * r
      const rightLen  = h - 2 * r
      const bottomLen = w - 2 * r
      const leftLen   = h - 2 * r
      const arcLen    = (Math.PI * r) / 2   // quarter circle

      const perim = topLen + arcLen + rightLen + arcLen + bottomLen + arcLen + leftLen + arcLen
      let d = progress * perim

      // top edge (left → right)
      if (d < topLen) {
        return { x: r + d, y: 0 }
      }
      d -= topLen

      // top-right corner arc (center: w-r, r)
      if (d < arcLen) {
        const a = (d / arcLen) * (Math.PI / 2) - Math.PI / 2
        return { x: w - r + r * Math.cos(a), y: r + r * Math.sin(a) }
      }
      d -= arcLen

      // right edge (top → bottom)
      if (d < rightLen) {
        return { x: w, y: r + d }
      }
      d -= rightLen

      // bottom-right corner arc (center: w-r, h-r)
      if (d < arcLen) {
        const a = (d / arcLen) * (Math.PI / 2)
        return { x: w - r + r * Math.cos(a), y: h - r + r * Math.sin(a) }
      }
      d -= arcLen

      // bottom edge (right → left)
      if (d < bottomLen) {
        return { x: w - r - d, y: h }
      }
      d -= bottomLen

      // bottom-left corner arc (center: r, h-r)
      if (d < arcLen) {
        const a = (d / arcLen) * (Math.PI / 2) + Math.PI / 2
        return { x: r + r * Math.cos(a), y: h - r + r * Math.sin(a) }
      }
      d -= arcLen

      // left edge (bottom → top)
      if (d < leftLen) {
        return { x: 0, y: h - r - d }
      }
      d -= leftLen

      // top-left corner arc (center: r, r)
      const a = (d / arcLen) * (Math.PI / 2) + Math.PI
      return { x: r + r * Math.cos(a), y: r + r * Math.sin(a) }
    }

    const TAIL = 0.09   // tail length as fraction of perimeter
    const SPEED = 0.0018

    const draw = () => {
      const W = canvas.width  / dpr
      const H = canvas.height / dpr
      const R = 16

      ctx.clearRect(0, 0, W, H)

      // draw tail — fading gradient trail
      const steps = 60
      for (let i = 0; i < steps; i++) {
        const frac = i / steps
        const tp   = ((t - TAIL * frac + 1) % 1)
        const p    = getPoint(tp, W, H, R)
        const alpha = frac * 0.7
        const size  = 1.5 + frac * 2.5

        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 180, 255, ${alpha})`
        ctx.fill()
      }

      // head — bright bloom dot
      const head = getPoint(t, W, H, R)

      // outer glow
      const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 18)
      glow.addColorStop(0,   'rgba(140, 200, 255, 0.55)')
      glow.addColorStop(0.4, 'rgba(100, 140, 255, 0.25)')
      glow.addColorStop(1,   'rgba(80,  100, 255, 0)')
      ctx.beginPath()
      ctx.arc(head.x, head.y, 18, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      // core dot
      ctx.beginPath()
      ctx.arc(head.x, head.y, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#c0e8ff'
      ctx.shadowColor = '#7dd3fc'
      ctx.shadowBlur  = 12
      ctx.fill()
      ctx.shadowBlur = 0

      t = (t + SPEED) % 1
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /* ── pill hover ── */
  const handleMouseEnter = (e, idx) => {
    setHoveredIdx(idx)
    const li   = e.currentTarget
    const list = listRef.current
    const lr   = list.getBoundingClientRect()
    const li_r = li.getBoundingClientRect()
    setIndicatorStyle({ width: li_r.width, left: li_r.left - lr.left })
  }
  const handleMouseLeave = () => setHoveredIdx(null)

  return (
    <motion.nav
      className="navbar glass-card"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* tracer canvas — sits behind all content */}
      <canvas ref={canvasRef} className="navbar-tracer" />

      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-bracket">&lt;</span>
          COSMIC
          <span className="logo-bracket">/&gt;</span>
        </NavLink>

        <ul className="navbar-links" ref={listRef} onMouseLeave={handleMouseLeave}>
          {hoveredIdx !== null && (
            <motion.div
              className="nav-hover-pill"
              layoutId="nav-pill"
              initial={false}
              animate={{ width: indicatorStyle.width, left: indicatorStyle.left }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {links.map(({ to, label }, idx) => (
            <li key={to} onMouseEnter={(e) => handleMouseEnter(e, idx)}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a href="mailto:kundepremchand@gmail.com" className="navbar-cta">
          Connect with Me
        </a>
      </div>
    </motion.nav>
  )
}
