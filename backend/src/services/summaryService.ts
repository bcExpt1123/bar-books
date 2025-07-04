import { Order, Summary } from '../models/order';

export class SummaryService {
  summarize(orders: Order[]): Summary {
    if (orders.length === 0) {
      return {
        totalRevenue: 0,
        medianOrderPrice: 0,
        topProductByQty: '',
        uniqueProductCount: 0,
      };
    }

    let totalRevenue = 0;
    const orderValues: number[] = [];
    const productQtyMap = new Map<string, number>();
    const uniqueProducts = new Set<string>();

    for (const order of orders) {
      const revenue = order.qty * order.price;
      totalRevenue += revenue;
      orderValues.push(revenue);

      uniqueProducts.add(order.product);
      productQtyMap.set(order.product, (productQtyMap.get(order.product) || 0) + order.qty);
    }

    orderValues.sort((a, b) => a - b);
    const mid = Math.floor(orderValues.length / 2);
    const medianOrderPrice =
        orderValues.length % 2 === 1
            ? orderValues[mid]
            : (orderValues[mid - 1] + orderValues[mid]) / 2;

    let topProductByQty = '';
    let maxQty = -Infinity;
    for (const [product, qty] of productQtyMap.entries()) {
      if (qty > maxQty) {
        maxQty = qty;
        topProductByQty = product;
      }
    }

    return {
      totalRevenue,
      medianOrderPrice,
      topProductByQty,
      uniqueProductCount: uniqueProducts.size,
    };
  }
}
