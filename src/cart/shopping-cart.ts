import { CartItem, Product, Shippable } from '../interfaces';
import { ShippingItem } from '../interfaces/shipping-item.js';
import { isPerishable } from '../utils/isPerishable.js';
import { CartItemImp } from './cart-item.js';
import { isShippable } from '../utils/isShippable.js';

/**
 * Implements a shopping cart for managing products and quantities.
 * Provides methods for adding items, validating availability,
 * calculating subtotal, retrieving shippable items, and clearing the cart.
 */
export class ShoppingCart {
  private items: CartItem[] = [];

  /**
   * Adds a product to the cart with the specified quantity.
   * Validates product availability and updates quantity if already present.
   * @param product - The product to add
   * @param quantity - The quantity to add
   */
  add(product: Product, quantity: number): void {
    this.validateProductAvailability(product, quantity);

    const existingItem = this.items.find((item) => item.product === product);
    if (existingItem) {
      const totalQuantity = existingItem.quantity + quantity;
      if (totalQuantity > product.quantity) {
        throw new Error(
          `Total quantity exceeds available stock for ${product.name}`
        );
      }
      existingItem.quantity = totalQuantity;
    } else {
      this.items.push(new CartItemImp(product, quantity));
    }
  }

  /**
   * Returns a copy of all items in the cart.
   * @returns Array of CartItem
   */
  getItems(): CartItem[] {
    return [...this.items];
  }

  /**
   * Checks if the cart is empty.
   * @returns true if empty, false otherwise
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Calculates the subtotal price of all items in the cart.
   * @returns The subtotal amount
   */
  getSubtotal(): number {
    return this.items.reduce((total, item) => total + item.getLineTotal(), 0);
  }

  /**
   * Retrieves all shippable items from the cart.
   * @returns Array of ShippingItem
   */
  getShippableItems(): ShippingItem[] {
    const shippableItems: ShippingItem[] = [];

    for (const item of this.items) {
      if (isShippable(item.product)) {
        const shippableProduct = item.product as Product & Shippable;

        shippableItems.push({
          getName: () => `${item.quantity}x ${shippableProduct.getName()}`,
          getWeight: () => shippableProduct.getWeight() * item.quantity,
        });
      }
    }

    return shippableItems;
  }

  /**
   * Validates that the requested quantity of a product is available and not expired.
   * Throws an error if unavailable or expired.
   * @param product - The product to check
   * @param quantity - The requested quantity
   */
  private validateProductAvailability(
    product: Product,
    quantity: number
  ): void {
    if (quantity > product.quantity) {
      throw new Error(
        `Insufficient stock for ${product.name}. Available: ${product.quantity}, Requested: ${quantity}`
      );
    }

    if (isPerishable(product) && product.isExpired()) {
      throw new Error(`Product ${product.name} has expired`);
    }
  }

  /**
   * Validates the entire cart for emptiness and product availability.
   * Throws an error if the cart is empty or contains invalid items.
   */
  validateCart(): void {
    if (this.isEmpty()) {
      throw new Error('Cart is empty');
    }

    for (const item of this.items) {
      this.validateProductAvailability(item.product, item.quantity);
    }
  }
}
