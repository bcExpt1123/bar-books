import {isValid} from "../utils/isValid";
import {CreateOrderBody, OrderValidationErrors} from "../types/order.types";

export function validateOrder(order: CreateOrderBody): { isValid: boolean; errors: OrderValidationErrors } {
  const errors: OrderValidationErrors = {};
  if (!order.product || typeof order.product !== 'string' || order.product.trim() === '') {
    errors.product = 'Product must be a non-empty string.';
  }

  if (
      typeof order.qty !== 'number' ||
      !Number.isInteger(order.qty) ||
      order.qty <= 0
  ) {
    errors.qty = 'Quantity must be a positive integer.';
  }

  if (typeof order.price !== 'number' || order.price <= 0) {
    errors.price = 'Price must be a positive number.';
  }

  return {
    isValid: !isValid(errors),
    errors,
  };
}