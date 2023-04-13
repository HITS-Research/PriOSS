import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.pg.prioss',
  appName: 'Prioss',
  webDir: 'dist/prioss',
  bundledWebRuntime: false,
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: "Library/CapacitorDatabase",
      iosIsEncryption: false,
      iosKeychainPrefix: "cap",
      iosBiometric: {
        biometricAuth: false,
        biometricTitle : "Biometric login for capacitor sqlite"
      }
    }
  }
};

export default config;
