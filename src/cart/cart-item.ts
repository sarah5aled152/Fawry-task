import { CartItem, Product } from '../interfaces';

export class CartItemImp implements CartItem {
  constructor(
    public product: Product,
    public quantity: number
  ) {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
  }

  getLineTotal(): number {
    return this.product.price * this.quantity;
  }
}
