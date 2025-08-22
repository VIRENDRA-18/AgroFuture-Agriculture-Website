// src/components/Blog.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Sustainable Farming',
      excerpt: 'How technology is revolutionizing agriculture while preserving our planet.',
      date: 'May 15, 2023',
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Soil Health: The Foundation of Agriculture',
      excerpt: 'Understanding soil composition and its impact on crop yield.',
      date: 'April 28, 2023',
      category: 'Science'
    },
    {
      id: 3,
      title: 'Water Conservation Techniques for Modern Farms',
      excerpt: 'Innovative methods to reduce water usage without compromising yield.',
      date: 'April 12, 2023',
      category: 'Sustainability'
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-off-white to-dark-sea-green/10">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-green mb-4">
            Latest Insights
          </h2>
          <p className="text-dark-green/80 max-w-2xl mx-auto">
            Stay updated with the latest trends, research, and innovations in modern agriculture.
          </p>
        </motion.div>
        
        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="relative overflow-hidden rounded-2xl shadow-lg h-96 
                         backdrop-blur-sm border border-white/20
                         hover:shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-forest-green to-dark-sea-green">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
              </div>
              
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-dark-green to-transparent z-10"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: hoveredIndex === index ? 0.3 : 0.7 }}
              />
              
              {/* Card Content */}
              <div className="relative z-20 h-full flex flex-col justify-end p-8">
                {/* Category */}
                <span className="inline-block px-3 py-1 backdrop-blur-md bg-off-white/80 text-forest-green rounded-full text-sm font-medium mb-4 shadow-sm">
                  {post.category}
                </span>
                
                {/* Title & Excerpt */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: hoveredIndex === index ? -10 : 0 }}
                >
                  <h3 className="text-2xl font-bold text-off-white drop-shadow-md mb-3">
                    {post.title}
                  </h3>
                  <p className="text-off-white/80 line-clamp-3">
                    {post.excerpt}
                  </p>
                </motion.div>
                
                {/* Footer Section */}
                <motion.div
                  className="flex justify-between items-center mt-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    y: hoveredIndex === index ? 0 : 30,
                    opacity: hoveredIndex === index ? 1 : 0 
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-off-white/70 text-sm">{post.date}</span>
                  <motion.button
                    className="px-4 py-2 bg-off-white text-forest-green rounded-full font-medium shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.08 }}
                  >
                    Read Article
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
