import { useState } from 'react';
import Summary from './components/Summary';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const refreshData = () => setRefreshKey(prev => prev + 1);

  return (
    <div className="container py-4">
      <div className="mb-4 text-center">
        <h1 className="display-5">Order Dashboard</h1>
      </div>

      <div className="row mb-4">
        <div className="col">
          <Summary refreshTrigger={refreshKey} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <OrderForm onSuccess={refreshData} />
          <OrderList refreshTrigger={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default App;
