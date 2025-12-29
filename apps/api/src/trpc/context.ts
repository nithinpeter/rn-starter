import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { verifyFirebaseToken, type DecodedIdToken } from '../services/firebase-admin.js';

export interface User {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
}

export interface Context {
  user: User | null;
  requestId: string;
}

function extractUserFromToken(decodedToken: DecodedIdToken): User {
  return {
    uid: decodedToken.uid,
    email: decodedToken.email ?? null,
    emailVerified: decodedToken.email_verified ?? false,
    displayName: decodedToken.name ?? null,
    photoURL: decodedToken.picture ?? null,
  };
}

export async function createContext({
  req,
}: CreateFastifyContextOptions): Promise<Context> {
  const requestId = req.id;

  // Extract Bearer token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return { user: null, requestId };
  }

  const idToken = authHeader.substring(7);

  try {
    const decodedToken = await verifyFirebaseToken(idToken);
    return {
      user: extractUserFromToken(decodedToken),
      requestId,
    };
  } catch (error) {
    // Invalid token - return null user
    console.warn('Failed to verify Firebase token:', error);
    return { user: null, requestId };
  }
}

export type ContextType = Awaited<ReturnType<typeof createContext>>;
