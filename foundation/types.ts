import RedisService from '../foundation/redis-service';
import PrismaService from '../foundation/prisma-service';
import { Configuration } from '../configuration';

export type Injection = {
  configuration: Configuration;
  redisService?: Awaited<ReturnType<typeof RedisService>>;
  prismaService?: Awaited<ReturnType<typeof PrismaService>>;
};

export type APIService<Subject = string, Request = any, Response = any> = {
  subject: Subject;
  request: Request;
  response: Response;
};

export type APIRequest<T extends APIService> = {
  headers: Record<string, string>;
  body: T['request'];
};

type Code = 200 | 400 | 401 | 403 | 500;

export type Validate<T extends APIService> = (
  data: {
    headers: Record<string, string>;
    body: T['request'];
  },
  injection: Injection
) => Promise<{ code: Code; headers?: Record<string, string> }>;

export type Authorize<T extends APIService> = (
  data: {
    headers: Record<string, string>;
    body: T['request'];
  },
  injection: Injection
) => Promise<{ code: Code; headers?: Record<string, string> }>;

export type Handle<T extends APIService> = (
  data: {
    headers: Record<string, string>;
    body: T['request'];
  },
  injection: Injection
) => Promise<{
  code: Code;
  body?: T['response'];
  headers?: Record<string, string>;
}>;

export type APIHandler = {
  subject: string;
  validate: Validate<APIService<string>>;
  authorize: Authorize<APIService<string>>;
  handle: Handle<APIService<string>>;
};
