import type { ExpoConfig, ConfigContext } from 'expo/config';

// Color constants
const tintColorLight = '#0a7ea4';
const tintColorDark = '#0a7ea4';

// App colors for theming
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    error: '#dc3545',
    success: '#28a745',
    surface: '#f5f5f5',
    border: '#e9ecef',
  },
  dark: {
    text: '#ECEDEE',
    background: '#000000',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    error: '#f8d7da',
    success: '#d4edda',
    surface: '#121212',
    border: '#2a2a2a',
  },
};

// App metadata - update these for your app
const appConfig = {
  appName: 'RN Starter',
  shortName: 'RN Starter',
  scheme: 'rnstarter',
  iosBundleId: 'com.yourcompany.rnstarter',
  androidPackage: 'com.yourcompany.rnstarter',
  description: 'React Native + Firebase + tRPC Starter',
};

// Expo config export
export default ({ config }: ConfigContext): ExpoConfig => {
  const assetBasePath = './assets/images';

  return {
    ...config,
    name: appConfig.appName,
    slug: appConfig.shortName.toLowerCase().replace(/\s+/g, '-'),
    version: config.version ?? '1.0.0',
    orientation: 'portrait',
    icon: `${assetBasePath}/icon.png`,
    scheme: appConfig.scheme,
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      ...config.ios,
      supportsTablet: true,
      bundleIdentifier: appConfig.iosBundleId,
      googleServicesFile: './GoogleService-Info.plist',
      usesAppleSignIn: true,
    },
    android: {
      ...config.android,
      adaptiveIcon: {
        foregroundImage: `${assetBasePath}/adaptive-icon.png`,
        backgroundColor: Colors.dark.background,
      },
      edgeToEdgeEnabled: true,
      package: appConfig.androidPackage,
      googleServicesFile: './google-services.json',
    },
    web: {
      ...config.web,
      output: 'static',
      favicon: `${assetBasePath}/favicon.png`,
    },
    plugins: [
      'expo-router',
      '@react-native-firebase/app',
      '@react-native-firebase/auth',
      './plugins/withFirebaseModularHeaders',
      '@react-native-google-signin/google-signin',
      'expo-apple-authentication',
      [
        'expo-splash-screen',
        {
          image: `${assetBasePath}/splash-icon.png`,
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3001',
    },
  };
};
