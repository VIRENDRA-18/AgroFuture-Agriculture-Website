// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaRecycle, FaSeedling, FaLightbulb } from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: <FaRecycle className="text-4xl text-green-600" />,
      title: 'Eco-friendly',
      description: 'Sustainable practices that protect our environment',
    },
    {
      icon: <FaSeedling className="text-4xl text-green-600" />,
      title: 'Organic',
      description: '100% natural products without harmful chemicals',
    },
    {
      icon: <FaLightbulb className="text-4xl text-green-600" />,
      title: 'Innovation',
      description: 'Advanced technology for efficient farming',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="relative py-20 bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-green-200 opacity-40 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-emerald-300 opacity-30 blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-green-800 mb-4">
            About Our Farm
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Revolutionizing agriculture with sustainable practices and modern innovation
          </p>
          <motion.div
            className="h-1 w-24 bg-green-600 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side (Image placeholder) */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
                alt="Farm"
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
            </div>
          </motion.div>

          {/* Right side (Text + Values) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At <span className="font-semibold text-green-800">AgroInnovate</span>, we’re redefining
              agriculture through sustainable practices and innovative technologies. Since 2010, our
              family-owned farm has grown into a pioneer of eco-friendly farming solutions.
            </p>
            <p className="text-gray-700 mb-10 leading-relaxed">
              By blending traditional farming wisdom with modern techniques, we produce high-quality
              organic products while safeguarding our ecosystem for future generations.
            </p>

            {/* Values */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
                  variants={item}
                  whileHover={{ y: -8, scale: 1.05 }}
                >
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h4 className="font-bold text-lg text-green-700 mb-2">{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
