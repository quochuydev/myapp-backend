import configuration from '../configuration';
import PrismaService from '../core/prisma-service';
import RedisService from '../core/redis-service';
import { Injection } from '../core/types';

let di: Injection;

function getInjection() {
  if (!di) {
    throw new Error('To use di, must start server before');
  }
  return di;
}

export { getInjection };

export default {
  start: async () => {
    const redisService = await RedisService(configuration.redis.url);
    const prismaService = PrismaService(configuration.postgres.url);

    di = {
      redisService,
      prismaService,
    };
  },
  stop: async () => {
    await Promise.allSettled([
      getInjection().redisService?.dispose(),
      getInjection().prismaService?.$disconnect(),
    ]);
  },
};
