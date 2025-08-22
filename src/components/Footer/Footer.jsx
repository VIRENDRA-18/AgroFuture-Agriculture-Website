// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaLeaf } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-forest-green to-dark-sea-green text-off-white overflow-hidden">
      {/* Animated leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-forest-green opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              rotate: `${Math.random() * 360}deg`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          >
            <FaLeaf />
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <FaLeaf className="text-3xl" />
              <span className="text-xl font-bold">AgroFuture</span>
            </div>
            <p className="mb-6 opacity-80">
              Pioneering sustainable agriculture through innovation and technology for a greener tomorrow.
            </p>
            <div className="flex space-x-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full border border-off-white/30 flex items-center justify-center hover:bg-off-white/10 transition-colors"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(244, 241, 237, 0.2)' }}
                >
                  <Icon className="text-off-white" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Soil Scanner', 'Weather', 'Products', 'Blog', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {['Organic Farming', 'Drone Monitoring', 'Agri-Tech Solutions', 'Farm Consultancy', 'Soil Analysis', 'Crop Planning', 'Water Management', 'Sustainability Consulting'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Newsletter</h3>
            <p className="opacity-80 mb-4">
              Subscribe to our newsletter for the latest updates and farming insights.
            </p>
            <motion.div
              className="flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow bg-off-white/10 border border-off-white/30 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-off-white/50"
              />
              <motion.button
                className="bg-off-white text-forest-green px-4 rounded-r-xl font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join
              </motion.button>
            </motion.div>
          </div>
        </div>
        
        <div className="border-t border-off-white/20 mt-12 pt-8 text-center opacity-80">
          <p>© {new Date().getFullYear()} AgroFuture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;