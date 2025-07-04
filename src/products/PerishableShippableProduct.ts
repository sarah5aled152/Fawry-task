import { Perishable, Product, Shippable } from '../interfaces';

export class PerishableShippableProduct
  implements Product, Perishable, Shippable
{
  constructor(
    public name: string,
    public price: number,
    public quantity: number,
    public expirationDate: Date,
    public weight: number
  ) {
    this.validate();
  }

  private validate(): void {
    this.validateName();
    this.validatePrice();
    this.validateQuantity();
    this.validateWeight();
    this.validateDate();
  }

  private validateName(): void {
    if (!this.name || this.name.trim() === '') {
      throw new Error('Product name cannot be empty');
    }
  }

  private validatePrice(): void {
    if (this.price < 0) {
      throw new Error('Price cannot be negative');
    }
  }

  private validateQuantity(): void {
    if (this.quantity < 0 || !Number.isInteger(this.quantity)) {
      throw new Error('Quantity must be a non-negative integer');
    }
  }
  private validateWeight(): void {
    if (this.weight < 0) {
      throw new Error('weight must be a non-negative number');
    }
  }

  private validateDate(): void {
    if (this.expirationDate <= new Date()) {
      throw new Error('Date must be in the future');
    }
  }
  isExpired(): boolean {
    return new Date() > this.expirationDate;
  }

  getName(): string {
    return this.name;
  }

  getWeight(): number {
    return this.weight;
  }
}
