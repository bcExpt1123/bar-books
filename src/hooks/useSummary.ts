import { useEffect, useState } from 'react';
import { fetchSummary } from '../api/orders';

export function useSummary(refreshTrigger?: number) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchSummary()
      .then(res => setData(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [refreshTrigger]);

  return { data, loading, error };
}
