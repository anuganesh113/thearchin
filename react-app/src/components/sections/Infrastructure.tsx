import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { infrastructures } from '../../data/mockData';

export const Infrastructure: React.FC = () => {
  const [activeId, setActiveId] = useState(infrastructures[0].id);
  const activeItem = infrastructures.find((item) => item.id === activeId) || infrastructures[0];

  return (
    <section id="infrastructure" className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900">
              <span className="text-brown-500">Flawless</span>
              <br />
              Infrastructure
            </h2>
            <p className="text-xl md:text-2xl font-serif text-brown-500 uppercase self-end">
              A Thousand and One Ways to Treat Yourself and the Ones You Love –
              On Hand Whenever You Want.
            </p>
          </div>
        </motion.div>

        {/* Interactive Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{ height: '600px' }}
        >
          {/* Background Images */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Accordion Items */}
          <div className="absolute inset-0 flex flex-col md:flex-row">
            {infrastructures.map((item, index) => {
              const isActive = item.id === activeId;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`relative flex-1 transition-all duration-500 ${
                    isActive ? 'md:flex-[2]' : 'md:flex-1'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-full p-8 flex flex-col justify-between text-left">
                    {/* Number and Title */}
                    <div className="flex items-start space-x-4">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.2 : 1,
                          color: isActive ? '#9b734b' : '#ffffff',
                        }}
                        className="text-4xl font-serif font-bold"
                      >
                        {item.number}
                      </motion.div>
                      <div className="flex-1">
                        <motion.h3
                          animate={{
                            color: isActive ? '#9b734b' : '#ffffff',
                          }}
                          className="text-xl md:text-2xl font-serif uppercase"
                        >
                          {item.title}
                        </motion.h3>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="mt-auto"
                        >
                          <h4 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                            {item.subtitle}
                          </h4>
                          <a
                            href="#"
                            className="inline-flex items-center space-x-2 text-brown-400 hover:text-brown-300 transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="text-sm uppercase tracking-wide">Learn More</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Border Indicator */}
                  <motion.div
                    animate={{
                      backgroundColor: isActive ? '#9b734b' : 'rgba(255,255,255,0.2)',
                    }}
                    className="absolute bottom-0 left-0 right-0 h-1 md:h-full md:w-1 md:top-0 md:left-auto md:right-0 md:bottom-auto"
                  />
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
