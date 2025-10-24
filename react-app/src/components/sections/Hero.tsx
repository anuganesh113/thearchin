import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

export const Hero: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const scrollToContent = () => {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-brown-50 to-white">
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/src/assets/images/header.jpg)',
          filter: 'grayscale(20%)',
        }}
      />

      <div className="container-custom relative z-10 pt-32 pb-16">
        <div className="flex flex-col items-center text-center">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold text-gray-900 mb-6">
              The Archin
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-brown-500 mx-auto max-w-md"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-700 uppercase mb-12 max-w-2xl"
          >
            The New Highlight <br />
            <span className="text-brown-500">in the City</span>
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 mb-16"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                document.getElementById('apartments')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Apartments
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
            >
              Schedule a Visit
            </Button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full"
          >
            {/* Video Promotion Card */}
            <motion.button
              onClick={() => setIsVideoOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden p-8 text-left transition-all duration-300 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brown-500 to-brown-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-brown-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-semibold text-gray-900 uppercase">
                  Video <br /> Promotion
                </p>
              </div>
            </motion.button>

            {/* See All Apartments Card */}
            <motion.a
              href="#apartments"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0">
                <img
                  src="/src/assets/images/header2.jpg"
                  alt="Apartments"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-8 h-8 text-brown-500" />
                </div>
                <p className="text-lg font-semibold text-white uppercase">
                  See All <br /> Apartments
                </p>
              </div>
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            onClick={scrollToContent}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            aria-label="Scroll to content"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-12 h-12 rounded-full bg-brown-500 flex items-center justify-center text-white shadow-lg hover:bg-brown-600 transition-colors duration-300"
            >
              <ArrowDown className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title="Property Video Tour"
        size="xl"
      >
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/qYgdnM3BC3g"
            title="Property Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      </Modal>
    </section>
  );
};
