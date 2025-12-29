import { router } from '../index.js';
import { userRouter } from './user.js';

export const appRouter = router({
  user: userRouter,
});

// Export type for client usage
export type AppRouter = typeof appRouter;
