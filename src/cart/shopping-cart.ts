import { CartItem, Product, Shippable } from '../interfaces';
import { ShippingItem } from '../interfaces/shipping-item.js';
import { isPerishable } from '../utils/isPerishable.js';
import { CartItemImp } from './cart-item.js';
import { isShippable } from '../utils/isShippable.js';

export class ShoppingCart {
  private items: CartItem[] = [];

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

  getItems(): CartItem[] {
    return [...this.items];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getSubtotal(): number {
    return this.items.reduce((total, item) => total + item.getLineTotal(), 0);
  }

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
  clear(): void {
    this.items = [];
  }

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

  validateCart(): void {
    if (this.isEmpty()) {
      throw new Error('Cart is empty');
    }

    for (const item of this.items) {
      this.validateProductAvailability(item.product, item.quantity);
    }
  }
}
