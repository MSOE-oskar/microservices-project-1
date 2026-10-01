import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service.js';
import { Cart, Product } from '../interfaces/cart.interface.js';
import { RedisService } from '../redis/redis.service.js';

describe('CartService', () => {
  let service: CartService;
  let store: Map<number, Cart>;

  const redisService = {
    getCart: vi.fn(),
    setCart: vi.fn(),
  };

  const product1: Product = {
    id: 1,
    name: 'product 1',
    description: 'test',
    usdPrice: 3.99,
    categories: [{ id: 1, name: 'test' }],
  };
  const product2: Product = { ...product1, id: 2, name: 'product 2' };

  beforeEach(async () => {
    vi.clearAllMocks();

    store = new Map();
    redisService.getCart.mockImplementation(
      async (userId: number) => store.get(userId) ?? null,
    );
    redisService.setCart.mockImplementation(
      async (userId: number, cart: Cart) => {
        store.set(userId, cart);
      },
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        { provide: RedisService, useValue: redisService },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCart', () => {
    it('should return an empty cart if there are no items', async () => {
      expect(await service.getCart(42)).toEqual({ products: [] });
    });

    it('should return all products in the cart', async () => {
      store.set(1, {
        products: [product1, product2],
      });

      expect(await service.getCart(1)).toEqual({
        products: [product1, product2],
      });
    });

    it('should not return products in other carts', async () => {
      store.set(1, {
        products: [product1],
      });

      store.set(2, {
        products: [product2],
      });

      expect(await service.getCart(1)).toEqual({
        products: [product1],
      });
    });
  });
});
