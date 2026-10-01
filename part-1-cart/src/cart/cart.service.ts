import { Injectable } from '@nestjs/common';
import { Cart, Product } from '../interfaces/cart.interface.js';
import { RedisService } from '../redis/redis.service.js';

@Injectable()
export class CartService {
  constructor(private redisService: RedisService) {}

  async getCart(userId: number): Promise<Cart> {
    const cart = await this.redisService.getCart(userId);
    return cart ?? ({ products: [] } as Cart);
  }

  async addProductToCart(userId: number, product: Product) {
    const cart = await this.redisService.getCart(userId);
    const newCart: Cart = {
      products: [...(cart?.products || []), product],
    };
    await this.redisService.setCart(userId, newCart);
  }

  async deleteCart(userId: number) {
    await this.redisService.setCart(userId, { products: [] } as Cart);
  }
}
