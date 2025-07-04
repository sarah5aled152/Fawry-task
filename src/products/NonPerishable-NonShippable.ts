import { Product } from '../interfaces';

export class NonPerishableNonShippableProduct implements Product {
  constructor(
    public name: string,
    public price: number,
    public quantity: number
  ) {
    this.validate();
  }

  private validate(): void {
    this.validateName();
    this.validatePrice();
    this.validateQuantity();
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
}
