// src/routes/orderRoutes.ts
import express from 'express';
import { getOrders, getSummary, createOrder } from '../controllers/OrderController';

const router = express.Router();

router.get('/summary', getSummary);
router.get('/', getOrders);
router.post('/', createOrder);

export default router;
