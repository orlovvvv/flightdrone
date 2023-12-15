import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'flightdrone',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
