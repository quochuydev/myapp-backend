import { beforeAll, afterAll } from 'vitest';
import Server from './foundation/integration-server';

beforeAll(async () => {
  await Server.start();
});

afterAll(async () => {
  await Server.stop();
});
