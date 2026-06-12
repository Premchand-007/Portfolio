import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Writeups.css'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 36 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

const difficultyBadge = {
  Critical: 'badge-critical',
  High:     'badge-high',
  Medium:   'badge-medium',
  Low:      'badge-low',
  Easy:     'badge-low',
  Hard:     'badge-high',
  Insane:   'badge-critical',
}

// Lightweight frontmatter parser — no Node.js Buffer needed
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const yaml = match[1]
  const data = {}
  yaml.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) return
    const key = line.slice(0, colonIdx).trim()
    let val = line.slice(colonIdx + 1).trim()
    // strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    // parse arrays like ["a", "b", "c"] or [a, b, c]
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else {
      data[key] = val
    }
  })
  return data
}

const rawFiles = import.meta.glob('../content/writeups/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export default function Writeups() {
  const navigate = useNavigate()

  const writeups = useMemo(() => {
    return Object.entries(rawFiles)
      .map(([filepath, raw]) => {
        const data = parseFrontmatter(raw)
        const slug = filepath.split('/').pop().replace('.md', '')
        return { slug, ...data }
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [])

  return (
    <div className="writeups-page">
      <div className="writeups-inner">

        <motion.div className="writeups-header" {...fadeUp(0.1)}>
          <span className="tag">Pentest &amp; CTF</span>
          <h1 className="writeups-title">Writeups</h1>
          <p className="writeups-sub">
            Authorized penetration test findings, CTF walkthroughs, and bug
            bounty writeups — with full methodology and remediation notes.
          </p>
        </motion.div>

        {writeups.length === 0 ? (
          <motion.div className="glass-card blog-empty" {...fadeUp(0.2)}>
            <p>No writeups yet — add a <code>.md</code> file to <code>src/content/writeups/</code> to get started.</p>
          </motion.div>
        ) : (
          <div className="writeups-list">
            {writeups.map((w, i) => (
              <motion.article
                key={w.slug}
                className="glass-card writeup-card"
                {...fadeUp(0.15 + i * 0.08)}
              >
                <div className="wc-top">
                  <div className="wc-meta">
                    {w.difficulty && (
                      <span className={`tag ${difficultyBadge[w.difficulty] || 'badge-info'}`}>
                        {w.difficulty}
                      </span>
                    )}
                    {w.platform && <span className="wc-owasp">{w.platform}</span>}
                    {w.date && (
                      <span className="wc-date">
                        {new Date(w.date).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short',
                        })}
                      </span>
                    )}
                  </div>
                  {w.target && <span className="wc-target">{w.target}</span>}
                </div>

                <h2 className="wc-title">{w.title}</h2>
                {w.summary && <p className="wc-summary">{w.summary}</p>}

                <div className="wc-bottom">
                  <div className="wc-tags">
                    {w.tags?.map(t => (
                      <span key={t} className="wc-tag">{t}</span>
                    ))}
                  </div>
                  <button
                    className="wc-read-btn"
                    onClick={() => navigate(`/writeups/${w.slug}`)}
                  >
                    Read Report →
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
