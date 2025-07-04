import { ShippingItem } from '../interfaces/shipping-item.js';

export class ShippingService {
  private static readonly SHIPPING_RATE_PER_KG = 15;

  static calculateShippingFee(items: ShippingItem[]): number {
    if (items.length === 0) return 0;

    const totalWeight = items.reduce(
      (weight, item) => weight + item.getWeight(),
      0
    );
    return totalWeight * this.SHIPPING_RATE_PER_KG;
  }

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
