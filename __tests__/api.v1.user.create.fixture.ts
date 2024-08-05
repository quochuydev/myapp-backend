import { APIRequest } from '../foundation/types';
import { ApiV1UserCreate } from '../types/api.v1.user';

const valid: APIRequest<ApiV1UserCreate> = {
  headers: {},
  body: {
    email: 'email',
  },
};

export default {
  valid,
  expectedData: {
    email: 'email',
  },
};
