import { beforeAll, describe, expect, it } from 'vitest';
import handler from '../apis/api.v1.user.getList';
import { getInjection } from '../core-test/server';
import fixture from './api.v1.user.getList.fixture';

describe('Testing', async () => {
  beforeAll(async () => {
    const prismaService = getInjection().prismaService;

    await prismaService.user.create({
      data: fixture.postgresData.user,
    });
  });

  it(`With invalid payload from body, validate will be successful`, async () => {
    const result = await handler.validate(fixture.valid, getInjection());
    expect(result).toBeDefined();
  });

  it(`With valid payload from body, handle will be successful`, async () => {
    const result = await handler.handle(fixture.valid, getInjection());
    expect(result).toBeDefined();
  });
});
