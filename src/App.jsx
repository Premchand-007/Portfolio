import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Writeups from './pages/Writeups'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import './styles/global.css'

function Layout() {
  const { pathname } = useLocation()
  const isBlog = pathname.startsWith('/blog')
  // Blog pages use a softer bg for readability; everything else uses the main bg
  const bg = isBlog ? '/bg-blog.jpg' : '/bg.jpg'

  return (
    <>
      {/* Fixed background — locked in place, only content scrolls */}
      <div className="bg-fixed-wrapper">
        <img src={bg} alt="" className="bg-image" />
        <div className="bg-overlay" />
      </div>

      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/"           element={<Home />}     />
          <Route path="/writeups"   element={<Writeups />} />
          <Route path="/blog"       element={<Blog />}     />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about"      element={<About />}    />
        </Routes>
      </main>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}
