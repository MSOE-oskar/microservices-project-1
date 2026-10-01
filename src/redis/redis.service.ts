import { Injectable, Inject } from '@nestjs/common';
import { type RedisClientType } from 'redis';
import { REDIS_CLIENT } from './redis.constants.js';
import { Cart } from '../interfaces/cart.interface.js';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: RedisClientType) {}

  async getCart(userId: number): Promise<Cart | null> {
    const key = `user:${userId}`;
    const cart = await this.redis.json.get(key);
    return cart != null ? (cart as any as Cart) : null;
  }

  async setCart(userId: number, cart: Cart) {
    const key = `user:${userId}`;
    await this.redis.json.set(key, '$', cart as any);
  }
}
