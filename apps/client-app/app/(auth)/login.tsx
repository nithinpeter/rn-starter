import {
  Platform,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { GoogleSignInButton } from '@/components/auth/google-sign-in-button';
import { AppleSignInButton } from '@/components/auth/apple-sign-in-button';
import { useAuth } from '@/hooks/use-auth';
import { useBrand } from '@/hooks/use-brand';

export default function LoginScreen() {
  const { isLoading, error } = useAuth();
  const { brand, colors, logo } = useBrand();

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.logoContainer, { borderColor: colors.border }]}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>
          <Text style={[styles.logoText, { color: colors.text }]}>
            {brand.metadata.shortName.toUpperCase()}
          </Text>
          <ThemedText style={styles.subtitle}>
            {brand.metadata.description || 'Sign in to continue'}
          </ThemedText>
        </View>

        {error && (
          <View
            style={[
              styles.errorContainer,
              { backgroundColor: `${colors.error}15`, borderColor: colors.error },
            ]}>
            <ThemedText style={[styles.errorText, { color: colors.error }]}>
              {error}
            </ThemedText>
          </View>
        )}

        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.tint} />
          ) : (
            <>
              <GoogleSignInButton />
              {(Platform.OS === 'ios' || Platform.OS === 'web') && (
                <AppleSignInButton />
              )}
            </>
          )}
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  logoText: {
    fontFamily: 'BebasNeue_400Regular',
    fontSize: 36,
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    opacity: 0.6,
    textAlign: 'center',
    maxWidth: 280,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    maxWidth: 300,
    borderWidth: 1,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 12,
  },
});
