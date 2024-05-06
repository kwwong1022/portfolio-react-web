import { Routes, Route } from 'react-router-dom'
import './utils/i18n'

import './App.css'
import Layout from './layout'
import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Works'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='works' element={<Works />} />
        <Route path='blog'>
          <Route index element={<Blog />} />
          <Route path=':postId' element={<BlogPost />} />
        </Route>
        <Route path='contact' element={<Contact />} />
        <Route path='/*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App