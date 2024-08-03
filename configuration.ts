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
  redis: z.object({
    url: z.string().optional(),
  }),
  postgres: z.object({
    url: z.string().optional(),
  }),
  mongo: z.object({
    url: z.string().optional(),
  }),
});

const configuration = {
  port: process.env.PORT && parseInt(process.env.PORT),
  buildVersion: process.env.BUILD_VERSION as string,
  redis: {
    url: process.env.REDIS_URL as string,
  },
  postgres: {
    url: process.env.POSTGRES_URL as string,
  },
  mongo: {
    url: process.env.MONGO_URL as string,
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
