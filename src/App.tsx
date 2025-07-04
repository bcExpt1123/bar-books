import { useState } from 'react';
import Summary from './components/Summary';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshData = () => setRefreshKey(prev => prev + 1);

  return (
    <div className="app">
      <h1>Order Dashboard</h1>
      <Summary />
      <OrderForm onSuccess={refreshData} />
      <OrderList refreshTrigger={refreshKey} />
    </div>
  );
}

export default App;
