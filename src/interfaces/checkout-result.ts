export interface CheckoutResult {
  success: boolean;
  subtotal: number;
  shippingFees: number;
  paidAmount: number;
  customerBalance: number;
  error?: string;
}
