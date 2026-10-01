import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service.js';
import { Product } from '../interfaces/cart.interface.js';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCart', () => {
    it('should return an empty cart if there are no items', () => {
      expect(service.getCart(42)).toEqual({ products: [] });
    });

    it('should return all products in the cart', () => {
      const product1: Product = {
        id: 1,
        name: 'product 1',
        description: 'test',
        usdPrice: 3.99,
        categories: [
          {
            id: 1,
            name: 'test',
          },
        ],
      };

      const product2: Product = {
        id: 2,
        name: 'product 2',
        description: 'test',
        usdPrice: 3.99,
        categories: [
          {
            id: 1,
            name: 'test',
          },
        ],
      };

      service.addProductToCart(1, product1);
      service.addProductToCart(1, product2);

      expect(service.getCart(1)).toEqual({ products: [product1, product2] });
    });
  });
});
