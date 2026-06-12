import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Writeups from './pages/Writeups'
import WriteupPost from './pages/WriteupPost'
import About from './pages/About'
import './styles/global.css'

function Layout() {
  return (
    <>
      {/* Fixed background — locked in place, only content scrolls */}
      <div className="bg-fixed-wrapper">
        <div className="bg-overlay" />
      </div>

      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/"                 element={<Home />}         />
          <Route path="/writeups"         element={<Writeups />}     />
          <Route path="/writeups/:slug"   element={<WriteupPost />}  />
          <Route path="/about"            element={<About />}        />
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
