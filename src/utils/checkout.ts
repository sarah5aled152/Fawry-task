import { ShoppingCart } from '../cart/shopping-cart.js';
import { Customer } from '../customers/customer.js';
import { CheckoutResult } from '../interfaces';
import { CheckoutService } from '../services/checkout.js';

export function checkout(
  customer: Customer,
  cart: ShoppingCart
): CheckoutResult {
  return CheckoutService.processCheckout(customer, cart);
}
