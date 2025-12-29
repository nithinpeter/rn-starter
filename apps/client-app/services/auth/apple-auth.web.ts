import { OAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from './firebase.web';

const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

export const isAppleSignInAvailable = async (): Promise<boolean> => {
  // Apple Sign-In via web is always available
  return true;
};

export const signInWithApple = async (): Promise<void> => {
  await signInWithPopup(firebaseAuth, appleProvider);
};
