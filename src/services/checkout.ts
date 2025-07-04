import { ShoppingCart } from '../cart/shopping-cart.js';
import { Customer } from '../customers/customer.js';
import { CheckoutResult } from '../interfaces/index.js';
import { ShippingService } from './shipping.js';

export class CheckoutService {
  /**
   * Processes the checkout for a given customer and shopping cart.
   * - Validates the cart.
   * - Calculates subtotal and shipping fees.
   * - Checks if the customer can afford the total amount.
   * - Deducts the total from the customer's balance if possible.
   * - Updates product quantities.
   * - Prints a receipt.
   * - Returns a CheckoutResult object indicating success or failure.
   *
   * @param customer - The customer performing the checkout
   * @param cart - The shopping cart to checkout
   * @returns CheckoutResult with transaction details and status
   */
  static processCheckout(
    customer: Customer,
    cart: ShoppingCart
  ): CheckoutResult {
    try {
      cart.validateCart();

      const subtotal = cart.getSubtotal();
      const shippableItems = cart.getShippableItems();

      let shippingFees = 0;
      if (shippableItems.length > 0) {
        shippingFees = ShippingService.ship(shippableItems);
      }

      const totalAmount = subtotal + shippingFees;

      if (!customer.canAfford(totalAmount)) {
        return {
          success: false,
          subtotal: subtotal,
          shippingFees: shippingFees,
          paidAmount: 0,
          customerBalance: customer.getBalance(),
          error: 'Insufficient balance',
        };
      }

      customer.deduct(totalAmount);

      for (const item of cart.getItems()) {
        item.product.quantity -= item.quantity;
      }

      this.printReceipt(
        cart,
        subtotal,
        shippingFees,
        totalAmount,
        customer.getBalance()
      );

      return {
        success: true,
        subtotal: subtotal,
        shippingFees: shippingFees,
        paidAmount: totalAmount,
        customerBalance: customer.getBalance(),
      };
    } catch (error) {
      return {
        success: false,
        subtotal: 0,
        shippingFees: 0,
        paidAmount: 0,
        customerBalance: customer.getBalance(),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Logs a formatted receipt to the console.
   * - Lists each item, subtotal, shipping, total amount, and remaining balance.
   *
   * @param cart - The shopping cart being checked out
   * @param subtotal - The subtotal of the cart
   * @param shippingFees - The calculated shipping fees
   * @param totalAmount - The total amount paid
   * @param customerBalance - The customer's balance after payment
   */
  private static printReceipt(
    cart: ShoppingCart,
    subtotal: number,
    shippingFees: number,
    totalAmount: number,
    customerBalance: number
  ): void {
    console.log('** Checkout receipt **');

    for (const item of cart.getItems()) {
      console.log(
        `${item.quantity}x ${item.product.name} ${item.getLineTotal()}`
      );
    }

    console.log('----------------------');
    console.log(`Subtotal ${subtotal}`);
    console.log(`Shipping ${shippingFees}`);
    console.log(`Amount ${totalAmount}`);
    console.log(`Customer balance after payment: ${customerBalance}`);
  }
}
