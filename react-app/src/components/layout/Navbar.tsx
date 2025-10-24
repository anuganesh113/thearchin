import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Home } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Apartments', href: '#apartments' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Left: Contact Info */}
            <div className="hidden lg:flex items-center space-x-6">
              <a
                href="tel:+7565318686"
                className="flex items-center space-x-2 text-gray-700 hover:text-brown-500 transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">+75 6531 86 86</span>
              </a>
              <a
                href="#3dtour"
                className="text-sm font-medium text-gray-700 hover:text-brown-500 transition-colors duration-200 uppercase"
              >
                3D Tour
              </a>
            </div>

            {/* Center: Logo */}
            <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
              <a href="#home" className="flex items-center">
                <img
                  src="/src/assets/images/logo.png"
                  alt="The Archin"
                  className="h-12 w-auto"
                />
              </a>
            </div>

            {/* Right: CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Schedule a Visit
              </Button>
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-brown-50 rounded-lg transition-colors duration-200"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-brown-500" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 hover:bg-brown-50 rounded-lg transition-colors duration-200"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6 text-brown-500" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Menu Content */}
                <div className="mt-16 space-y-8">
                  {/* Logo */}
                  <div className="mb-12">
                    <img
                      src="/src/assets/images/logo.png"
                      alt="The Archin"
                      className="h-16 w-auto"
                    />
                  </div>

                  {/* Navigation Links */}
                  <nav className="space-y-1">
                    {menuItems.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="block px-4 py-3 text-2xl font-serif text-gray-800 hover:text-brown-500 hover:bg-brown-50 rounded-lg transition-all duration-200"
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </nav>

                  {/* Contact Info */}
                  <div className="pt-8 border-t border-gray-200 space-y-4">
                    <a
                      href="tel:+7565318686"
                      className="flex items-center space-x-3 text-gray-700 hover:text-brown-500 transition-colors duration-200"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="font-medium">+75 6531 86 86</span>
                    </a>
                    <a
                      href="#3dtour"
                      className="flex items-center space-x-3 text-gray-700 hover:text-brown-500 transition-colors duration-200"
                    >
                      <Home className="w-5 h-5" />
                      <span className="font-medium uppercase">3D Tour</span>
                    </a>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-8">
                    <Button variant="primary" className="w-full">
                      Schedule a Visit
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
