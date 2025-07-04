export class Customer {
  constructor(
    public name: string,
    public balance: number
  ) {}

  canAfford(amount: number): boolean {
    return this.balance >= amount;
  }

  deduct(amount: number): void {
    if (!this.canAfford(amount)) {
      throw new Error('Insufficient balance');
    }
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }
}
