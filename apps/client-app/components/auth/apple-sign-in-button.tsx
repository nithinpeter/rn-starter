import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useAuth } from '@/hooks/use-auth';
import { isAppleSignInAvailable } from '@/services/auth/apple-auth';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function AppleSignInButton() {
  const { signInWithApple } = useAuth();
  const colorScheme = useColorScheme();
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    isAppleSignInAvailable().then(setIsAvailable);
  }, []);

  const handlePress = async () => {
    try {
      await signInWithApple();
    } catch (error) {
      console.error('Apple sign-in error:', error);
    }
  };

  if (!isAvailable) {
    return null;
  }

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={
        colorScheme === 'dark'
          ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
          : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
      }
      cornerRadius={8}
      style={styles.button}
      onPress={handlePress}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 48,
  },
});
