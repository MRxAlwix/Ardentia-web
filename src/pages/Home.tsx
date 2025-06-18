import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Award, Zap, ArrowRight, Copy, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServerStatus from '../components/ServerStatus';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  const copyServerIP = () => {
    navigator.clipboard.writeText('mc.ardentia.my.id');
    // You could add a toast notification here
  };

  return (
    <motion.section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-orange-900/20 to-yellow-900/20">
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F59E0B' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div className="space-y-8" variants={containerVariants}>
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Logo */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <img
                src="/ardentia-logo.png"
                alt="Ardentia Network"
                className="h-32 w-32 md:h-40 md:w-40 object-contain drop-shadow-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              Ardentia Network
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Server Minecraft Premium Terbaik di Indonesia
            </motion.p>
            
            <motion.p 
              className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Bergabunglah dengan ribuan pemain dalam petualangan gaming yang tak terlupakan. 
              Rasakan pengalaman bermain dengan fitur premium dan komunitas yang luar biasa.
            </motion.p>

            {/* Server IP Copy */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto border border-gray-700"
              variants={itemVariants}
            >
              <span className="text-gray-300 text-sm">Server IP:</span>
              <div className="flex items-center space-x-2">
                <code className="text-orange-400 font-mono text-lg">mc.ardentia.my.id</code>
                <motion.button
                  onClick={copyServerIP}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Copy server IP"
                >
                  <Copy className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.a
              href="minecraft://play.ardentia.net"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 group shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="h-5 w-5" />
              <span>Main Sekarang</span>
              <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
            
            <Link to="/store">
              <motion.button 
                className="px-8 py-4 border-2 border-gray-600 hover:border-orange-400 text-gray-300 hover:text-white rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 group backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Lihat Store</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16"
            variants={containerVariants}
          >
            {[
              {
                icon: Users,
                title: 'Komunitas Aktif',
                description: 'Bergabung dengan ribuan pemain aktif dalam komunitas yang berkembang',
                color: 'orange',
                gradient: 'from-orange-500 to-red-500'
              },
              {
                icon: Award,
                title: 'Fitur Premium',
                description: 'Rank eksklusif, item khusus, dan kemampuan untuk meningkatkan gameplay',
                color: 'yellow',
                gradient: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Zap,
                title: 'Server 24/7',
                description: 'Server handal dengan uptime 99.9% dan pengalaman bebas lag',
                color: 'green',
                gradient: 'from-green-500 to-emerald-500'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Server Status */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
        <ServerStatus />
      </div>
    </motion.section>
  );
};

export default Home;