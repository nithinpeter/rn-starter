import 'dotenv/config';
import { createServer } from './server.js';
import { env } from './env.js';

async function main() {
  const server = await createServer();

  try {
    const port = parseInt(env.PORT, 10);
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`API server running on http://localhost:${port}`);
    console.log(`tRPC endpoint: http://localhost:${port}/trpc`);
    console.log(`Health check: http://localhost:${port}/health`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();
