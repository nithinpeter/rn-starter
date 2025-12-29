import { ImageSourcePropType } from 'react-native';
import { useColorScheme } from './use-color-scheme';
import { Colors } from '@/constants/theme';

/**
 * Brand configuration - centralized place for app branding.
 * Update these values to customize your app's identity.
 */
export const brand = {
  metadata: {
    appName: 'RN Starter',
    shortName: 'RN Starter',
    description: 'Sign in to continue',
  },
} as const;

/**
 * Hook that provides brand colors, metadata, and assets.
 * Uses the current color scheme (light/dark) for theming.
 */
export function useBrand() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // App logo - update this to use your own logo
  const logo: ImageSourcePropType = require('@/assets/images/icon.png');

  return {
    brand,
    colors,
    logo,
    colorScheme,
  };
}
