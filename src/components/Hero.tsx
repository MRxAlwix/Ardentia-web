import React from 'react';
import { Play, Users, Award, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-orange-900/20 to-yellow-900/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGNTlFMEIiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
              Ardentia Network
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Server Minecraft Premium Terbaik di Indonesia
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pemain dalam petualangan gaming yang tak terlupakan. 
              Rasakan pengalaman bermain dengan fitur premium dan komunitas yang luar biasa.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Main Sekarang</span>
            </button>
            <button className="px-8 py-4 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
              Lihat Store
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-200">
              <Users className="h-8 w-8 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Komunitas Aktif</h3>
              <p className="text-gray-400">Bergabung dengan 10,000+ pemain aktif dalam komunitas yang berkembang</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-200">
              <Award className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Fitur Premium</h3>
              <p className="text-gray-400">Rank eksklusif, item khusus, dan kemampuan untuk meningkatkan gameplay</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-200">
              <Zap className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Server 24/7</h3>
              <p className="text-gray-400">Server handal dengan uptime 99.9% dan pengalaman bebas lag</p>
            </div>
          </div>
        </div>
      </div>

      {/* Server Status */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg px-6 py-3 border border-gray-700">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Server Online</span>
            </div>
            <div className="h-4 w-px bg-gray-600"></div>
            <span className="text-gray-300">1,247 Pemain Online</span>
            <div className="h-4 w-px bg-gray-600"></div>
            <span className="text-gray-300">play.ardentia.net</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;