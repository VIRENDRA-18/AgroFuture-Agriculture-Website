// src/components/Weather.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaCloudSun, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    // Simulating API call to OpenWeather
    const fetchWeatherData = () => {
      // In a real app, this would be an actual API call
      setTimeout(() => {
        setWeatherData({
          temp: 72,
          humidity: 65,
          condition: 'Partly Cloudy',
          sunrise: '6:45 AM',
          sunset: '7:30 PM',
          forecast: [
            { day: 'Mon', high: 75, low: 62, condition: 'sunny' },
            { day: 'Tue', high: 78, low: 64, condition: 'partly-cloudy' },
            { day: 'Wed', high: 80, low: 66, condition: 'cloudy' },
            { day: 'Thu', high: 76, low: 63, condition: 'rain' },
            { day: 'Fri', high: 74, low: 60, condition: 'snow' }
          ]
        });
      }, 800);
    };
    
    fetchWeatherData();
    
    // Update time every minute
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const getWeatherIcon = (condition) => {
    switch(condition) {
      case 'sunny':
        return <FaSun className="text-3xl text-yellow-500" />;
      case 'partly-cloudy':
        return <FaCloudSun className="text-3xl text-yellow-400" />;
      case 'cloudy':
        return <FaCloud className="text-3xl text-gray-400" />;
      case 'rain':
        return <FaCloudRain className="text-3xl text-blue-400" />;
      case 'snow':
        return <FaSnowflake className="text-3xl text-blue-200" />;
      default:
        return <FaCloudSun className="text-3xl" />;
    }
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <section id="weather" className="py-20 bg-gradient-to-tr from-off-white to-forest-green/10">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-green mb-4">Weather & Time Zone</h2>
          <p className="text-dark-green/80 max-w-2xl mx-auto">
            Real-time weather data and local time information to help plan your farming activities.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="bg-off-white rounded-2xl shadow-xl p-8 col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-dark-green">Farm Location</h3>
                <p className="text-dark-green/80">Springfield, Farmland</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-dark-green">{formatTime(time)}</p>
                <p className="text-dark-green/80">Local Time</p>
              </div>
            </div>
            
            {weatherData ? (
              <div className="flex flex-col md:flex-row items-center">
                <div className="text-center md:text-left mb-8 md:mb-0 md:mr-12">
                  <div className="flex items-center justify-center md:justify-start">
                    {weatherData.condition.includes('Cloudy') ? (
                      <FaCloudSun className="text-6xl text-yellow-400 mr-4" />
                    ) : (
                      <FaSun className="text-6xl text-yellow-500 mr-4" />
                    )}
                    <div>
                      <p className="text-5xl font-bold text-dark-green">{weatherData.temp}°F</p>
                      <p className="text-dark-green/80">{weatherData.condition}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-dark-sea-green/10 p-4 rounded-xl">
                    <p className="text-dark-green/70 mb-1">Humidity</p>
                    <p className="text-xl font-bold text-dark-green">{weatherData.humidity}%</p>
                  </div>
                  <div className="bg-dark-sea-green/10 p-4 rounded-xl">
                    <p className="text-dark-green/70 mb-1">Sunrise</p>
                    <p className="text-xl font-bold text-dark-green">{weatherData.sunrise}</p>
                  </div>
                  <div className="bg-dark-sea-green/10 p-4 rounded-xl">
                    <p className="text-dark-green/70 mb-1">Sunset</p>
                    <p className="text-xl font-bold text-dark-green">{weatherData.sunset}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-forest-green"></div>
              </div>
            )}
          </motion.div>
          
          <motion.div
            className="bg-off-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-dark-green mb-6">5-Day Forecast</h3>
            
            <div className="space-y-4">
              {weatherData ? (
                weatherData.forecast.map((day, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-dark-sea-green/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="font-medium text-dark-green w-12">{day.day}</span>
                    <div className="mx-4">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div className="flex space-x-4">
                      <span className="text-dark-green font-bold">{day.high}°</span>
                      <span className="text-dark-green/60">{day.low}°</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                [...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-dark-sea-green/20">
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="flex space-x-4">
                      <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Weather;