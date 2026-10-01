import { Injectable } from '@nestjs/common';
import { Cart, Product } from '../interfaces/cart.interface.js';

@Injectable()
export class CartService {
  private readonly carts: Record<number, Cart> = {};

  getCart(userId: number): Cart {
    return this.carts[userId];
  }

  addProductToCart(userId: number, product: Product) {
    if (!Object.hasOwn(this.carts, userId)) {
      const newCart: Cart = {
        products: [],
      };
      this.carts[userId] = newCart;
    }
    this.carts[userId].products.push(product);
  }

  deleteCart(userId: number) {
    delete this.carts[userId];
  }
}
