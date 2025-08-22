// src/components/Hero.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const PlantModel = () => {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#8FBC8F" />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[0.6, 1, 0.4]}>
          <boxGeometry args={[0.8, 0.1, 0.8]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      </Float>
    </group>
  );
};

const Hero = () => {
  const canvasRef = useRef();

  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls enableZoom={false} />
          <Stars radius={100} depth={50} count={5000} factor={4} />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <PlantModel />
          </Float>
          <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
            <mesh position={[-2, -1, 0]}>
              <boxGeometry args={[1.5, 0.1, 1.5]} />
              <meshStandardMaterial color="#5A381E" />
            </mesh>
          </Float>
          <Float speed={4} rotationIntensity={0.8} floatIntensity={1.2}>
            <mesh position={[3, 0, -1]}>
              <torusGeometry args={[0.5, 0.2, 16, 100]} />
              <meshStandardMaterial color="#8FBC8F" />
            </mesh>
          </Float>
        </Canvas>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-off-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Smart Farming for a <span className="text-forest-green">Sustainable</span> Future
        </motion.h1>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.button 
            className="px-8 py-3 bg-forest-green text-off-white rounded-full font-semibold hover:bg-dark-sea-green transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Services
          </motion.button>
          <motion.button 
            className="px-8 py-3 bg-transparent border-2 border-off-white text-off-white rounded-full font-semibold hover:bg-off-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Check Soil Quality
          </motion.button>
        </motion.div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-forest-green rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;