import { Perishable, Product } from '../interfaces';

/**
 * Type guard to check if a product is perishable.
 * Returns true if the product has an expirationDate and isExpired method.
 *
 * @param product - The product to check
 * @returns true if the product is perishable, false otherwise
 */
export function isPerishable(
  product: Product
): product is Product & Perishable {
  return 'expirationDate' in product && 'isExpired' in product;
}
