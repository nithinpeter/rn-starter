import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useAuth } from '@/hooks/use-auth';

export function GoogleSignInButton() {
  const { signInWithGoogle, isLoading } = useAuth();

  const handlePress = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      // Error is handled by auth context
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      disabled={isLoading}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.googleIcon}>G</Text>
      </View>
      <Text style={styles.buttonText}>Continue with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#DADCE0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F1F1F',
  },
});
