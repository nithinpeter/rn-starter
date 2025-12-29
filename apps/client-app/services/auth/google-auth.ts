import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@/firebase.config';

// Configure Google Sign-In (call once at app startup)
GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

export const signInWithGoogle = async (): Promise<void> => {
  // Check if device supports Google Play Services
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  // Get the user's ID token
  const signInResult = await GoogleSignin.signIn();

  const idToken = signInResult.data?.idToken;

  if (!idToken) {
    throw new Error('No ID token found from Google Sign-In');
  }

  // Create a Google credential with the token
  const googleCredential = GoogleAuthProvider.credential(idToken);

  // Sign in with the credential
  const auth = getAuth();
  await signInWithCredential(auth, googleCredential);
};

export const signOutGoogle = async (): Promise<void> => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    // User might not be signed in with Google, ignore
    console.warn('Google sign out warning:', error);
  }
};
