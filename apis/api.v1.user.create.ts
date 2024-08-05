import { ApiV1UserCreate } from '../types/api.v1.user';
import { Authorize, Handle, Validate } from '../foundation/types';

const validate: Validate<ApiV1UserCreate> = async (data, injection) => {
  return { code: 200 };
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
