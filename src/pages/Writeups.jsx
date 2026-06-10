import { motion } from 'framer-motion'
import './Writeups.css'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 36 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

// ── CHANGE: add / edit your pentest findings here ────────────
const writeups = [
  {
    id: 1,
    title:    'Privilege Escalation via URL Path Manipulation',
    target:   'Soxial Space',
    severity: 'Critical',
    badge:    'badge-critical',
    owasp:    'API1:2023',
    summary:  'Brand/Creator users could access admin-only endpoints by manipulating the URL path with no additional authentication required, achieving full privilege escalation.',
    tags:     ['Broken Access Control', 'Auth Bypass', 'API'],
    date:     'Mar 2026',
  },
  {
    id: 2,
    title:    'Excessive Data Exposure on Creator Discovery API',
    target:   'Soxial Space',
    severity: 'Medium',
    badge:    'badge-medium',
    owasp:    'API3:2023',
    summary:  'Creator discovery endpoint returned sensitive internal fields beyond what the UI required — exposing email hashes, internal IDs, and metadata not intended for public consumption.',
    tags:     ['Data Exposure', 'API', 'OWASP'],
    date:     'Mar 2026',
  },
  {
    id: 3,
    title:    'IDOR on Profile Image Storage Endpoints',
    target:   'Soxial Space',
    severity: 'Low',
    badge:    'badge-low',
    owasp:    'API1:2023',
    summary:  'Insecure direct object reference on profile image storage paths. Assessed as Low/Informational given the public nature of profile images, with recommendation to audit higher-impact storage paths.',
    tags:     ['IDOR', 'Storage', 'Recon'],
    date:     'Mar 2026',
  },
]

export default function Writeups() {
  return (
    <div className="writeups-page">
      <div className="writeups-inner">

        <motion.div className="writeups-header" {...fadeUp(0.1)}>
          <span className="tag">Pentest Reports</span>
          <h1 className="writeups-title">Writeups</h1>
          <p className="writeups-sub">
            Authorized penetration test findings — full methodology, impact
            assessment, and remediation guidance.
          </p>
        </motion.div>

        <div className="writeups-list">
          {writeups.map((w, i) => (
            <motion.article
              key={w.id}
              className="glass-card writeup-card"
              {...fadeUp(0.15 + i * 0.08)}
            >
              <div className="wc-top">
                <div className="wc-meta">
                  <span className={`tag ${w.badge}`}>{w.severity}</span>
                  <span className="wc-owasp">{w.owasp}</span>
                  <span className="wc-date">{w.date}</span>
                </div>
                <span className="wc-target">{w.target}</span>
              </div>

              <h2 className="wc-title">{w.title}</h2>
              <p className="wc-summary">{w.summary}</p>

              <div className="wc-bottom">
                <div className="wc-tags">
                  {w.tags.map(t => (
                    <span key={t} className="wc-tag">{t}</span>
                  ))}
                </div>
                {/* CHANGE: link to your actual report PDF/page when ready */}
                <button className="wc-read-btn">Read Report →</button>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </div>
  )
}
