import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Users, Server } from 'lucide-react';
import { useServerStatus } from '../hooks/useServerStatus';

const ServerStatus = () => {
  const { serverStatus, isLoading, error } = useServerStatus();

  return (
    <motion.div 
      className="bg-gray-800/80 backdrop-blur-sm rounded-lg px-6 py-3 border border-gray-700"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <motion.div 
            className={`w-3 h-3 rounded-full ${
              serverStatus.online ? 'bg-green-400' : 'bg-red-400'
            }`}
            animate={{ 
              scale: serverStatus.online ? [1, 1.2, 1] : 1,
              opacity: serverStatus.online ? [1, 0.7, 1] : 0.5
            }}
            transition={{ 
              duration: 2, 
              repeat: serverStatus.online ? Infinity : 0 
            }}
          />
          <span className="text-gray-300 flex items-center space-x-1">
            {serverStatus.online ? (
              <>
                <Wifi className="h-3 w-3" />
                <span>Server Online</span>
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3" />
                <span>Server Offline</span>
              </>
            )}
          </span>
        </div>
        
        <div className="h-4 w-px bg-gray-600"></div>
        
        <span className="text-gray-300 flex items-center space-x-1">
          <Users className="h-3 w-3" />
          <span>
            {isLoading ? '...' : `${serverStatus.players.online}`} Pemain Online
          </span>
        </span>
        
        <div className="h-4 w-px bg-gray-600"></div>
        
        <span className="text-gray-300 flex items-center space-x-1">
          <Server className="h-3 w-3" />
          <span>play.ardentia.net</span>
        </span>
        
        {serverStatus.version && (
          <>
            <div className="h-4 w-px bg-gray-600"></div>
            <span className="text-gray-300 text-xs">
              v{serverStatus.version}
            </span>
          </>
        )}
      </div>
      
      {error && (
        <div className="mt-1 text-xs text-yellow-400">
          {error}
        </div>
      )}
    </motion.div>
  );
};

export default ServerStatus;