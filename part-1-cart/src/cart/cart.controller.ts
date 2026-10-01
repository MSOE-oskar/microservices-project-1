import { Controller, Delete, Get, Post } from '@nestjs/common';
import { CartService } from './cart.service.js';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(): string {
    return this.cartService.test();
  }

  @Post()
  updateCart(): string {
    return 'TODO';
  }

  @Delete()
  deleteCart(): string {
    return 'TODO';
  }
}
