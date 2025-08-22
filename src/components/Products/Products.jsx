// src/components/Products.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaLeaf, FaSeedling, FaAppleAlt } from 'react-icons/fa';

const products = [
  { id: 1, name: 'Organic Wheat', price: 5.99, category: 'Grains', icon: <FaLeaf /> },
  { id: 2, name: 'Fresh Tomatoes', price: 3.49, category: 'Vegetables', icon: <FaAppleAlt /> },
  { id: 3, name: 'Premium Corn', price: 4.25, category: 'Grains', icon: <FaLeaf /> },
  { id: 4, name: 'Organic Soybeans', price: 6.75, category: 'Legumes', icon: <FaSeedling /> },
  { id: 5, name: 'Sweet Potatoes', price: 2.99, category: 'Vegetables', icon: <FaAppleAlt /> },
  { id: 6, name: 'Organic Quinoa', price: 8.50, category: 'Grains', icon: <FaLeaf /> },
  { id: 7, name: 'Fresh Carrots', price: 1.99, category: 'Vegetables', icon: <FaAppleAlt /> },
  { id: 8, name: 'Premium Oats', price: 4.75, category: 'Grains', icon: <FaLeaf /> },
];

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <motion.div
      className="relative bg-off-white rounded-2xl shadow-lg overflow-hidden"
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="h-48 bg-gradient-to-br from-dark-sea-green to-forest-green relative overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl text-off-white/30">
            {product.icon}
          </div>
        </motion.div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-off-white text-forest-green rounded-full text-sm font-semibold">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark-green mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-forest-green font-bold text-xl">${product.price.toFixed(2)}</p>
          <motion.button
            className="relative bg-forest-green text-off-white p-3 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaShoppingCart />
            {isHovered && (
              <motion.span
                className="absolute -top-2 -right-2 bg-off-white text-forest-green rounded-full w-6 h-6 flex items-center justify-center border-2 border-forest-green"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                +
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Products = () => {
  return (
    <section id="products" className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-green mb-4">Our Farm Products</h2>
          <p className="text-dark-green/80 max-w-2xl mx-auto">
            Premium quality crops grown with sustainable practices and cutting-edge technology.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: product.id * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;