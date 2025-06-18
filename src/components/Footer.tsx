import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, MessageCircle, Twitter, Youtube, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.footer 
      className="bg-gray-900 border-t border-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="h-8 w-8 text-orange-500" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Ardentia Network
              </span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Server Minecraft premium terbaik di Indonesia dengan komunitas yang luar biasa. Bergabunglah untuk pengalaman gaming yang tak terlupakan.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Twitter, color: 'hover:text-orange-400' },
                { icon: Youtube, color: 'hover:text-red-400' },
                { icon: MessageCircle, color: 'hover:text-blue-400' },
                { icon: Github, color: 'hover:text-gray-300' }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className={`text-gray-400 ${social.color} transition-colors`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Menu Utama</h3>
            <ul className="space-y-2">
              {['Beranda', 'Ranks', 'Store', 'Tentang Kami'].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Store */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Store</h3>
            <ul className="space-y-2">
              {['Ranks Premium', 'Items & Gear', 'Ardentia Coins', 'Gift Cards'].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Dukungan</h3>
            <ul className="space-y-2">
              {['Pusat Bantuan', 'Discord', 'Banding Ban', 'Laporkan Bug'].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                </motion.li>
              ))}
            </ul>
            <motion.div 
              className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-gray-400 text-sm mb-2">Server IP:</p>
              <code className="text-orange-400 font-mono">play.ardentia.net</code>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-800 py-6"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Ardentia Network. Semua hak dilindungi.
            </p>
            <div className="flex space-x-6 text-sm">
              {['Kebijakan Privasi', 'Syarat Layanan', 'EULA'].map((item, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;