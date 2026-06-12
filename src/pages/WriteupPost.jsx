import { useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import './WriteupPost.css'

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
  if (!match) return { data: {}, content: raw }
  const yaml = match[1]
  const data = {}
  yaml.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) return
    const key = line.slice(0, colonIdx).trim()
    let val = line.slice(colonIdx + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
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
  const content = raw.slice(match[0].length).trim()
  return { data, content }
}

const rawFiles = import.meta.glob('../content/writeups/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export default function WriteupPost() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const post = useMemo(() => {
    const entry = Object.entries(rawFiles).find(([filepath]) =>
      filepath.endsWith(`${slug}.md`)
    )
    if (!entry) return null
    const { data: frontmatter, content } = parseFrontmatter(entry[1])
    return { frontmatter, content }
  }, [slug])

  if (!post) {
    return (
      <div className="post-page">
        <div className="post-inner">
          <motion.div
            className="glass-card post-notfound"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Writeup not found</h2>
            <p>No writeup matching <code>{slug}</code>.</p>
            <Link to="/writeups" className="btn-back">← Back to Writeups</Link>
          </motion.div>
        </div>
      </div>
    )
  }

  const { frontmatter, content } = post

  return (
    <div className="post-page">
      <div className="post-inner">

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button onClick={() => navigate(-1)} className="btn-back">← Back</button>
        </motion.div>

        <motion.article
          className="glass-card post-card"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <header className="post-header">
            <div className="post-meta">
              {frontmatter.difficulty && (
                <span className={`tag ${difficultyBadge[frontmatter.difficulty] || 'badge-info'}`}>
                  {frontmatter.difficulty}
                </span>
              )}
              {frontmatter.platform && (
                <span className="post-platform">{frontmatter.platform}</span>
              )}
              {frontmatter.date && (
                <span className="post-date">
                  {new Date(frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </span>
              )}
            </div>
            <h1 className="post-title">{frontmatter.title}</h1>
            {frontmatter.summary && <p className="post-summary">{frontmatter.summary}</p>}
            {frontmatter.tags?.length > 0 && (
              <div className="post-tags">
                {frontmatter.tags.map(t => <span key={t} className="bc-tag">{t}</span>)}
              </div>
            )}
          </header>

          <hr className="post-divider" />

          <div className="post-body">
            <ReactMarkdown
              components={{
                h2:         ({ children }) => <h2 className="md-h2">{children}</h2>,
                h3:         ({ children }) => <h3 className="md-h3">{children}</h3>,
                p:          ({ children }) => <p  className="md-p">{children}</p>,
                pre:        ({ children }) => <pre className="md-pre">{children}</pre>,
                code:       ({ inline, children }) =>
                              inline
                                ? <code className="md-code-inline">{children}</code>
                                : <code>{children}</code>,
                ul:         ({ children }) => <ul className="md-ul">{children}</ul>,
                li:         ({ children }) => <li className="md-li">{children}</li>,
                blockquote: ({ children }) => <blockquote className="md-blockquote">{children}</blockquote>,
                a:          ({ href, children }) => (
                              <a href={href} target="_blank" rel="noreferrer" className="md-link">{children}</a>
                            ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </motion.article>

        <motion.div
          className="post-footer-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/writeups" className="btn-back">← All Writeups</Link>
        </motion.div>

      </div>
    </div>
  )
}
