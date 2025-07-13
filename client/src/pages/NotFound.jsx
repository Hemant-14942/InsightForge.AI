import React from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 overflow-hidden">
      {/* Animated floating circles */}
      <motion.div
        className="absolute w-72 h-72 bg-green-400 rounded-full opacity-20 blur-3xl left-1/4 top-1/4"
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-60 h-60 bg-main rounded-full opacity-20 blur-2xl right-1/4 bottom-1/4"
        animate={{ y: [0, -30, 0], x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.h1
          className="text-7xl md:text-9xl font-extrabold text-green-400 drop-shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          404
        </motion.h1>
        <motion.p
          className="mt-6 text-2xl md:text-3xl text-white/90 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Oops! Page Not Found
        </motion.p>
        <motion.p
          className="mt-3 text-lg text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          The page you are looking for does not exist or has been moved.
        </motion.p>
        <motion.a
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-main text-black rounded-xl font-medium shadow-lg hover:bg-green-500 transition-colors duration-300"
          whileHover={{ scale: 1.07 }}
        >
          Go Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;
