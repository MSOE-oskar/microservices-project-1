import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  test(): string {
    return 'Service Method';
  }
}
