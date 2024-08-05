import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';
import { ApiV1UserCreate } from '../types/api.v1.user';

const schema = z.object({
  email: z.string(),
});

const validate: Validate<ApiV1UserCreate> = async (data, injection) => {
  return isValidRequest({
    data: {
      ...data.body,
    },
    schema,
  });
};

const authorize: Authorize<ApiV1UserCreate> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1UserCreate> = async (data, injection) => {
  const { prismaService } = injection;

  const result = await prismaService.user.create({
    data: {
      email: data.body.email,
    },
  });
  return {
    code: 200,
    body: {
      id: result.id,
    },
  };
};

const subject: ApiV1UserCreate['subject'] = 'api.v1.user.create';

export default {
  subject,
  validate,
  authorize,
  handle,
};
