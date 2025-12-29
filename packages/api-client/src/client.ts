import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter, ApiClientConfig } from './types';

export function createApiClient(config: ApiClientConfig) {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${config.baseUrl}/trpc`,
        async headers() {
          const token = await config.getToken();
          return token ? { authorization: `Bearer ${token}` } : {};
        },
      }),
    ],
  });
}

export type ApiClient = ReturnType<typeof createApiClient>;
