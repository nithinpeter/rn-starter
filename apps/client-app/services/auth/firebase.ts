import {
  getAuth,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signOut,
  getIdToken as firebaseGetIdToken,
} from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const firebaseAuth = getAuth();

export const onAuthStateChanged = (
  callback: (user: FirebaseAuthTypes.User | null) => void
): (() => void) => {
  return firebaseOnAuthStateChanged(firebaseAuth, callback);
};

export const getCurrentUser = (): FirebaseAuthTypes.User | null => {
  return firebaseAuth.currentUser;
};

export const signOutFirebase = async (): Promise<void> => {
  await signOut(firebaseAuth);
};

export const getIdToken = async (): Promise<string | null> => {
  const user = firebaseAuth.currentUser;
  if (!user) return null;
  return firebaseGetIdToken(user);
};
