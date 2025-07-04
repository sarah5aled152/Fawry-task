import { Perishable, Product } from '../interfaces';

export function isPerishable(
  product: Product
): product is Product & Perishable {
  return 'expirationDate' in product && 'isExpired' in product;
}
