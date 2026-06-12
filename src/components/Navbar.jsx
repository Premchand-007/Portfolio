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
  const [hoveredIdx, setHoveredIdx]     = useState(null)
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const [hidden, setHidden]             = useState(false)
  const lastY = useRef(0)
  const listRef = useRef(null)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const diff = y - lastY.current
    if (y < 60) {
      // always show near the top
      setHidden(false)
    } else if (diff > 6) {
      // scrolling down — hide
      setHidden(true)
    } else if (diff < -6) {
      // scrolling up — show
      setHidden(false)
    }
    lastY.current = y
  })

  const handleMouseEnter = (e, idx) => {
    setHoveredIdx(idx)
    const li = e.currentTarget
    const list = listRef.current
    const listRect = list.getBoundingClientRect()
    const liRect   = li.getBoundingClientRect()
    setIndicatorStyle({ width: liRect.width, left: liRect.left - listRect.left })
  }

  const handleMouseLeave = () => setHoveredIdx(null)

  return (
    <motion.nav
      className="navbar glass-card"
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y:       hidden ? -80 : 0,
        opacity: hidden ? 0  : 1,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
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
