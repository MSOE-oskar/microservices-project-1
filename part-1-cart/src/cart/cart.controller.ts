import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service.js';
import { type Product, type Cart } from '../interfaces/cart.interface.js';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':userId')
  getCart(@Param('userId') userId: number): Cart {
    return this.cartService.getCart(userId);
  }

  @Post(':userId')
  updateCart(@Param('userId') userId: number, @Body() product: Product) {
    this.cartService.addProductToCart(userId, product);
  }

  @Delete(':userId')
  deleteCart(@Param('userId') userId: number) {
    this.cartService.deleteCart(userId);
  }
}
