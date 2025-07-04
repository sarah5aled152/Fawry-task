/**
 * Represents a customer with a name and account balance.
 * Provides methods to check affordability, deduct balance, and retrieve balance.
 */
export class Customer {
  /**
   * Creates a new Customer.
   * @param name - The customer's name
   * @param balance - The customer's starting balance
   */
  constructor(
    public name: string,
    public balance: number
  ) {}

  /**
   * Checks if the customer can afford a given amount.
   * @param amount - The amount to check
   * @returns true if the balance is sufficient, false otherwise
   */
  canAfford(amount: number): boolean {
    return this.balance >= amount;
  }

  /**
   * Deducts a specified amount from the customer's balance.
   * Throws an error if the balance is insufficient.
   * @param amount - The amount to deduct
   */
  deduct(amount: number): void {
    if (!this.canAfford(amount)) {
      throw new Error('Insufficient balance');
    }
    this.balance -= amount;
  }

  /**
   * Gets the current balance of the customer.
   * @returns The customer's balance
   */
  getBalance(): number {
    return this.balance;
  }
}
