import { Product } from './index.js';

export interface CartItem {
  product: Product;
  quantity: number;
  getLineTotal(): number;
}
