import { beforeAll, describe, expect, it } from 'vitest';
import handler from '../apis/api.v1.user.create';
import fixture from './api.v1.user.create.fixture';
import { getInjection } from '../foundation/integration-server';

describe('Testing', async () => {
  it(`With invalid payload from body, validate will be successful`, async () => {
    const result = await handler.validate(fixture.valid, getInjection());
    expect(result).toBeDefined();
  });

  it(`With valid payload from body, handle will be successful`, async () => {
    const result = await handler.handle(fixture.valid, getInjection());
    expect(result.body).toBeDefined();

    const prismaService = getInjection().prismaService;

    const user = await prismaService.user.findFirst({
      where: {
        id: result.body.id,
      },
    });

    expect(user).toBeDefined();
  });
});
