import { useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import './BlogPost.css'

const rawFiles = import.meta.glob('../content/blogs/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const difficultyBadge = {
  Easy:   'badge-low',
  Medium: 'badge-medium',
  Hard:   'badge-high',
  Insane: 'badge-critical',
}

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const post = useMemo(() => {
    const entry = Object.entries(rawFiles).find(([filepath]) =>
      filepath.endsWith(`${slug}.md`)
    )
    if (!entry) return null
    const { data: frontmatter, content } = matter(entry[1])
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
            <h2>Post not found</h2>
            <p>No post matching <code>{slug}</code>.</p>
            <Link to="/blog" className="btn-back">← Back to Blog</Link>
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
          <Link to="/blog" className="btn-back">← All posts</Link>
        </motion.div>

      </div>
    </div>
  )
}
