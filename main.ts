import { startServer } from "./foundation/server";

startServer({
  defaultAuthSubjects: ["api.v1.auth.authorize"],
  customAuthSubjects: [
    {
      authSubjects: ["api.v1.auth.authorize.external"],
      subjects: ["api.external.v1.user.getList"],
    },
  ],
  unauthorizedSubjects: [],
});
