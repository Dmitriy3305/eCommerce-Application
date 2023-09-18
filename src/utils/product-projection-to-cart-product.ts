import { LineItem, ProductProjection } from '@commercetools/platform-sdk';
import { CartProduct } from '../types/cart-product';

export default function convertProjectionToCartProduct(cartItems: LineItem[], product: ProductProjection): CartProduct {
  const lineItem = cartItems.find((item) => item.productId === product.id);
  if (!lineItem) throw Error();
  return {
    product,
    price: lineItem.price.value.centAmount / 100,
    quantity: lineItem.quantity,
  };
}
