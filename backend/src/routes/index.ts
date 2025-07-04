import express from "express";

const router = express.Router();

import orderRouter from './orders';

router.use('/orders', orderRouter);

export default router;