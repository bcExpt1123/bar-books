export type CreateOrderBody = {
  product: string;
  qty: number;
  price: number;
};

export type OrderValidationErrors = {
  product?: string;
  qty?: string;
  price?: string;
};