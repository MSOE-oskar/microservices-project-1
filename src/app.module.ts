import { Module } from '@nestjs/common';
import { CartController } from './cart/cart.controller.js';
import { CartService } from './cart/cart.service.js';
import { RedisModule } from './redis/redis.module.js';
import { RedisService } from './redis/redis.service.js';

@Module({
  imports: [RedisModule],
  controllers: [CartController],
  providers: [CartService, RedisService],
})
export class AppModule {}
