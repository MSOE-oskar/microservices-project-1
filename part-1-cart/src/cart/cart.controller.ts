import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service.js';
import { Product, Cart } from '../interfaces/cart.interface.js';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':userId')
  getCart(@Param('userId') userId: number): Promise<Cart> {
    return this.cartService.getCart(userId);
  }

  @Post(':userId')
  updateCart(
    @Param('userId') userId: number,
    @Body() product: Product,
  ): string {
    this.cartService.addProductToCart(userId, product);
    return `${product.name} added to cart!`;
  }

  @Delete(':userId')
  deleteCart(@Param('userId') userId: number): string {
    this.cartService.deleteCart(userId);
    return `Successfully deleted user ${userId}'s cart.`;
  }
}
