import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getFirebaseAdminApp } from './firebase-admin.js';

let db: Firestore | undefined;

export function getFirestoreDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseAdminApp());
  }
  return db;
}

export const collections = {
  users: () => getFirestoreDb().collection('users'),
} as const;
