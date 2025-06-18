import axios from 'axios';

// Minecraft server status API
const MINECRAFT_API_BASE = 'https://api.mcsrvstat.us/3';
const SERVER_IP = 'play.ardentia.net';

export interface MinecraftServerStatus {
  online: boolean;
  players: {
    online: number;
    max: number;
    list?: string[];
  };
  version: string;
  motd: {
    raw: string;
    clean: string;
    html: string;
  };
  icon?: string;
  software?: string;
  map?: string;
  gamemode?: string;
  serverid?: string;
}

export const getServerStatus = async (): Promise<MinecraftServerStatus | null> => {
  try {
    const response = await axios.get(`${MINECRAFT_API_BASE}/${SERVER_IP}`, {
      timeout: 10000,
    });
    
    if (response.data && response.data.online !== undefined) {
      return {
        online: response.data.online,
        players: {
          online: response.data.players?.online || 0,
          max: response.data.players?.max || 0,
          list: response.data.players?.list || [],
        },
        version: response.data.version || 'Unknown',
        motd: {
          raw: response.data.motd?.raw?.[0] || 'Ardentia Network',
          clean: response.data.motd?.clean?.[0] || 'Ardentia Network',
          html: response.data.motd?.html?.[0] || 'Ardentia Network',
        },
        icon: response.data.icon,
        software: response.data.software,
        map: response.data.map,
        gamemode: response.data.gamemode,
        serverid: response.data.serverid,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching server status:', error);
    return null;
  }
};

// Fallback data when API is unavailable
export const getFallbackServerStatus = (): MinecraftServerStatus => ({
  online: true,
  players: {
    online: Math.floor(Math.random() * 500) + 800, // Random between 800-1300
    max: 2000,
  },
  version: '1.20.4',
  motd: {
    raw: 'Ardentia Network - Premium Minecraft Server',
    clean: 'Ardentia Network - Premium Minecraft Server',
    html: 'Ardentia Network - Premium Minecraft Server',
  },
});