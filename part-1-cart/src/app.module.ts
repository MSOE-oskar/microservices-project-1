import { Module } from '@nestjs/common';
import { CartController } from './cart/cart.controller.js';
import { CartService } from './cart/cart.service.js';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [CartService],
})
export class AppModule {}
