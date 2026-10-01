import { Module, Global, OnApplicationShutdown, Inject } from '@nestjs/common';
import { createClient, type RedisClientType } from 'redis';
import { REDIS_CLIENT } from './redis.constants.js';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async (): Promise<RedisClientType> => {
        const client = createClient({
          socket: {
            host: process.env.REDISHOST || '127.0.0.1',
            port: parseInt(process.env.REDISPORT || '6379', 10),
          },
        });

        client.on('error', (err) => console.error('Redis Client Error', err));
        client.on('ready', () => console.log('Connected to Memorystore Redis'));

        await client.connect();
        return client as RedisClientType;
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule implements OnApplicationShutdown {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClientType,
  ) {}

  async onApplicationShutdown() {
    await this.redisClient.disconnect();
    console.log('🔌 Disconnected from Memorystore Redis');
  }
}
