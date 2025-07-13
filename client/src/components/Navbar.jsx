import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Info,
  MessageSquare,
  LogIn,
  Rocket,
  Menu,
  X,
} from 'lucide-react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from '@clerk/clerk-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: MessageSquare },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 border-b border-b-white/20">
        {/* Logo */}
        <div className="text-white font-bold text-2xl font-Satoshi flex items-center gap-2">
          <Rocket className="w-6 h-6 text-main" />
          InsightForge<span className="text-main">AI</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center">
          {navItems.map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className="relative text-white text-lg font-medium px-1.5 py-1 flex items-center gap-2 group
                before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px] before:bg-green-400 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 group-hover:before:scale-x-100"
            >
              <Icon className="w-5 h-5 text-main group-hover:text-green-400 transition-colors" />
              {name}
            </Link>
          ))}

          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-white text-lg font-medium px-4 py-2 border border-green-400 rounded hover:bg-main hover:text-black transition flex items-center gap-2">
                <LogIn className="w-5 h-5" />
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4">
              <UserButton afterSignOutUrl="/" />
              <SignOutButton>
                <button className="text-white border border-red-400 px-3 py-1 rounded hover:bg-red-500 hover:text-black transition">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? (
            <X className="w-7 h-7 text-main" />
          ) : (
            <Menu className="w-7 h-7 text-main" />
          )}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-black bg-opacity-90 backdrop-blur-sm flex flex-col items-center space-y-4 py-6 md:hidden z-40">
            {navItems.map(({ name, path, icon: Icon }) => (
              <Link
                key={name}
                to={path}
                className="text-white text-lg font-medium flex items-center gap-2 hover:text-main transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            ))}

            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="text-white text-lg font-medium flex items-center gap-2 hover:text-main transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <SignOutButton>
                <button
                  className="text-white text-lg font-medium flex items-center gap-2 hover:text-red-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="w-5 h-5 rotate-180" />
                  Sign Out
                </button>
              </SignOutButton>
            </SignedIn>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
