// src/components/SoilScanner.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaLeaf, FaTint, FaChartPie } from 'react-icons/fa';

const SoilScanner = () => {
  const [soilData, setSoilData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [file, setFile] = useState(null);
  
  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setSoilData({
        pH: 6.8,
        moisture: 72,
        nitrogen: 45,
        phosphorus: 60,
        potassium: 80,
        fertilityScore: 85,
        recommendedCrops: ['Corn', 'Wheat', 'Soybeans', 'Tomatoes']
      });
      setIsScanning(false);
    }, 2000);
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };
  
  const ProgressRing = ({ value, label, icon, color }) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (value / 100) * circumference;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeInOut" }}
              transform="rotate(-90 50 50)"
            />
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dy=".3em"
              className="text-xl font-bold fill-dark-green"
            >
              {value}%
            </text>
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {icon}
          </div>
        </div>
        <p className="mt-2 text-dark-green font-medium">{label}</p>
      </div>
    );
  };
  
  return (
    <section id="soil-scanner" className="py-20 bg-gradient-to-br from-off-white to-dark-sea-green/20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-green mb-4">Soil Quality Scanner</h2>
          <p className="text-dark-green/80 max-w-2xl mx-auto">
            Upload a soil sample image or enter details to get instant analysis and crop recommendations.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="bg-off-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center">
              <div className="mb-8 w-full">
                <label className="block text-dark-green font-medium mb-2">Upload Soil Sample</label>
                <div className="border-2 border-dashed border-forest-green/30 rounded-2xl p-8 text-center cursor-pointer hover:bg-dark-sea-green/10 transition-colors">
                  {file ? (
                    <img 
                      src={file} 
                      alt="Soil sample" 
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                  ) : (
                    <div className="py-12">
                      <FaCloudUploadAlt className="text-4xl text-forest-green mx-auto mb-4" />
                      <p className="text-dark-green">Click to upload or drag and drop</p>
                      <p className="text-sm text-dark-green/60 mt-2">JPG, PNG, or HEIC up to 10MB</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    className="hidden" 
                    id="soil-upload"
                    onChange={handleFileChange}
                  />
                  <label 
                    htmlFor="soil-upload" 
                    className="inline-block px-6 py-3 bg-forest-green text-off-white rounded-full font-medium cursor-pointer hover:bg-dark-sea-green transition-colors"
                  >
                    Choose File
                  </label>
                </div>
              </div>
              
              <div className="w-full mb-6">
                <label className="block text-dark-green font-medium mb-2">Or enter soil details manually</label>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="pH Level" 
                    className="p-3 border border-dark-sea-green/30 rounded-xl bg-transparent"
                  />
                  <input 
                    type="text" 
                    placeholder="Moisture %" 
                    className="p-3 border border-dark-sea-green/30 rounded-xl bg-transparent"
                  />
                  <input 
                    type="text" 
                    placeholder="Nitrogen" 
                    className="p-3 border border-dark-sea-green/30 rounded-xl bg-transparent"
                  />
                  <input 
                    type="text" 
                    placeholder="Potassium" 
                    className="p-3 border border-dark-sea-green/30 rounded-xl bg-transparent"
                  />
                </div>
              </div>
              
              <motion.button
                className="px-8 py-4 bg-forest-green text-off-white rounded-full font-semibold w-full flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleScan}
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Soil...
                  </>
                ) : (
                  'Scan Soil Quality'
                )}
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {soilData ? (
              <div className="bg-off-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-dark-green mb-6">Soil Analysis Results</h3>
                
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <ProgressRing 
                    value={soilData.pH} 
                    label="pH Level" 
                    icon={<FaLeaf className="text-2xl text-forest-green" />} 
                    color="#228B22" 
                  />
                  <ProgressRing 
                    value={soilData.moisture} 
                    label="Moisture" 
                    icon={<FaTint className="text-2xl text-forest-green" />} 
                    color="#228B22" 
                  />
                  <ProgressRing 
                    value={soilData.fertilityScore} 
                    label="Fertility" 
                    icon={<FaChartPie className="text-2xl text-forest-green" />} 
                    color="#228B22" 
                  />
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-dark-green mb-3">Nutrient Levels</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-dark-green">Nitrogen</span>
                        <span className="text-dark-green">{soilData.nitrogen}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div 
                          className="bg-forest-green h-2.5 rounded-full" 
                          style={{ width: `${soilData.nitrogen}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${soilData.nitrogen}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-dark-green">Phosphorus</span>
                        <span className="text-dark-green">{soilData.phosphorus}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div 
                          className="bg-dark-sea-green h-2.5 rounded-full" 
                          style={{ width: `${soilData.phosphorus}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${soilData.phosphorus}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-dark-green">Potassium</span>
                        <span className="text-dark-green">{soilData.potassium}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div 
                          className="bg-forest-green h-2.5 rounded-full" 
                          style={{ width: `${soilData.potassium}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${soilData.potassium}%` }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-dark-green mb-3">Recommended Crops</h4>
                  <div className="flex flex-wrap gap-2">
                    {soilData.recommendedCrops.map((crop, index) => (
                      <span 
                        key={index} 
                        className="px-4 py-2 bg-dark-sea-green/30 text-dark-green rounded-full"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-off-white rounded-2xl shadow-xl p-12 text-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-dark-green mb-3">Scan Soil Sample</h3>
                <p className="text-dark-green/80">
                  Upload a soil sample or enter details to get a comprehensive analysis and personalized crop recommendations.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SoilScanner;