import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import { useAuth } from '@/hooks/use-auth';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function AppleSignInButton() {
  const { signInWithApple, isLoading } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = async () => {
    try {
      await signInWithApple();
    } catch (error) {
      console.error('Apple sign-in error:', error);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isDark ? styles.buttonLight : styles.buttonDark,
        pressed && styles.buttonPressed,
      ]}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text
        style={[
          styles.appleIcon,
          isDark ? styles.textDark : styles.textLight,
        ]}
      >

      </Text>
      <Text
        style={[
          styles.buttonText,
          isDark ? styles.textDark : styles.textLight,
        ]}
      >
        Continue with Apple
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonDark: {
    backgroundColor: '#000000',
  },
  buttonLight: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  appleIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  textLight: {
    color: '#FFFFFF',
  },
  textDark: {
    color: '#000000',
  },
});
