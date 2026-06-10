import { motion } from 'framer-motion'
import './About.css'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 36 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

// ── CHANGE: update all links to your real profiles ───────────
const socials = [
  { label: 'GitHub',    href: 'https://github.com/Premchand-007',     icon: '⌥' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/premchand-kunde-337438328/', icon: '◈' },
  { label: 'Instagram', href: 'https://instagram.com/premchand.009',   icon: '⬡' },
  { label: 'Bugbase', href: 'https://bugbase.ai/profile/cosmic-009',     icon: '◎' },
]

export default function About() {
  return (
    <div className="about-page">
      <div className="about-inner">

        <motion.div className="glass-card about-bio-card" {...fadeUp(0.1)}>
          <div className="about-avatar-row">
            <div className="about-avatar">
              <img src="/favicon.svg" alt="cosmic09 logo" />
            </div>
            <div>
              {/* CHANGE: your real name or handle */}
              <h1 className="about-name">KUNDE PREMCHAND</h1>
              <p className="about-handle">Security Researcher · Pentester · CTF Player</p>
            </div>
          </div>

          {/* CHANGE: write your own bio */}
          <p className="about-bio">
            I'm a security researcher focused on web application vulnerabilities,
            authorized penetration testing, and bug bounty hunting. I enjoy finding
            logic flaws and access control issues that scanners miss.
          </p>
          <p className="about-bio">
            Currently completing authorized pentests and actively hunting on bug
            bounty programs. When I'm not breaking things, I'm doing CTFs to
            sharpen my offensive skills.
          </p>

          {/* CHANGE: your real email */}
          <a href="mailto:kundepremchand@gmail.com" className="btn-primary about-cta">
            Get in touch
          </a>
        </motion.div>

        <motion.div className="glass-card about-socials-card" {...fadeUp(0.2)}>
          <h2 className="about-section-label">Find me on</h2>
          <div className="socials-grid">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-link">
                <span className="social-icon">{s.icon}</span>
                <span>{s.label}</span>
                <span className="social-arrow">↗</span>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
