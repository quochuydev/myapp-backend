import { startServer } from './foundation/server';

startServer({
  defaultAuthSubjects: ['api.v1.auth.authorize'],
  unauthorizedSubjects: [],
});
