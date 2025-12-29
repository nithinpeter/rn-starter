import {
  getAuth,
  signInWithCredential,
  AppleAuthProvider,
  updateProfile,
} from '@react-native-firebase/auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';

export const isAppleSignInAvailable = async (): Promise<boolean> => {
  if (Platform.OS !== 'ios') {
    return false;
  }
  return await AppleAuthentication.isAvailableAsync();
};

export const signInWithApple = async (): Promise<void> => {
  if (Platform.OS !== 'ios') {
    throw new Error('Apple Sign-In is only available on iOS');
  }

  // Generate a random nonce for security
  const nonce = Math.random().toString(36).substring(2, 10);
  const hashedNonce = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    nonce
  );

  // Request Apple Sign-In
  const appleCredential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
    nonce: hashedNonce,
  });

  const { identityToken } = appleCredential;

  if (!identityToken) {
    throw new Error('Apple Sign-In failed - no identity token returned');
  }

  // Create a Firebase credential from the Apple ID token
  const firebaseCredential = AppleAuthProvider.credential(identityToken, nonce);

  // Sign in with the credential
  const auth = getAuth();
  const userCredential = await signInWithCredential(auth, firebaseCredential);

  // Update display name if this is a new user and Apple provided the name
  if (
    appleCredential.fullName?.givenName &&
    !userCredential.user.displayName
  ) {
    const displayName = [
      appleCredential.fullName.givenName,
      appleCredential.fullName.familyName,
    ]
      .filter(Boolean)
      .join(' ');

    await updateProfile(userCredential.user, { displayName });
  }
};
