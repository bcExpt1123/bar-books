import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const fetchSummary = () => API.get('/orders/summary');
export const fetchOrders = (params?: { product?: string; offset?: number, limit?: number }) =>
  API.get('/orders', { params });
export const createOrder = (data: { product: string; qty: number; price: number }) =>
  API.post('/orders', data);
