import Constants from 'expo-constants';

export interface AppEnvConfig {
  apiUrl: string;
  wsUrl: string;
  universityWebsiteUrl: string;
  enableAnalytics: boolean;
  enableSentry: boolean;
  environment: 'development' | 'staging' | 'production';
}

const getEnvConfig = (): AppEnvConfig => {
  const isDev = __DEV__;
  
  // Replace with local IP during USB / Expo Go debugging if needed
  const devHost = Constants.expoConfig?.hostUri?.split(':')[0] || '192.168.1.15';

  if (isDev) {
    return {
      apiUrl: `http://${devHost}:8000/api/v1`,
      wsUrl: `ws://${devHost}:8000/ws/announcements`,
      universityWebsiteUrl: 'https://ruraluniv.ac.in',
      enableAnalytics: false,
      enableSentry: false,
      environment: 'development',
    };
  }

  return {
    apiUrl: 'https://api.ruraluniv.ac.in/api/v1',
    wsUrl: 'wss://api.ruraluniv.ac.in/ws/announcements',
    universityWebsiteUrl: 'https://ruraluniv.ac.in',
    enableAnalytics: true,
    enableSentry: true,
    environment: 'production',
  };
};

export const ENV = getEnvConfig();
