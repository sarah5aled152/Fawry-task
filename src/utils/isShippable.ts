import { Product } from '../interfaces';
import { Shippable } from '../interfaces';

export function isShippable(product: Product): product is Product & Shippable {
  return 'weight' in product && 'getName' in product && 'getWeight' in product;
}
