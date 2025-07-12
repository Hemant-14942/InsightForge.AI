import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';



const Hero = () => {
  const Navigate = useNavigate();
  const handleGetStarted = () =>{
    Navigate('/upload');
  }
  return (
    <div className="bg-black min-h-screen  px-6 md:px-10 flex items-center">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center w-full relative">
        {/* Left side: Simple intro and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            InsightForge <span className="text-main">AI</span>
            {/* <TypingEffect /> */}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg mx-auto md:mx-0">
            Unlock powerful insights from your data with our AI-driven analysis tools.
          </p>
          <button className="bg-main text-black px-8 py-3 rounded-full font-semibold hover:bg-green-500 transition duration-300"
          onClick={handleGetStarted}>
            Get Started
          </button>
        </motion.div>

        {/* Right side: Robot Image */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className=""
        >
          <img
            src='/aigifhero.gif'
            alt="Robot"
            className=" h-[700px]  select-none hidden md:block "
            draggable={false}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
