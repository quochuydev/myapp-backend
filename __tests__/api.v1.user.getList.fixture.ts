import { APIRequest } from '../foundation/types';
import { ApiV1UserGetList } from '../types/api.v1.user';

const valid: APIRequest<ApiV1UserGetList> = {
  headers: {},
  body: {
    q: 'keyword',
  },
};

export default {
  valid,
};
