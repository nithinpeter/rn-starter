'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact, httpBatchLink, loggerLink, type CreateTRPCReact } from '@trpc/react-query';
import type { AppRouter, ApiClientConfig } from './types';

// Create the tRPC React hooks
export const trpc: CreateTRPCReact<AppRouter, unknown> = createTRPCReact<AppRouter>();

interface ApiProviderProps extends ApiClientConfig {
  children: React.ReactNode;
  enableLogging?: boolean;
}

declare const __DEV__: boolean | undefined;

export function ApiProvider({ children, baseUrl, getToken, enableLogging = false }: ApiProviderProps) {
  const shouldLog = enableLogging || (typeof __DEV__ !== 'undefined' && __DEV__);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1 minute
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (opts) => shouldLog && opts.direction === 'down' && opts.result instanceof Error,
          console: {
            log: (...args) => console.log('[tRPC]', ...args),
            error: (...args) => console.error('[tRPC Error]', ...args),
          },
        }),
        httpBatchLink({
          url: `${baseUrl}/trpc`,
          async headers() {
            const token = await getToken();
            return token ? { authorization: `Bearer ${token}` } : {};
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
