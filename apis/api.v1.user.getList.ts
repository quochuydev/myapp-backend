import { ApiV1UserGetList } from "../types/api.v1.user";
import { Authorize, Handle, Validate } from "../foundation/types";

const validate: Validate<ApiV1UserGetList> = async (data, injection) => {
  return { code: 200 };
};

const authorize: Authorize<ApiV1UserGetList> = async (data, injection) => {
  return { code: 200 };
};

const handle: Handle<ApiV1UserGetList> = async (data, injection) => {
  return {
    code: 200,
    body: [
      {
        id: "1000",
      },
    ],
  };
};

const subject: ApiV1UserGetList["subject"] = "api.v1.user.getList";

export default {
  subject,
  validate,
  authorize,
  handle,
};
