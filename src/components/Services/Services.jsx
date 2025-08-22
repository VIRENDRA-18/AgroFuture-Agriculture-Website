// src/components/Services.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaSatellite, FaMicrochip, FaChartLine } from 'react-icons/fa';
import { TbDrone } from 'react-icons/tb';


// Services data with fresh gradients for each card
const services = [
  {
    id: 1,
    title: 'Organic Farming',
    description:
      'Sustainable farming practices that prioritize soil health and biodiversity.',
    icon: <FaSeedling className="text-4xl text-white" />,
    gradient: 'from-green-600 to-green-800',
  },
  {
  id: 2,
  title: 'Drone Monitoring',
  description: 'Aerial surveillance for crop health assessment and precision agriculture.',
  icon: <TbDrone className="text-4xl text-white" />,
  gradient: 'from-emerald-500 to-teal-700',
},

  {
    id: 3,
    title: 'Agri-Tech Solutions',
    description:
      'Cutting-edge technology integration for farm automation and efficiency.',
    icon: <FaMicrochip className="text-4xl text-white" />,
    gradient: 'from-lime-500 to-green-700',
  },
  {
    id: 4,
    title: 'Consultancy',
    description:
      'Expert guidance for farm optimization and sustainable practices.',
    icon: <FaChartLine className="text-4xl text-white" />,
    gradient: 'from-teal-500 to-cyan-700',
  },
];

// Service card component
const ServiceCard = ({ service }) => {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br h-full"
      whileHover={{
        y: -12,
        scale: 1.03,
        boxShadow:
          '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 15px -3px rgba(0,0,0,0.1)',
      }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <div
        className={`bg-gradient-to-br ${service.gradient} text-white p-6 h-full flex flex-col`}
      >
        <div className="flex items-center mb-4">
          <div className="mr-4 p-3 bg-white/20 rounded-full shadow-inner">
            {service.icon}
          </div>
          <h3 className="text-xl font-bold">{service.title}</h3>
        </div>
        <p className="text-white/90 flex-grow">{service.description}</p>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{
          opacity: 0.35,
          background:
            'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Services section
const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-4">
            Our Innovative Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transforming agriculture through technology and sustainable
            practices for a greener future.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: service.id * 0.15 }}
              className="h-full"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
