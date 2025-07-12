import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import UploadInterface from './components/UploadInterface'

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 px-4 md:px-8 bg-black min-h-screen text-white font-Satoshi">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/upload' element={<UploadInterface/>} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
