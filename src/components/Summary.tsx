import { useSummary } from '../hooks/useSummary';

export default function Summary() {
  const { data, loading, error } = useSummary();

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="summary">
      <h2>Summary</h2>
      <p>Total Revenue: ${data.totalRevenue}</p>
      <p>Median Order Price: ${data.medianOrderPrice}</p>
      <p>Top Product: {data.topProductByQty}</p>
    </div>
  );
}
