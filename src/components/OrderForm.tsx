import { useState } from 'react';
import { createOrder } from '../api/orders';

export default function OrderForm({ onSuccess }: { onSuccess: () => void }) {

  const [product, setProduct] = useState('');
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await createOrder({ product, qty, price });
      onSuccess();
      setProduct('');
      setQty(1);
      setPrice(0);
    } catch(err: any) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: 'Failed to add order. Please try again.' });
      }
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-5">
          <label className="form-label">Product</label>
          <input
            type="text"
            className={`form-control ${errors.product ? 'is-invalid' : ''}`}
            value={product}
            onChange={e => setProduct(e.target.value)}
            placeholder="Enter product name"
          />
          {errors.product && <div className="invalid-feedback">{errors.product}</div>}
        </div>
        <div className="col-md-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className={`form-control ${errors.qty ? 'is-invalid' : ''}`}
            value={qty}
            onChange={e => setQty(+e.target.value)}
            min={1}
            required
          />
          {errors.qty && <div className="invalid-feedback">{errors.qty}</div>}
        </div>
        <div className="col-md-3">
          <label className="form-label">Price ($)</label>
          <input
            type="number"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            value={price}
            onChange={e => setPrice(+e.target.value)}
            step="0.01"
            min={0}
            required
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>
        <div className="col-md-1 mt-5">
          <button type="submit" className="btn btn-success w-100">
            Add
          </button>
        </div>
        {errors.general && (
          <div className="col-12">
            <div className="alert alert-danger">{errors.general}</div>
          </div>
        )}
      </form>
    </div>
  );
}
