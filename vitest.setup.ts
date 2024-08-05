import { beforeAll, afterAll } from 'vitest';
import Server from './core-test/server';

beforeAll(async () => {
  await Server.start();
});

afterAll(async () => {
  await Server.stop();
});
