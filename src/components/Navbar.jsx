import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Navbar.css'

const links = [
  { to: '/',         label: 'Home'     },
  { to: '/writeups', label: 'Writeups' },
  { to: '/about',    label: 'About'    },
]

export default function Navbar() {
  return (
    <motion.nav
      className="navbar glass-card"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar-inner">

        {/* ── Logo ── CHANGE: update "cosmic09" to your actual handle */}
        <NavLink to="/" className="navbar-logo">
          <span className="logo-bracket">&lt;</span>
          COSMIC
          <span className="logo-bracket">/&gt;</span>
        </NavLink>

        {/* Nav links */}
        <ul className="navbar-links">
          {links.map(({ to, label }) => (
            <li key={to}>
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

        {/* ── CTA ── CHANGE: update href to your actual email */}
        <a href="mailto:kundepremchand@gmail.com" className="navbar-cta">
          Connect with Me
        </a>

      </div>
    </motion.nav>
  )
}
