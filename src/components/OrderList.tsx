import { useEffect, useState } from 'react';
import { fetchOrders } from '../api/orders';
import { useDebounce } from '../hooks/useDebounce';

interface Order {
  id: number;
  product: string;
  qty: number;
  price: number;
}

export default function OrderList({ refreshTrigger }: { refreshTrigger?: number }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const debouncedFilter = useDebounce(filter, 300);
  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    setLoading(true);
    fetchOrders({
      product: debouncedFilter || undefined,
      offset: (page - 1) * limit,
      limit: limit
    })
      .then(res => {
        setOrders(res.data.data);
        setTotalCount(res.data.totalCount);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [refreshTrigger, debouncedFilter, page, limit]);

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4>Orders</h4>
        <div className='row g-6'>
          <div className='col-md-8'>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={filter}
              onChange={e => {
                setPage(1);
                setFilter(e.target.value);
              }}
            />
          </div>
          <div className='col-md-4'>
            <select className="form-select" value={limit} onChange={e => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="alert alert-info">Loading orders...</div>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="alert alert-secondary text-center">No orders found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id}>
                      <td>{(page - 1) * limit + index + 1}</td>
                      <td>{order.product}</td>
                      <td>{order.qty}</td>
                      <td className="fw-bold">${order.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="d-flex justify-content-center align-items-center mt-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="mx-2">Page {page}</span>
            <button
              className="btn btn-outline-primary"
              onClick={() => setPage(p => p + 1)}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
