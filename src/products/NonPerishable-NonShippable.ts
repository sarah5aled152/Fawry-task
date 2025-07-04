import { Product } from '../interfaces';

/**
 * Represents a non-perishable product that cannot be shipped.
 * Implements validation for all fields.
 */
export class NonPerishableNonShippableProduct implements Product {
  /**
   * Creates a new NonPerishableNonShippableProduct.
   * @param name - The product name
   * @param price - The product price (must be non-negative)
   * @param quantity - The available quantity (must be a non-negative integer)
   */
  constructor(
    public name: string,
    public price: number,
    public quantity: number
  ) {
    this.validate();
  }

  /**
   * Validates all product fields.
   * Throws an error if any field is invalid.
   */
  private validate(): void {
    this.validateName();
    this.validatePrice();
    this.validateQuantity();
  }

  /**
   * Validates the product name.
   * Throws an error if the name is empty.
   */
  private validateName(): void {
    if (!this.name || this.name.trim() === '') {
      throw new Error('Product name cannot be empty');
    }
  }

  /**
   * Validates the product price.
   * Throws an error if the price is negative.
   */
  private validatePrice(): void {
    if (this.price < 0) {
      throw new Error('Price cannot be negative');
    }
  }

  /**
   * Validates the product quantity.
   * Throws an error if the quantity is not a non-negative integer.
   */
  private validateQuantity(): void {
    if (this.quantity < 0 || !Number.isInteger(this.quantity)) {
      throw new Error('Quantity must be a non-negative integer');
    }
  }
}
