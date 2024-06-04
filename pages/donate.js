import React from 'react';
import { motion } from 'framer-motion';

const DonatePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold mb-4">Support Our Work</h1>
        <p className="text-gray-600 mb-6">
          If you find our content valuable and would like to support our efforts, please consider making a donation via PayPal.
        </p>
        <form action="https://www.paypal.com/donate" method="post" target="_top">
          <input type="hidden" name="business" value="P2E6XYVWQBAW6" />
          <input type="hidden" name="no_recurring" value="0" />
          <input type="hidden" name="currency_code" value="USD" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg focus:outline-none"
          >
            Donate with PayPal
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default DonatePage;
