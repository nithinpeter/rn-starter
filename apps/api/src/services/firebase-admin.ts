import { initializeApp, cert, getApps, type App } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';
import { env } from '../env.js';

let app: App | undefined;

export function getFirebaseAdminApp(): App {
  if (getApps().length === 0) {
    app = initializeApp({
      credential: cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      storageBucket: env.FIREBASE_STORAGE_BUCKET,
    });
  }
  return app ?? getApps()[0]!;
}

export async function verifyFirebaseToken(idToken: string): Promise<DecodedIdToken> {
  const auth = getAuth(getFirebaseAdminApp());
  return auth.verifyIdToken(idToken);
}

export type { DecodedIdToken };
