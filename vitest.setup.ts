import { beforeAll, afterAll } from 'vitest';
import { Server } from './foundation/integration-server';

beforeAll(() => {
  Server.start();
});

afterAll(() => {
  Server.stop();
});
