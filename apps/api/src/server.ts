import Fastify from 'fastify';
import cors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { appRouter } from './trpc/routers/index.js';
import { createContext } from './trpc/context.js';

export async function createServer() {
  const server = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
    maxParamLength: 5000,
  });

  // Register CORS
  await server.register(cors, {
    origin: [
      'http://localhost:3000',
      'http://localhost:8081', // Expo web
      'http://localhost:19006', // Expo web alternate
      // Add your production domains here
    ],
    credentials: true,
  });

  // Register tRPC plugin
  await server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext,
      onError({ path, error }: { path: string | undefined; error: Error }) {
        console.error(`Error in tRPC handler on path '${path}':`, error);
      },
    },
  });

  // Health check endpoint
  server.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  return server;
}
