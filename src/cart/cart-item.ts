import { CartItem, Product } from '../interfaces';

/**
 * Implements a cart item, representing a product and its quantity in the cart.
 * Provides a method to calculate the total price for this item.
 */
export class CartItemImp implements CartItem {
  /**
   * Creates a new CartItemImp.
   * @param product - The product being added to the cart
   * @param quantity - The quantity of the product (must be greater than 0)
   * @throws Error if quantity is not greater than 0
   */
  constructor(
    public product: Product,
    public quantity: number
  ) {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
  }

  /**
   * Calculates the total price for this cart item.
   * @returns The line total (product price * quantity)
   */
  getLineTotal(): number {
    return this.product.price * this.quantity;
  }
}
