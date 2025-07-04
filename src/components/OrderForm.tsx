import { useState } from 'react';
import { createOrder } from '../api/orders';

export default function OrderForm({ onSuccess }: { onSuccess: () => void }) {
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createOrder({ product, qty, price });
    onSuccess(); // Trigger refresh
    setProduct('');
    setQty(1);
    setPrice(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Order</h2>
      <input value={product} onChange={e => setProduct(e.target.value)} placeholder="Product" />
      <input type="number" value={qty} onChange={e => setQty(+e.target.value)} placeholder="Qty" />
      <input
        type="number"
        value={price}
        onChange={e => setPrice(+e.target.value)}
        placeholder="Price"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
