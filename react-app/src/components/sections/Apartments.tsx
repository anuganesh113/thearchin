import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download, Eye, Home } from 'lucide-react';
import { apartments } from '../../data/mockData';
import { Button } from '../ui/Button';

export const Apartments: React.FC = () => {
  const [openId, setOpenId] = useState(apartments[1].id);

  const toggleApartment = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="apartments" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-4">
            <span className="text-brown-500">Select</span> Apartments
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our selection of premium apartments designed for modern living.
          </p>
        </motion.div>

        {/* Apartments List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Table Header - Desktop Only */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 uppercase text-sm">
            <div className="col-span-2">Room</div>
            <div className="col-span-2">Plan</div>
            <div className="col-span-3">Information</div>
            <div className="col-span-2">Features</div>
            <div className="col-span-3">Price</div>
          </div>

          {/* Apartment Items */}
          <div className="divide-y divide-gray-200">
            {apartments.map((apartment, index) => {
              const isOpen = openId === apartment.id;
              return (
                <motion.div
                  key={apartment.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleApartment(apartment.id)}
                    className="w-full px-6 py-6 text-left"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                      {/* Room Number */}
                      <div className="lg:col-span-2">
                        <h3 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">
                          {apartment.room}
                        </h3>
                      </div>

                      {/* Floor Plan Preview */}
                      <div className="lg:col-span-2">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg p-2">
                          <img
                            src={apartment.plan}
                            alt={`Apartment ${apartment.room}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Information */}
                      <div className="lg:col-span-3">
                        <div className="space-y-2">
                          <h4 className="text-xl font-semibold text-gray-900">
                            {apartment.area} M²
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>Housing {apartment.housing}</li>
                            <li>Floor {apartment.floor}</li>
                            <li>{apartment.rooms} Rooms</li>
                          </ul>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3">
                          {apartment.features.map((feature, i) => (
                            <div
                              key={i}
                              className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center"
                              title={feature}
                            >
                              {i === 0 ? (
                                <Home className="w-5 h-5 text-brown-600" />
                              ) : (
                                <Eye className="w-5 h-5 text-brown-600" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="lg:col-span-3 flex items-center justify-between">
                        <p className="text-2xl font-bold text-brown-500">
                          ${apartment.price.toLocaleString()}
                        </p>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-gray-50 rounded-xl p-6">
                            {/* Floor Plan */}
                            <div className="lg:col-span-2">
                              <div className="bg-white rounded-lg p-6 shadow-sm">
                                <img
                                  src={apartment.plan}
                                  alt={`Floor plan ${apartment.room}`}
                                  className="w-full h-auto"
                                />
                              </div>
                            </div>

                            {/* Details and CTA */}
                            <div className="space-y-6">
                              <div className="bg-white rounded-lg p-6 shadow-sm">
                                <p className="text-gray-600 mb-2">
                                  Guaranteed by <br />
                                  <span className="font-semibold">
                                    12 Leading American Banks
                                  </span>
                                </p>
                                <p className="text-sm text-gray-500 uppercase mb-2">
                                  Mortgage From
                                </p>
                                <p className="text-4xl font-bold text-brown-500">
                                  {apartment.mortgage}%
                                </p>
                              </div>

                              <div className="space-y-3">
                                <Button
                                  variant="outline"
                                  className="w-full"
                                  as="a"
                                  href="#"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download PDF
                                </Button>
                                <Button variant="primary" className="w-full">
                                  Schedule a Visit
                                </Button>
                              </div>

                              {/* Features List */}
                              <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h5 className="font-semibold text-gray-900 mb-3">
                                  Features:
                                </h5>
                                <ul className="space-y-2">
                                  {apartment.features.map((feature, i) => (
                                    <li
                                      key={i}
                                      className="flex items-center text-sm text-gray-600"
                                    >
                                      <span className="w-1.5 h-1.5 bg-brown-500 rounded-full mr-2" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
