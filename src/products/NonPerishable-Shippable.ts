import { Product, Shippable } from '../interfaces';

/**
 * Represents a non-perishable product that can be shipped.
 * Implements validation for all fields and implements shipping logic.
 */
export class NonPerishableShippableProduct implements Product, Shippable {
  /**
   * Creates a new NonPerishableShippableProduct.
   * @param name - The product name
   * @param price - The product price (must be non-negative)
   * @param quantity - The available quantity (must be a non-negative integer)
   * @param weight - The product weight (must be non-negative)
   */
  constructor(
    public name: string,
    public price: number,
    public quantity: number,
    public weight: number
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
    this.validateWeight();
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

  /**
   * Validates the product weight.
   * Throws an error if the weight is negative.
   */
  private validateWeight(): void {
    if (this.weight < 0) {
      throw new Error('weight must be a non-negative number');
    }
  }

  /**
   * Gets the product name.
   * @returns The product name
   */
  getName(): string {
    return this.name;
  }

  /**
   * Gets the product weight.
   * @returns The product weight
   */
  getWeight(): number {
    return this.weight;
  }
}
