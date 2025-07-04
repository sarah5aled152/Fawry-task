import { Product } from '../interfaces';
import { Shippable } from '../interfaces';

/**
 * Type guard to check if a product is shippable.
 * Returns true if the product has weight, getName, and getWeight properties.
 *
 * @param product - The product to check
 * @returns true if the product is shippable, false otherwise
 */
export function isShippable(product: Product): product is Product & Shippable {
  return 'weight' in product && 'getName' in product && 'getWeight' in product;
}
