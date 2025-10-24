import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { locations } from '../../data/mockData';

export const Location: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % locations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + locations.length) % locations.length);
  };

  const currentLocation = locations[currentIndex];

  return (
    <section id="location" className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-4">
            Perfect <span className="text-brown-500">Location</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need is within reach. Discover the convenience of our prime location.
          </p>
        </motion.div>
      </div>

      {/* Location Slider */}
      <div className="relative h-[600px] md:h-[700px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={currentLocation.image}
                alt={currentLocation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full container-custom flex items-end pb-20">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8"
                >
                  {/* Time Badge */}
                  <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-6">
                    <Clock className="w-6 h-6 text-brown-400" />
                    <div className="text-left">
                      <div className="text-4xl font-serif font-bold text-white">
                        {currentLocation.time}
                      </div>
                      <div className="text-sm text-white/80 uppercase">
                        Minutes {currentLocation.unit === 'walk' ? 'Walk' : 'By Car'}
                      </div>
                    </div>
                  </div>

                  {/* Location Name */}
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
                    {currentLocation.name}
                  </h3>

                  <div className="flex items-center space-x-2 text-white/80">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm uppercase tracking-wide">Nearby Attraction</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 pointer-events-none">
          <div className="container-custom flex justify-between pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 flex items-center justify-center text-white transition-colors duration-200"
              aria-label="Previous location"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 flex items-center justify-center text-white transition-colors duration-200"
              aria-label="Next location"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {locations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-brown-500 w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
