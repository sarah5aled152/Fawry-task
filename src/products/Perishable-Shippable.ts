import { Perishable, Product, Shippable } from '../interfaces';

/**
 * Represents a perishable product that can be shipped.
 * Implements validation for all fields and provides methods
 * for expiration and shipping logic.
 */
export class PerishableShippableProduct
  implements Product, Perishable, Shippable
{
  /**
   * Creates a new PerishableShippableProduct.
   * @param name - The product name
   * @param price - The product price (must be non-negative)
   * @param quantity - The available quantity (must be a non-negative integer)
   * @param expirationDate - The expiration date (must be in the future)
   * @param weight - The product weight (must be non-negative)
   */
  constructor(
    public name: string,
    public price: number,
    public quantity: number,
    public expirationDate: Date,
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
    this.validateDate();
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
   * Validates the expiration date.
   * Throws an error if the date is not in the future.
   */
  private validateDate(): void {
    if (this.expirationDate <= new Date()) {
      throw new Error('Date must be in the future');
    }
  }

  /**
   * Checks if the product is expired.
   * @returns true if expired, false otherwise
   */
  isExpired(): boolean {
    return new Date() > this.expirationDate;
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
