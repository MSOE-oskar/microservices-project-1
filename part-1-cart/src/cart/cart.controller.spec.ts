import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller.js';
import { CartService } from './cart.service.js';

describe('CartController', () => {
  let controller: CartController;
  const cartService = { test: vi.fn().mockReturnValue('TODO') };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [{ provide: CartService, useValue: cartService }],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getCart should delegate to the service', () => {
    expect(controller.getCart()).toBe('TODO');
    expect(cartService.test).toHaveBeenCalled();
  });
});
