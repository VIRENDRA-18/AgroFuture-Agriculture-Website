// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-green mb-4">Get In Touch</h2>
          <p className="text-dark-green/80 max-w-2xl mx-auto">
            Have questions about our services or technology? Reach out to our team.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="bg-gradient-to-br from-forest-green to-dark-sea-green rounded-2xl shadow-xl p-8 text-off-white"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-xl mt-1 mr-4" />
                <div>
                  <h4 className="font-bold">Our Farm Location</h4>
                  <p>123 Agriculture Lane, Farmland, FA 12345</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaPhone className="text-xl mt-1 mr-4" />
                <div>
                  <h4 className="font-bold">Phone Number</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaEnvelope className="text-xl mt-1 mr-4" />
                <div>
                  <h4 className="font-bold">Email Address</h4>
                  <p>info@agrofuture.com</p>
                </div>
              </div>
            </div>
            
            <div className="bg-off-white/10 rounded-2xl overflow-hidden h-80">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 bg-off-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <FaMapMarkerAlt className="text-2xl text-off-white" />
                    </div>
                    <div className="absolute top-0 right-0 w-4 h-4 bg-forest-green rounded-full animate-ping"></div>
                  </div>
                  <h4 className="font-bold">AgroFuture Headquarters</h4>
                  <p className="text-sm mt-2">Interactive map would appear here</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-off-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-dark-green mb-6">Send Us a Message</h3>
            
            {submitSuccess ? (
              <motion.div 
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p>Thank you for your message! We'll get back to you soon.</p>
              </motion.div>
            ) : null}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-dark-green font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-dark-sea-green/30 rounded-xl bg-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-dark-green font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-dark-sea-green/30 rounded-xl bg-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-dark-green font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-dark-sea-green/30 rounded-xl bg-transparent"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-dark-green font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 border border-dark-sea-green/30 rounded-xl bg-transparent"
                  required
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                className="px-8 py-4 bg-forest-green text-off-white rounded-full font-semibold w-full flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-3" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;