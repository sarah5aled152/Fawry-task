import { ShoppingCart } from '../cart/shopping-cart.js';
import { Customer } from '../customers/customer.js';
import { CheckoutResult } from '../interfaces';
import { CheckoutService } from '../services/checkout.js';

/**
 * Utility function to process the checkout for a customer and shopping cart.
 * Delegates the checkout logic to CheckoutService and returns the result.
 *
 * @param customer - The customer performing the checkout
 * @param cart - The shopping cart to checkout
 * @returns CheckoutResult with transaction details and status
 */
export function checkout(
  customer: Customer,
  cart: ShoppingCart
): CheckoutResult {
  return CheckoutService.processCheckout(customer, cart);
}
