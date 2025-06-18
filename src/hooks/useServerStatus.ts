import { useState, useEffect } from 'react';
import { getServerStatus, getFallbackServerStatus, MinecraftServerStatus } from '../utils/minecraftApi';

export const useServerStatus = () => {
  const [serverStatus, setServerStatus] = useState<MinecraftServerStatus>(getFallbackServerStatus());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const status = await getServerStatus();
        
        if (status) {
          setServerStatus(status);
        } else {
          // Use fallback data if API fails
          setServerStatus(getFallbackServerStatus());
          setError('Using fallback data - API unavailable');
        }
      } catch (err) {
        console.error('Server status error:', err);
        setServerStatus(getFallbackServerStatus());
        setError('Failed to fetch server status');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServerStatus();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { serverStatus, isLoading, error };
};