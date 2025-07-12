import React from 'react'

const About = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-black text-white">
      <div className="absolute w-48 h-48 bg-green-300 rounded-full opacity-30 blur-2xl animate-pulse"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold text-green-400">About Us</h1>
        <p className="mt-4 text-lg">This is the about page.</p>
      </div>
    </div>
  )
}

export default About
