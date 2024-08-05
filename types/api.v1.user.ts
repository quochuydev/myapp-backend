import { User } from '@prisma/client';
import { APIService } from '../foundation/types';

export type ApiV1UserGetList = APIService<
  'api.v1.user.getList',
  {
    q?: string;
  },
  {
    users: User[];
  }
>;

export type ApiV1UserCreate = APIService<
  'api.v1.user.create',
  {
    email: string;
  },
  {
    id: string;
  }
>;
