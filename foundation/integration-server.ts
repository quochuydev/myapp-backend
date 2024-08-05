import configuration from '../configuration';
import PrismaService from './prisma-service';
import RedisService from './redis-service';
import { Injection } from './types';

const injection: Injection = {
  redisService: undefined,
  prismaService: undefined,
};

export const getInjection = () => injection;

export const Server = {
  start: async () => {
    const redisService = await RedisService(configuration.redis.url);
    const prismaService = PrismaService(configuration.postgres.url);

    injection.prismaService = prismaService;
    injection.redisService = redisService;
  },
  stop: async () => {
    await Promise.allSettled([
      getInjection().redisService?.dispose(),
      getInjection().prismaService?.$disconnect(),
    ]);
  },
};
