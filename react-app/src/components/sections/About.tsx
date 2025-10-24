import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { stats } from '../../data/mockData';

export const About: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <span className="text-[20rem] font-serif font-bold text-gray-900">About</span>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
            <span className="text-brown-500">Premium Class Apartments</span>
            <br />
            with Five Stars Hotel Services
            <br />
            <span className="text-gray-600">in Your Home</span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Hotel Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-600 mb-6 uppercase tracking-wider">
                Exclusive from
                <br />
                Mandarin Oriental
                <br />
                NY Hotel
              </p>
              <div className="opacity-40 max-w-[200px] mx-auto lg:mx-0">
                <img
                  src="/src/assets/images/logo_mo.png"
                  alt="Mandarin Oriental"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>

          {/* Center Column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4"
          >
            <Card hoverable={false}>
              <img
                src="/src/assets/images/header.jpg"
                alt="The Archin Building"
                className="w-full h-[400px] object-cover"
              />
            </Card>
          </motion.div>

          {/* Right Column: Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <h3 className="text-2xl md:text-3xl font-serif text-brown-500 uppercase mb-6 leading-tight">
              Archin Rising Above the Urban Landscape and Becomes a Visible
              Metaphor for the Dizzying Success of Its Inhabitants.
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              With amenities & services of a 5★ hotel at the lower levels of the
              building, Archin will bring you the best experience and freedom to
              enjoy life to the fullest.
            </p>
            <Button variant="primary">
              About Project
            </Button>
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hoverable={false} className="text-center p-8">
                  <h3 className="text-5xl md:text-6xl font-serif font-bold text-brown-500 mb-4">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
      >
        <img
          src="/src/assets/images/about.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </motion.div>
    </section>
  );
};
