// src/components/Tools.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tools = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temp: 22,
    condition: "Sunny",
    humidity: 65
  });
  const [soilQuality, setSoilQuality] = useState(null);
  const [scanning, setScanning] = useState(false);

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleScanSoil = () => {
    setScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      const quality = Math.floor(Math.random() * 100);
      setSoilQuality(quality);
      setScanning(false);
    }, 3000);
  };

  return (
    <section id="tools" className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-sea-green mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Farming Tools
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-forest-green mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Weather Card */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-sea-green mb-6">Weather & Time</h3>
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-5xl font-bold">{weather.temp}°C</div>
                <div className="text-gray-600">{weather.condition}</div>
              </div>
              <div className="text-4xl">
                {weather.condition === "Sunny" ? "☀️" : 
                 weather.condition === "Rainy" ? "🌧️" : "⛅"}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Humidity:</span>
                <span className="font-medium">{weather.humidity}%</span>
              </div>
              <div className="flex justify-between">
                <span>Local Time:</span>
                <span className="font-medium">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">
                  {currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Soil Scanner */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-sea-green mb-6">Soil Quality Scanner</h3>
            
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64 mb-6 flex items-center justify-center">
                {scanning ? (
                  <motion.div 
                    className="w-48 h-48 rounded-full bg-dark-sea-green bg-opacity-20 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <motion.div
                      className="w-32 h-32 rounded-full bg-dark-sea-green bg-opacity-40"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                    />
                  </motion.div>
                ) : soilQuality === null ? (
                  <div className="w-48 h-48 rounded-full border-4 border-dashed border-dark-sea-green flex items-center justify-center">
                    <span className="text-gray-400">No scan data</span>
                  </div>
                ) : (
                  <div className="relative">
                    <div 
                      className="radial-progress text-forest-green" 
                      style={{"--value": soilQuality, "--size": "12rem", "--thickness": "12px"}}
                    >
                      <span className="text-2xl font-bold">{soilQuality}%</span>
                    </div>
                    <div className="text-center mt-4">
                      <span className={`font-bold ${
                        soilQuality > 80 ? 'text-forest-green' : 
                        soilQuality > 50 ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {soilQuality > 80 ? 'Excellent' : 
                         soilQuality > 50 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleScanSoil}
                disabled={scanning}
                className={`w-full py-3 rounded-lg font-medium ${
                  scanning 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-forest-green hover:bg-sea-green text-white'
                }`}
              >
                {scanning ? 'Scanning Soil...' : 'Scan Soil Quality'}
              </button>
              
              {soilQuality !== null && !scanning && (
                <div className="mt-6 w-full">
                  <h4 className="font-bold mb-2">Recommendations:</h4>
                  <ul className="text-sm space-y-1">
                    {soilQuality > 80 ? (
                      <li>✅ Soil is in excellent condition</li>
                    ) : soilQuality > 50 ? (
                      <>
                        <li>⚠️ Add organic compost to improve nutrient levels</li>
                        <li>⚠️ Monitor moisture levels more frequently</li>
                      </>
                    ) : (
                      <>
                        <li>❌ Add nitrogen-rich fertilizer</li>
                        <li>❌ Increase irrigation frequency</li>
                        <li>❌ Consider soil aeration</li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Tools;