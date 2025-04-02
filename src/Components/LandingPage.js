import React from "react";
import { motion } from "framer-motion";
import surebank4 from "../images/surebank3.webp";


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-10">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center text-blue-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to Sure Bank
      </motion.h1>

      <motion.p
        className="text-gray-600 text-center max-w-2xl text-lg md:text-xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Sure Bank is your smart and secure solution for daily savings and financial growth. Whether you're saving for the future, saving to buy a product, managing contributions, or tracking withdrawals, we’ve got you covered.
      </motion.p>

      <motion.img
        src={surebank4}
        alt="Savings Illustration"
        className="w-full max-w-md rounded-2xl shadow-lg mb-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

    </div>
  );
};

export default LandingPage;
