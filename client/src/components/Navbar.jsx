import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/50 bg-opacity-70 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 border-b border-b-white ">

        {/* Logo */}
        <div className="text-white font-bold text-2xl font-Satoshi">
          InsightForge<span className="text-main">AI</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center">
          {['Home', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="relative text-white text-lg font-medium px-1.5 py-1
                before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px] before:bg-green-400 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
            >
              {item}
            </Link>
          ))}

          {/* Login Button */}
          <Link
            to="/login"
            className="text-white text-lg font-medium px-4 py-2 border border-green-400 rounded hover:bg-main hover:text-black transition"
          >
            Login
          </Link>

          {/* Get Started Button with shining border animation */}
          <Link
            to="/get-started"
            className="relative inline-block px-6 py-2 font-semibold text-black rounded
              bg-main
              before:absolute before:inset-0 before:rounded before:bg-gradient-to-r before:from-green-300 before:via-green-500 before:to-green-300
              before:bg-[length:200%_100%] before:animate-shine before:z-[-1]
              hover:brightness-110 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-black bg-opacity-90 backdrop-blur-sm flex flex-col items-center space-y-4 py-6 md:hidden z-40">
            {['Home', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-white text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              to="/login"
              className="text-white text-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/get-started"
              className="bg-green-400 text-black font-semibold px-6 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
