import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import matter from 'gray-matter'
import './Blog.css'

const rawFiles = import.meta.glob('../content/blogs/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 36 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

const difficultyBadge = {
  Easy:   'badge-low',
  Medium: 'badge-medium',
  Hard:   'badge-high',
  Insane: 'badge-critical',
}

export default function Blog() {
  const posts = useMemo(() => {
    return Object.entries(rawFiles)
      .map(([filepath, raw]) => {
        const { data } = matter(raw)
        const slug = filepath.split('/').pop().replace('.md', '')
        return { slug, ...data }
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [])

  return (
    <div className="blog-page">
      <div className="blog-inner">

        <motion.div className="blog-header" {...fadeUp(0.1)}>
          <span className="tag">CTF &amp; Research</span>
          <h1 className="blog-title">Blog</h1>
          <p className="blog-sub">
            CTF walkthroughs, bug bounty writeups, and security research notes.
            All findings are from authorized programs or practice platforms.
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <motion.div className="glass-card blog-empty" {...fadeUp(0.2)}>
            <p>No posts yet — add a <code>.md</code> file to <code>src/content/blogs/</code> to get started.</p>
          </motion.div>
        ) : (
          <div className="blog-list">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                className="glass-card blog-card"
                {...fadeUp(0.15 + i * 0.08)}
              >
                <Link to={`/blog/${post.slug}`} className="blog-card-link">
                  <div className="bc-top">
                    <div className="bc-meta">
                      {post.difficulty && (
                        <span className={`tag ${difficultyBadge[post.difficulty] || 'badge-info'}`}>
                          {post.difficulty}
                        </span>
                      )}
                      {post.date && (
                        <span className="bc-date">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                    <span className="bc-arrow">→</span>
                  </div>
                  <h2 className="bc-title">{post.title}</h2>
                  {post.summary && <p className="bc-summary">{post.summary}</p>}
                  {post.tags?.length > 0 && (
                    <div className="bc-tags">
                      {post.tags.map(t => <span key={t} className="bc-tag">{t}</span>)}
                    </div>
                  )}
                </Link>
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
