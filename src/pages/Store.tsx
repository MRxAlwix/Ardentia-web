import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, Coins, Shield, Sword, Pickaxe, Gem, Crown, Star, 
  ShoppingCart, CreditCard, Gift, Zap, Users, Award, 
  CheckCircle, Sparkles, Heart, Trophy
} from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

const Store = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ranks');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
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

  const categories = [
    { id: 'ranks', name: 'Premium Ranks', icon: Crown },
    { id: 'coins', name: 'Ardentia Coins', icon: Coins },
    { id: 'kits', name: 'Kits & Items', icon: Package },
    { id: 'special', name: 'Special Offers', icon: Gift }
  ];

  const ranks = [
    {
      id: 'novice',
      name: 'Novice',
      icon: Shield,
      price: 15000,
      originalPrice: 20000,
      discount: '25%',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      features: [
        'Chat Colors & Formatting',
        'Join Full Server Priority',
        '2x Daily Rewards',
        'Basic Kit Access',
        '/nick Command',
        'Custom Join Message'
      ],
      description: 'Perfect for new players starting their journey',
      badge: 'STARTER'
    },
    {
      id: 'elite',
      name: 'Elite',
      icon: Star,
      price: 40000,
      originalPrice: 50000,
      discount: '20%',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      features: [
        'All Novice Perks',
        'Private Warps (5 slots)',
        '3x Daily Rewards',
        'Elite Kit Access',
        'Particle Effects',
        'Priority Support',
        'Custom Prefix',
        'Exclusive Cosmetics'
      ],
      description: 'Advanced features for dedicated players',
      popular: true,
      badge: 'POPULAR'
    },
    {
      id: 'legend',
      name: 'Legend',
      icon: Crown,
      price: 90000,
      originalPrice: 100000,
      discount: '10%',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      features: [
        'All Elite Perks',
        'Unlimited Private Warps',
        '5x Daily Rewards',
        'Legend Kit Access',
        'Custom Join Messages',
        'Exclusive Cosmetics',
        'VIP Discord Access',
        'Monthly Bonus Items',
        'Priority Queue'
      ],
      description: 'Ultimate gaming experience with premium benefits',
      badge: 'PREMIUM'
    }
  ];

  const coins = [
    {
      id: 'coins-1k',
      name: '1,000 Ardentia Coins',
      price: 10000,
      icon: Coins,
      color: 'from-yellow-500 to-orange-600',
      description: 'Perfect starter pack for new players',
      bonus: '+100 Bonus Coins'
    },
    {
      id: 'coins-5k',
      name: '5,000 Ardentia Coins',
      price: 45000,
      originalPrice: 50000,
      icon: Coins,
      color: 'from-yellow-500 to-orange-600',
      description: 'Great value for regular players',
      popular: true,
      bonus: '+750 Bonus Coins'
    },
    {
      id: 'coins-10k',
      name: '10,000 Ardentia Coins',
      price: 85000,
      originalPrice: 100000,
      icon: Coins,
      color: 'from-yellow-500 to-orange-600',
      description: 'Best value for serious gamers',
      bonus: '+2,000 Bonus Coins'
    },
    {
      id: 'coins-25k',
      name: '25,000 Ardentia Coins',
      price: 200000,
      originalPrice: 250000,
      icon: Coins,
      color: 'from-yellow-500 to-orange-600',
      description: 'Ultimate coin package',
      bonus: '+7,500 Bonus Coins'
    }
  ];

  const kits = [
    {
      id: 'starter-kit',
      name: 'Starter Kit',
      price: 5000,
      icon: Package,
      color: 'from-green-500 to-emerald-600',
      description: 'Basic tools and food for beginners',
      items: ['Iron Tools', 'Food Stack', 'Basic Armor']
    },
    {
      id: 'diamond-gear',
      name: 'Diamond Gear Set',
      price: 25000,
      icon: Sword,
      color: 'from-cyan-500 to-blue-600',
      description: 'Complete enchanted diamond armor and weapons',
      items: ['Diamond Armor Set', 'Enchanted Sword', 'Shield']
    },
    {
      id: 'builder-kit',
      name: 'Builder Kit',
      price: 15000,
      icon: Pickaxe,
      color: 'from-orange-500 to-red-600',
      description: 'Essential tools and blocks for building',
      items: ['Building Blocks', 'Tools', 'Decorative Items']
    },
    {
      id: 'legendary-crate',
      name: 'Legendary Crate',
      price: 35000,
      icon: Gem,
      color: 'from-purple-500 to-pink-600',
      description: 'Rare items and exclusive rewards',
      items: ['Mystery Items', 'Rare Enchants', 'Exclusive Cosmetics']
    },
    {
      id: 'pvp-kit',
      name: 'PvP Master Kit',
      price: 30000,
      icon: Trophy,
      color: 'from-red-500 to-orange-600',
      description: 'Everything you need for PvP dominance',
      items: ['PvP Gear', 'Potions', 'Special Weapons']
    },
    {
      id: 'explorer-kit',
      name: 'Explorer Kit',
      price: 20000,
      icon: Zap,
      color: 'from-indigo-500 to-purple-600',
      description: 'Perfect for adventurers and explorers',
      items: ['Travel Gear', 'Maps', 'Survival Tools']
    }
  ];

  const specialOffers = [
    {
      id: 'monthly-pass',
      name: 'Monthly VIP Pass',
      price: 50000,
      originalPrice: 75000,
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      description: 'One month of VIP benefits and daily rewards',
      features: ['Daily Login Rewards', 'VIP Chat', 'Exclusive Events', '2x XP Boost']
    },
    {
      id: 'season-pass',
      name: 'Season Battle Pass',
      price: 35000,
      icon: Award,
      color: 'from-indigo-500 to-purple-600',
      description: 'Unlock exclusive rewards throughout the season',
      features: ['100+ Rewards', 'Exclusive Skins', 'Special Emotes', 'Bonus XP']
    }
  ];

  const handleBuyClick = (item: any) => {
    setSelectedItem(item);
    setShowPaymentModal(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const renderRanks = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {ranks.map((rank, index) => (
        <motion.div 
          key={rank.id} 
          className="relative group"
          variants={itemVariants}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {rank.popular && (
            <motion.div 
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>MOST POPULAR</span>
              </div>
            </motion.div>
          )}
          
          {rank.discount && (
            <motion.div 
              className="absolute -top-2 -right-2 z-10"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                DISKON {rank.discount}
              </div>
            </motion.div>
          )}

          <div className={`${rank.bgColor} backdrop-blur-sm rounded-2xl p-8 border-2 ${rank.borderColor} hover:border-opacity-60 transition-all duration-300 hover:shadow-2xl relative overflow-hidden h-full`}>
            <div className="relative z-10">
              <motion.div 
                className={`w-20 h-20 bg-gradient-to-r ${rank.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <rank.icon className="h-10 w-10 text-white" />
              </motion.div>

              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-white mb-2">{rank.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${rank.color} text-white`}>
                  {rank.badge}
                </span>
              </div>
              
              <p className="text-gray-400 text-center mb-6">{rank.description}</p>

              <div className="text-center mb-6">
                {rank.originalPrice && (
                  <div className="text-gray-500 line-through text-lg mb-1">{formatPrice(rank.originalPrice)}</div>
                )}
                <div className="text-3xl font-bold text-white">{formatPrice(rank.price)}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {rank.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={featureIndex} 
                    className="flex items-center text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * featureIndex }}
                  >
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button 
                className={`w-full px-6 py-3 bg-gradient-to-r ${rank.color} hover:opacity-90 text-white rounded-xl font-bold transition-all duration-200 flex items-center justify-center space-x-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBuyClick(rank)}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Buy Now</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderCoins = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {coins.map((coin, index) => (
        <motion.div 
          key={coin.id} 
          className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300"
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          {coin.popular && (
            <motion.div 
              className="absolute -top-3 left-1/2 transform -translate-x-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                BEST VALUE
              </div>
            </motion.div>
          )}
          
          <motion.div 
            className={`w-16 h-16 bg-gradient-to-r ${coin.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <coin.icon className="h-8 w-8 text-white" />
          </motion.div>
          
          <h3 className="text-lg font-bold text-white text-center mb-2">{coin.name}</h3>
          <p className="text-gray-400 text-center text-sm mb-3">{coin.description}</p>
          
          {coin.bonus && (
            <div className="text-center mb-3">
              <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                {coin.bonus}
              </span>
            </div>
          )}
          
          <div className="text-center mb-4">
            {coin.originalPrice && (
              <div className="text-gray-500 line-through text-sm mb-1">{formatPrice(coin.originalPrice)}</div>
            )}
            <div className="text-xl font-bold text-white">{formatPrice(coin.price)}</div>
          </div>
          
          <motion.button 
            className={`w-full px-4 py-3 bg-gradient-to-r ${coin.color} hover:opacity-90 text-white rounded-xl font-bold transition-all duration-200 flex items-center justify-center space-x-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBuyClick(coin)}
          >
            <CreditCard className="h-4 w-4" />
            <span>Buy Now</span>
          </motion.button>
        </motion.div>
      ))}
    </div>
  );

  const renderKits = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kits.map((kit, index) => (
        <motion.div 
          key={kit.id} 
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <motion.div 
            className={`w-12 h-12 bg-gradient-to-r ${kit.color} rounded-lg flex items-center justify-center mb-4`}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <kit.icon className="h-6 w-6 text-white" />
          </motion.div>
          
          <h3 className="text-lg font-bold text-white mb-2">{kit.name}</h3>
          <p className="text-gray-400 text-sm mb-4">{kit.description}</p>
          
          {kit.items && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Includes:</p>
              <div className="flex flex-wrap gap-1">
                {kit.items.map((item, itemIndex) => (
                  <span key={itemIndex} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-white">{formatPrice(kit.price)}</span>
            <motion.button 
              className={`px-4 py-2 bg-gradient-to-r ${kit.color} hover:opacity-90 text-white rounded-lg font-semibold transition-all duration-200 text-sm`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleBuyClick(kit)}
            >
              Buy
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderSpecialOffers = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {specialOffers.map((offer, index) => (
        <motion.div 
          key={offer.id} 
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-pink-500/50 transition-all duration-300"
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <motion.div 
            className={`w-16 h-16 bg-gradient-to-r ${offer.color} rounded-xl flex items-center justify-center mb-6 mx-auto`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <offer.icon className="h-8 w-8 text-white" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white text-center mb-3">{offer.name}</h3>
          <p className="text-gray-400 text-center mb-6">{offer.description}</p>
          
          {offer.features && (
            <ul className="space-y-2 mb-6">
              {offer.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-gray-300">
                  <Sparkles className="w-4 h-4 text-pink-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          )}
          
          <div className="text-center mb-6">
            {offer.originalPrice && (
              <div className="text-gray-500 line-through text-lg mb-1">{formatPrice(offer.originalPrice)}</div>
            )}
            <div className="text-3xl font-bold text-white">{formatPrice(offer.price)}</div>
          </div>
          
          <motion.button 
            className={`w-full px-6 py-3 bg-gradient-to-r ${offer.color} hover:opacity-90 text-white rounded-xl font-bold transition-all duration-200 flex items-center justify-center space-x-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBuyClick(offer)}
          >
            <Gift className="h-4 w-4" />
            <span>Get Now</span>
          </motion.button>
        </motion.div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'ranks':
        return renderRanks();
      case 'coins':
        return renderCoins();
      case 'kits':
        return renderKits();
      case 'special':
        return renderSpecialOffers();
      default:
        return renderRanks();
    }
  };

  return (
    <motion.section 
      className="pt-24 pb-20 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            Store Ardentia Network
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Belanja item-item menarik untuk meningkatkan pengalaman bermainmu!
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="h-5 w-5" />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants}>
          {renderContent()}
        </motion.div>

        {/* Payment Methods */}
        <motion.div 
          className="mt-20 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-6">Metode Pembayaran</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            {['DANA', 'OVO', 'GoPay', 'QRIS', 'Bank Transfer', 'Indomaret'].map((method, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-700/50 rounded-lg p-4 text-center border border-gray-600 hover:border-orange-400 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-gray-300 font-semibold text-sm">{method}</span>
              </motion.div>
            ))}
          </div>
          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">
              Pembayaran aman dan terpercaya melalui Tripay. Otomatis terkirim setelah pembayaran berhasil.
            </p>
            <p className="text-green-400 text-sm font-semibold">
              ✅ Instant Delivery • ✅ 24/7 Support • ✅ Money Back Guarantee
            </p>
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedItem && (
        <PaymentModal
          item={selectedItem}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedItem(null);
          }}
        />
      )}
    </motion.section>
  );
};

export default Store;