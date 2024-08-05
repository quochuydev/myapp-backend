import { APIRequest } from '../core/types';
import { ApiV1UserGetList } from '../types/api.v1.user';

const valid: APIRequest<ApiV1UserGetList> = {
  headers: {},
  body: {
    q: 'email',
  },
};

export default {
  valid,
  postgresData: {
    user: {
      email: 'email@email.com',
    },
  },
};
