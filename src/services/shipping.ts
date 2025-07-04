import { ShippingItem } from '../interfaces/shipping-item.js';

export class ShippingService {
  private static readonly SHIPPING_RATE_PER_KG = 15;

  /**
   * Calculates the total shipping fee for a list of shipping items.
   * The fee is determined by multiplying the total weight of all items
   * by a fixed shipping rate per kilogram.
   *
   * @param items - Array of items implementing ShippingItem interface
   * @returns The total shipping fee as a number
   */
  static calculateShippingFee(items: ShippingItem[]): number {
    if (items.length === 0) return 0;

    const totalWeight = items.reduce(
      (weight, item) => weight + item.getWeight(),
      0
    );
    return totalWeight * this.SHIPPING_RATE_PER_KG;
  }

  /**
   * Simulates shipping the provided items.
   * Logs each item's name and weight, the total package weight,
   * and returns the calculated shipping fee.
   *
   * @param items - Array of items implementing ShippingItem interface
   * @returns The total shipping fee as a number
   */
  static ship(items: ShippingItem[]): number {
    if (items.length === 0) return 0;

    console.log('** Shipment notice **');
    let totalWeight = 0;

    for (const item of items) {
      const weight = item.getWeight();
      console.log(`${item.getName()} ${weight}kg`);
      totalWeight += weight;
    }

    console.log(`Total package weight ${totalWeight}kg`);

    return this.calculateShippingFee(items);
  }
}
