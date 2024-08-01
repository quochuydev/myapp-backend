import { ApiV1UserCreate } from "../types/api.v1.user";
import { Authorize, Handle, Validate } from "../foundation/types";

const validate: Validate<ApiV1UserCreate> = async (data, injection) => {
  throw { code: 400, message: "invalid data" };
};

const authorize: Authorize<ApiV1UserCreate> = async (data, injection) => {
  throw { code: 403, message: "permission denied" };
};

const handle: Handle<ApiV1UserCreate> = async (data, injection) => {
  return { code: 200, body: { id: "1000" } };
};

const subject: ApiV1UserCreate["subject"] = "api.v1.user.create";

export default {
  subject,
  validate,
  authorize,
  handle,
};
