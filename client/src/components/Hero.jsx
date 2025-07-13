import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, Brain, Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/upload');
  };

  return (
    <div className="bg-black min-h-screen px-6 md:px-10 flex items-center">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center w-full relative">
        {/* Left side: Simple intro and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-green-400 to-main">
              InsightForge
            </span>{" "}
            <span className="inline-flex items-center">
              <span className="text-main">AI</span>
              <Sparkles className="w-8 h-8 text-main ml-2 animate-pulse" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg mx-auto md:mx-0">
            Unlock powerful insights from your data with our AI-driven analysis tools.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-main text-black px-8 py-3 rounded-full font-semibold hover:bg-green-500 transition duration-300 group"
            onClick={handleGetStarted}
          >
            <Rocket className="w-5 h-5 group-hover:animate-bounce" />
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Right side: Robot Image */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-main/20 blur-3xl rounded-full"></div>
          <img
            src='/aigifhero.gif'
            alt="AI Assistant"
            className="h-[700px] select-none hidden md:block relative z-10"
            draggable={false}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
