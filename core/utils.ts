import * as z from 'zod';
import { Code } from './types';

export const isValidRequest = ({
  data,
  schema,
}: {
  data: any;
  schema: z.ZodType<any>;
}): {
  code: Code;
  error?: any;
} => {
  try {
    schema.parse(data);
    return { code: 200 };
  } catch (err) {
    return {
      code: 400,
      error: {
        message: 'Invalid data',
        error: err,
      },
    };
  }
};
