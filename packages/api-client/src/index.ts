// Types
export type { AppRouter, ApiClientConfig, User } from './types';

// Vanilla client (for non-React usage)
export { createApiClient, type ApiClient } from './client';

// React integration
export { trpc, ApiProvider } from './react';
