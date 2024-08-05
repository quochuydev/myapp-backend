import { Prisma } from '@prisma/client';
import * as z from 'zod';
import { Authorize, Handle, Validate } from '../core/types';
import { isValidRequest } from '../core/utils';
import { ApiV1UserGetList } from '../types/api.v1.user';

const schema = z.object({
  q: z.string().optional(),
});

const validate: Validate<ApiV1UserGetList> = async (data, injection) => {
  return isValidRequest({
    data: {
      ...data.body,
    },
    schema,
  });
};

const authorize: Authorize<ApiV1UserGetList> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1UserGetList> = async (data, injection) => {
  const prismaService = injection.prismaService;

  const userWhereInput: Prisma.UserWhereInput = {};
  if (data.body.q) userWhereInput.email = { contains: data.body.q };

  const users = await prismaService.user.findMany({
    where: userWhereInput,
  });

  return {
    code: 200,
    body: {
      users,
    },
  };
};

const subject: ApiV1UserGetList['subject'] = 'api.v1.user.getList';

export default {
  subject,
  validate,
  authorize,
  handle,
};
