import { useSummary } from '../hooks/useSummary';

export default function Summary({ refreshTrigger }: { refreshTrigger?: number }) {
  const { data, loading, error } = useSummary(refreshTrigger);

  return (
    <div className="mb-4">
      <h4 className="mb-3">Summary</h4>

      {loading && (
        <div className="alert alert-info" role="alert">
          Loading summary...
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}

      {!loading && !error && data && (
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card border-primary shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Total Revenue</h6>
                <p className="card-text fw-bold">${data.totalRevenue}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-success shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Median Order Price</h6>
                <p className="card-text fw-bold">${data.medianOrderPrice}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-warning shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Top Product by Quantity</h6>
                <p className="card-text fw-bold">{data.topProductByQty}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
