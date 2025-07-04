import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({ baseURL: `${apiUrl}/api` });

export const fetchSummary = () => API.get('/orders/summary');
export const fetchOrders = (params?: { product?: string; offset?: number, limit?: number }) =>
  API.get('/orders', { params });
export const createOrder = (data: { product: string; qty: number; price: number }) =>
  API.post('/orders', data);
