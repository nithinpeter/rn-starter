// Re-export AppRouter type from the API server
export type { AppRouter } from '../../../apps/api/src/trpc/routers/index.js';

// Re-export User type from the API
export type { User } from '../../../apps/api/src/trpc/routers/user.js';

export interface ApiClientConfig {
  baseUrl: string;
  getToken: () => Promise<string | null>;
}
