import { Module } from '@nestjs/common';
import { CartController } from './cart/cart.controller.js';
import { CartService } from './cart/cart.service.js';
import { RedisModule } from './redis/redis.module.js';

@Module({
  imports: [RedisModule],
  controllers: [CartController],
  providers: [CartService],
})
export class AppModule {}
