import { useEffect, useState } from 'react';
import { fetchOrders } from '../api/orders';

export default function OrderList({ refreshTrigger }: { refreshTrigger?: number }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchOrders({ product: filter || undefined, page })
      .then(res => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [refreshTrigger, filter, page]);

  return (
    <div>
      <h2>Orders</h2>
      <input
        placeholder="Filter by product"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.product} - Qty: {order.qty} - ${order.price}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Prev</button>
        <span> Page {page} </span>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
