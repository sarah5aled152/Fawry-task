import { ShoppingCart } from './cart/shopping-cart.js';
import { Customer } from './customers/customer.js';
import { NonPerishableNonShippableProduct } from './products/NonPerishableNonShippableProduct.js';
import { NonPerishableShippableProduct } from './products/NonPerishableShippableProduct.js';
import { PerishableShippableProduct } from './products/PerishableShippableProduct.js';
import { checkout } from './utils/checkout.js';
import { isPerishable } from './utils/isPerishable.js';
import { isShippable } from './utils/isShippable.js';

function runCompleteDemo(): void {
  console.log(' ===== E-COMMERCE SYSTEM  ===== \n');

  // ===== STEP 1: CREATE PRODUCTS =====
  console.log('==== Creating Products...');

  const cheese = new PerishableShippableProduct(
    'Cheese',
    100,
    10,
    new Date('2025-12-31'),
    0.2
  );
  const biscuits = new PerishableShippableProduct(
    'Biscuits',
    75,
    8,
    new Date('2025-11-30'),
    0.35
  );
  const tv = new NonPerishableShippableProduct('TV', 500, 5, 15);
  const mobile = new NonPerishableShippableProduct('Mobile', 800, 3, 0.5);
  const scratchCard = new NonPerishableNonShippableProduct(
    'Mobile Scratch Card',
    50,
    20
  );

  console.log('\n ==== Product Categories:');
  const products = [cheese, biscuits, tv, mobile, scratchCard];
  products.forEach((product) => {
    console.log(
      `${product.name}: Perishable=${isPerishable(
        product
      )}, Shippable=${isShippable(product)}`
    );
  });

  // ===== STEP 2: CREATE CUSTOMERS =====
  console.log('\n Creating Customers...');
  const customer1 = new Customer('John Doe', 2000);
  const customer2 = new Customer('Jane Smith', 100);
  const customer3 = new Customer('Bob Johnson', 600);

  console.log(`${customer1.name}: $${customer1.getBalance()}`);
  console.log(`${customer2.name}: $${customer2.getBalance()}`);
  console.log(`${customer3.name}: $${customer3.getBalance()}`);

  // ===== TEST CASE 1: SUCCESSFUL CHECKOUT =====
  console.log('\n ===== TEST CASE 1: SUCCESSFUL CHECKOUT =====');
  const cart1 = new ShoppingCart();

  try {
    cart1.add(cheese, 2);
    cart1.add(biscuits, 1);
    cart1.add(tv, 1);
    cart1.add(scratchCard, 1);

    console.log('Cart Contents:');
    cart1.getItems().forEach((item) => {
      console.log(
        `  ${item.quantity}x ${item.product.name} - $${item.getLineTotal()}`
      );
    });

    const result1 = checkout(customer1, cart1);
    console.log(
      `\n Checkout Result: ${result1.success ? 'SUCCESS' : 'FAILED'}`
    );
    console.log(` Customer balance after: $${result1.customerBalance}`);
  } catch (error) {
    console.log(
      ` Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }

  // ===== TEST CASE 2: EMPTY CART =====
  console.log('\n ===== TEST CASE 2: EMPTY CART =====');
  const emptyCart = new ShoppingCart();

  const result2 = checkout(customer1, emptyCart);
  console.log(`Checkout Result: ${result2.success ? 'SUCCESS' : 'FAILED'}`);
  if (!result2.success) {
    console.log(` Error: ${result2.error}`);
  }

  // ===== TEST CASE 3: INSUFFICIENT BALANCE =====
  console.log('\n ===== TEST CASE 3: INSUFFICIENT BALANCE =====');
  const expensiveCart = new ShoppingCart();
  expensiveCart.add(tv, 1);
  expensiveCart.add(mobile, 1);

  console.log(' Cart Contents:');
  expensiveCart.getItems().forEach((item) => {
    console.log(
      `  ${item.quantity}x ${item.product.name} - $${item.getLineTotal()}`
    );
  });
  console.log(` Cart total: $${expensiveCart.getSubtotal()}`);
  console.log(` Customer balance: $${customer2.getBalance()}`);

  const result3 = checkout(customer2, expensiveCart);
  console.log(` Checkout Result: ${result3.success ? 'SUCCESS' : 'FAILED'}`);
  if (!result3.success) {
    console.log(` Error: ${result3.error}`);
  }

  // ===== TEST CASE 4: INSUFFICIENT STOCK =====
  console.log('\n ===== TEST CASE 5: INSUFFICIENT STOCK =====');
  const stockCart = new ShoppingCart();

  try {
    console.log(` Available TV stock: ${tv.quantity}`);
    stockCart.add(tv, 10);
    console.log("This shouldn't print - insufficient stock should be rejected");
  } catch (error) {
    console.log(
      `Error adding excess quantity: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }

  // ===== TEST CASE 5: EDGE =====

  console.log('\n ===== TEST CASE 6: EDGE CASES =====');

  const edgeCart = new ShoppingCart();
  console.log(' Testing multiple additions of same product:');
  edgeCart.add(cheese, 1);
  console.log(`Added 1 cheese, cart size: ${edgeCart.getItems().length}`);
  edgeCart.add(cheese, 2);
  console.log(`Added 2 more cheese, cart size: ${edgeCart.getItems().length}`);

  const cheeseItem = edgeCart
    .getItems()
    .find((item) => item.product === cheese);
  console.log(`Total cheese quantity in cart: ${cheeseItem?.quantity}`);
}
function main(): void {
  try {
    runCompleteDemo();
  } catch (error) {
    console.log(
      ' Demo failed:',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

main();
