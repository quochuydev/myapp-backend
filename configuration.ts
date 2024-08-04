import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import * as z from 'zod';

if (process.env.ENV_PATH) {
  const envPath = path.join(process.cwd(), process.env.ENV_PATH);
  const buffer = fs.readFileSync(envPath);
  const defaultConfig = dotenv.parse(buffer);

  Object.entries(defaultConfig).forEach(([key, value]) => {
    if (!process.env[key]) process.env[key] = value;
  });
}

const schema = z.object({
  port: z.number(),
  buildVersion: z.string().optional(),
  session: z.object({
    secret: z.string().optional(),
  }),
  redis: z.object({
    url: z.string().optional(),
  }),
  postgres: z.object({
    url: z.string().optional(),
  }),
  mongo: z.object({
    url: z.string().optional(),
  }),
  cognito: z.object({
    issuer: z.string().optional(),
    clientId: z.string().optional(),
    clientSecret: z.string().optional(),
    callbackUrl: z.string().optional(),
  }),
});

export type Configuration = z.infer<typeof schema>;

const configuration: Configuration = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  buildVersion: process.env.BUILD_VERSION as string,
  session: {
    secret: process.env.SESSION_SECRET as string,
  },
  redis: {
    url: process.env.REDIS_URL as string,
  },
  postgres: {
    url: process.env.POSTGRES_URL as string,
  },
  mongo: {
    url: process.env.MONGO_URL as string,
  },
  cognito: {
    issuer: process.env.COGNITO_ISSUER as string,
    clientId: process.env.COGNITO_CLIENT_ID as string,
    clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
    callbackUrl: process.env.COGNITO_CALLBACK_URL as string,
  },
};

try {
  console.log(`debug:configuration`, configuration);
  schema.parse(configuration);
} catch (error) {
  console.error('Bad configuration.', error);
  throw error;
}

export default configuration;
