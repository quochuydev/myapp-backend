import { startServer } from './core/server';

startServer({
  defaultAuthSubjects: ['api.v1.auth.authorize'],
  unauthorizedSubjects: [],
});
