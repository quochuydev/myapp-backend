import { describe, expect, it } from 'vitest';
import handler from '../apis/api.v1.user.getList';
import fixture from './api.v1.user.getList.fixture';

describe('Testing', async () => {
  it(`With invalid payload from body, validate will be successful`, async () => {
    const result = await handler.validate(fixture.valid, {});
    expect(result).toBeDefined();
  });

  it(`With valid payload from body, handle will be successful`, async () => {
    const result = await handler.handle(fixture.valid, {});
    expect(result).toBeDefined();
  });
});
