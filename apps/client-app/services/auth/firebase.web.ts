import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { firebaseConfig } from '@/firebase.config';

// Initialize Firebase for web (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const firebaseAuth = getAuth(app);

export const onAuthStateChanged = (
  callback: (user: User | null) => void
): (() => void) => {
  return firebaseOnAuthStateChanged(firebaseAuth, callback);
};

export const getCurrentUser = (): User | null => {
  return firebaseAuth.currentUser;
};

export const signOutFirebase = async (): Promise<void> => {
  await firebaseSignOut(firebaseAuth);
};

export const getIdToken = async (): Promise<string | null> => {
  const user = firebaseAuth.currentUser;
  if (!user) return null;
  return user.getIdToken();
};
