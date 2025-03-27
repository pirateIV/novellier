import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Array of quotes with authors
const quotes = [
  {
    text: "There is no greater agony than bearing an untold story inside you.",
    author: "Maya Angelou",
  },
  {
    text: "Books are a uniquely portable magic.",
    author: "Stephen King",
  },
  {
    text: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero",
  },
  {
    text: "The only thing that you absolutely have to know is the location of the library.",
    author: "Albert Einstein",
  },
  {
    text: "I have always imagined that Paradise will be a kind of library.",
    author: "Jorge Luis Borges",
  },
];

const Quotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  // Automatically cycle through quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Animation variants for Framer Motion
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 1, ease: "easeInOut" } },
  };

  return (
    <div className="absolute bottom-16 md:bottom-24 left-0 right-0 px-4">
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={currentQuote} // Key ensures animation triggers on quote change
          variants={quoteVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="text-gray-700 dark:text-gray-400 text-center italic max-w-2xl mx-auto"
        >
          <p className="text-sm font-serif leading-relaxed">
            "{quotes[currentQuote].text}"
          </p>
          <span className="block text-sm md:text-[17px] font-serif font-semibold mt-2 dark:text-sky-400 text-gray-900">
            ― {quotes[currentQuote].author}
          </span>
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
};

export default Quotes;