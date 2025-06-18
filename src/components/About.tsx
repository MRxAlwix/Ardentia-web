import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Gamepad2, Users, Zap, Award, Heart } from 'lucide-react';

const About = () => {
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

  const features = [
    {
      icon: Shield,
      title: 'Anti-Cheat Protection',
      description: 'Advanced security systems to ensure fair gameplay for everyone'
    },
    {
      icon: Gamepad2,
      title: 'Multiple Game Modes',
      description: 'Survival, Creative, PvP, Mini-games and custom adventures'
    },
    {
      icon: Users,
      title: 'Active Community',
      description: 'Join events, competitions, and make lasting friendships'
    },
    {
      icon: Zap,
      title: 'Regular Updates',
      description: 'Fresh content, new features, and improvements every week'
    },
    {
      icon: Award,
      title: 'Professional Staff',
      description: 'Experienced moderators and admins available 24/7'
    },
    {
      icon: Heart,
      title: 'Player-First',
      description: 'Every decision is made with our community in mind'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Registered Players' },
    { number: '500+', label: 'Daily Active Users' },
    { number: '99.9%', label: 'Server Uptime' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <motion.section 
      id="about" 
      className="py-20 bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            About Ardentia Network
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Founded in 2020, Ardentia Network has grown into one of the most beloved Minecraft communities. 
            Our mission is to provide an exceptional gaming experience where players can explore, create, and connect.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="h-12 w-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 md:p-12 border border-gray-700"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                What started as a small server for friends has evolved into a thriving network that brings joy to 
                thousands of players worldwide. We believe that gaming is more than just entertainment – it's a 
                way to build communities, foster creativity, and create unforgettable memories.
              </p>
              <p>
                Every feature we add, every event we host, and every decision we make is guided by our commitment 
                to providing the best possible experience for our players. We're not just a server; we're a family.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;