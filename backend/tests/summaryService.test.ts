import { SummaryFactory } from '../src/factories/summaryFactory';
import { Order } from '../src/models/order';

const summaryService = SummaryFactory.create();

describe('SummaryService', () => {
  it('should summarize orders correctly (typical case)', () => {
    const orders: Order[] = [
      { id: 1, product: 'Beer', qty: 2, price: 3 },
      { id: 2, product: 'Whiskey', qty: 5, price: 1 },
      { id: 3, product: 'Beer', qty: 3, price: 3 },
    ];

    const summary = summaryService.summarize(orders);
    expect(summary.totalRevenue).toBe(20);
    expect(summary.medianOrderPrice).toBe(6);
    expect(summary.topProductByQty).toBe('Beer');
    expect(summary.uniqueProductCount).toBe(2);
  });

  it('should handle empty orders list', () => {
    const summary = summaryService.summarize([]);
    expect(summary.totalRevenue).toBe(0);
    expect(summary.medianOrderPrice).toBe(0);
    expect(summary.topProductByQty).toBe('');
    expect(summary.uniqueProductCount).toBe(0);
  });

  it('should compute correct median when even number of orders', () => {
    const orders: Order[] = [
      { id: 1, product: 'A', qty: 1, price: 10 },
      { id: 2, product: 'B', qty: 1, price: 20 },
      { id: 3, product: 'C', qty: 1, price: 30 },
      { id: 4, product: 'D', qty: 1, price: 40 },
    ];

    const summary = summaryService.summarize(orders);
    expect(summary.medianOrderPrice).toBe((20 + 30) / 2);
  });
});
