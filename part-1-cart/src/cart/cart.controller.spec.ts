import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller.js';
import { CartService } from './cart.service.js';
import type { Product } from '../interfaces/cart.interface.js';

describe('CartController', () => {
  let controller: CartController;
  const cartService = {
    getCart: vi.fn(),
    addProductToCart: vi.fn(),
    deleteCart: vi.fn(),
  };
  const product: Product = {
    id: 1,
    name: 'Widget',
    description: 'A widget',
    usdPrice: 9.99,
    categories: [],
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [{ provide: CartService, useValue: cartService }],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCart', () => {
    it('should return the cart from the service', () => {
      cartService.getCart.mockReturnValue({ products: [product] });

      expect(controller.getCart(1)).toEqual({ products: [product] });
      expect(cartService.getCart).toHaveBeenCalledWith(1);
    });
  });

  describe('updateCart', () => {
    it('should pass the product to the service', () => {
      controller.updateCart(1, product);

      expect(cartService.addProductToCart).toHaveBeenCalledWith(1, product);
    });
  });

  describe('deleteCart', () => {
    it('should delete the cart via the service', () => {
      controller.deleteCart(1);

      expect(cartService.deleteCart).toHaveBeenCalledWith(1);
    });
  });
});
