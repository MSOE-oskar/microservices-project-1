import { Injectable, Inject } from '@nestjs/common';
import { type RedisClientType } from 'redis';
import { REDIS_CLIENT } from './redis.constants.js';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: RedisClientType) {}

  private readonly valueLifespan: number = 60 * 60 * 24;

  async getCachedData(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }
}
