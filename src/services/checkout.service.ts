import { ShoppingCart } from '../cart/shopping-cart.js';
import { Customer } from '../customers/customer.js';
import { CheckoutResult } from '../interfaces';
import { ShippingService } from './shipping.service.js';

export class CheckoutService {
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
