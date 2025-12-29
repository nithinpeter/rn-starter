import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, protectedProcedure } from '../index.js';
import { collections } from '../../services/firestore.js';

// User type for the starter template
export interface User {
  id: string;
  uid: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
  createdAt: number;
  updatedAt: number;
}

export const userRouter = router({
  // Public: Check if a user is authenticated
  whoami: publicProcedure.query(({ ctx }) => {
    return {
      user: ctx.user,
      isAuthenticated: ctx.user !== null,
    };
  }),

  // Protected: Get current user's basic auth info
  me: protectedProcedure.query(({ ctx }) => {
    return {
      uid: ctx.user.uid,
      email: ctx.user.email,
      emailVerified: ctx.user.emailVerified,
    };
  }),

  // Get current user's profile (creates if not exists)
  getProfile: protectedProcedure.query(async ({ ctx }): Promise<User> => {
    const userSnapshot = await collections
      .users()
      .where('uid', '==', ctx.user.uid)
      .limit(1)
      .get();

    if (!userSnapshot.empty) {
      const doc = userSnapshot.docs[0]!;
      return { id: doc.id, ...doc.data() } as User;
    }

    // Create new user record from auth user
    const now = Date.now();
    const newUser: Omit<User, 'id'> = {
      uid: ctx.user.uid,
      email: ctx.user.email ?? null,
      name: ctx.user.displayName ?? null,
      photoURL: ctx.user.photoURL ?? null,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await collections.users().add(newUser);
    return { id: docRef.id, ...newUser };
  }),

  // Update profile fields
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ ctx, input }): Promise<User> => {
      const userSnapshot = await collections
        .users()
        .where('uid', '==', ctx.user.uid)
        .limit(1)
        .get();

      if (userSnapshot.empty) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User profile not found',
        });
      }

      const doc = userSnapshot.docs[0]!;
      const updates: Partial<User> & { updatedAt: number } = {
        updatedAt: Date.now(),
      };

      if (input.name !== undefined) updates.name = input.name;

      await doc.ref.update(updates);

      const updatedDoc = await doc.ref.get();
      return { id: updatedDoc.id, ...updatedDoc.data() } as User;
    }),
});
