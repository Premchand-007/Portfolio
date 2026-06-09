import { motion } from 'framer-motion'
import './Home.css'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

// ── CHANGE: update skills to match your actual toolkit ──────
const skills = [
  {
    category: 'Offensive',
    items: ['Web App Pentesting', 'OWASP Top 10', 'Burp Suite', 'SQLi / XSS / IDOR', 'Privilege Escalation'],
  },
  {
    category: 'Recon',
    items: ['Subdomain Enumeration', 'OSINT', 'Shodan', 'Google Dorking', 'Nuclei'],
  },
  {
    category: 'Tooling',
    items: ['Python', 'Bash', 'Nmap', 'Burp Suite', 'Wireshark'],
  },
  {
    category: 'Reporting',
    items: ['CVSS Scoring', 'PoC Writeups', 'Responsible Disclosure', 'DOCX / PDF Reports'],
  },
]

// ── CHANGE: update experience entries with your real details ─
const experience = [
  {
    role:       'Cyber Security Intern',
    org:        'Tach Media',
    period:     'Present',
    highlights: [
      'Discovered critical Privilege Escalation via URL path manipulation (no auth bypass required)',
      'Identified Excessive Data Exposure on creator discovery API — OWASP API3:2023',
      'Documented IDOR on profile image storage endpoints — assessed Low/Informational',
    ],
  },
  {
    role:       'Bug Bounty Hunter',
    org:        'Independent',
    period:     '2025 – Present',
    highlights: [
      'Active on Bugbase platforms',
      'Focus on web application vulnerabilities and access control issues',
      'CTF participant — building offensive skill set on picoCTF',
    ],
  },
]

export default function Home() {
  return (
    <div className="home">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero">
        <motion.div className="glass-card hero-slogan" {...fadeUp(0.15)}>
          <p>EAT.</p>
          <p>SLEEP.</p>
          <p>HACK.</p>
          <p>REPEAT.</p>
        </motion.div>

        <motion.div className="glass-card hero-card" {...fadeUp(0.25)}>
          <div className="hero-tag-row">
            <span className="tag">Security Researcher</span>
            <span className="tag">Penetration Tester</span>
            <span className="tag">CTF Player</span>
          </div>
          <h1 className="hero-title">
            Hi, I'm <span className="accent-text">KUNDE PREMCHAND</span>
          </h1>
          <p className="hero-sub">
            I find what's broken before the bad guys do — authorized pentests,
            bug bounties, and detailed vulnerability reports that actually make
            systems safer.
          </p>
          <div className="hero-actions">
            <a href="/writeups" className="btn-primary">View Writeups</a>
            <a href="#experience" className="btn-ghost">Experience ↓</a>
          </div>
        </motion.div>
      </section>

      {/* ── Skills ────────────────────────────────────────── */}
      <section className="section">
        <motion.h2 className="section-title" {...fadeUp(0.1)}>
          Skills &amp; Tools
        </motion.h2>
        <div className="skills-grid">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              className="glass-card skill-card"
              {...fadeUp(0.1 + i * 0.08)}
            >
              <h3 className="skill-category">{group.category}</h3>
              <ul className="skill-list">
                {group.items.map(item => (
                  <li key={item} className="skill-item">
                    <span className="skill-dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────── */}
      <section className="section" id="experience">
        <motion.h2 className="section-title" {...fadeUp(0.1)}>
          Experience
        </motion.h2>
        <div className="exp-list">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.role + exp.org}
              className="glass-card exp-card"
              {...fadeUp(0.1 + i * 0.1)}
            >
              <div className="exp-header">
                <div>
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className="exp-org">{exp.org}</span>
                </div>
                <span className="tag">{exp.period}</span>
              </div>
              <ul className="exp-highlights">
                {exp.highlights.map(h => <li key={h}>{h}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Education ─────────────────────────────────────── */}
      <section className="section edu-section">
        <motion.h2 className="section-title" {...fadeUp(0.1)}>
          Education
        </motion.h2>
        {/* CHANGE: update degree, university, years, certs */}
        <motion.div className="glass-card edu-card" {...fadeUp(0.15)}>
          <div className="edu-inner">
            <div>
              <span className="tag" style={{ marginBottom: 10, display: 'inline-block' }}>
                Degree
              </span>
              <h3 className="edu-degree">B.Tech — Computer Science</h3>
              <p className="edu-school">Your University Name &nbsp;·&nbsp; 2022 – 2026</p>
            </div>
            <div className="edu-certs">
              <p className="edu-cert-label">Certifications &amp; Platforms</p>
              <ul>
                {/* CHANGE: replace with your actual certs */}
                <li>eJPT / CEH (add yours)</li>
                <li>TryHackMe — Top X%</li>
                <li>HackTheBox — Active</li>
                <li>picoCTF — Active</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
