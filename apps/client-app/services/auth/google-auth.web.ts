import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from './firebase.web';

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

export const signInWithGoogle = async (): Promise<void> => {
  await signInWithPopup(firebaseAuth, googleProvider);
};

export const signOutGoogle = async (): Promise<void> => {
  // No additional cleanup needed for web Google auth
};
