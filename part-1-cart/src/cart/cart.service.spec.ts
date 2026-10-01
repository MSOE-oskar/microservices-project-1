import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service.js';

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

  describe('test', () => {
    it('should return "Service Method"', () => {
      expect(service.test()).toBe('Service Method');
    });
  });
});
