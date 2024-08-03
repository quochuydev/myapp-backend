import { ApiV1AuthAuthorize } from "../types/api.v1.auth";
import { Authorize, Handle, Validate } from "../foundation/types";

const validate: Validate<ApiV1AuthAuthorize> = async (data, injection) => {
  return { code: 200 };
};

const authorize: Authorize<ApiV1AuthAuthorize> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1AuthAuthorize> = async (data, injection) => {
  return { code: 200 };
};

const subject: ApiV1AuthAuthorize["subject"] = "api.v1.auth.authorize";

export default {
  subject,
  validate,
  authorize,
  handle,
};
