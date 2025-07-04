// src/controllers/orderController.ts
import { Request, Response } from 'express';
import { db } from '../config/db';
import { Order } from '../models/order';
import { SummaryFactory } from '../factories/summaryFactory';
import {validateOrder} from "../validations/orderValidation";

import {CreateOrderBody} from "../types/order.types";

const summaryService = SummaryFactory.create();

export const getSummary = (req: Request, res: Response) => {
  db.all('SELECT * FROM orders', [], (err, rows: Order[]) => {
    if (err) return res.status(500).json({ error: err.message });
    const summary = summaryService.summarize(rows);
    res.json(summary);
  });
};

export const getOrders = (req: Request, res: Response) => {
  const { product = '', limit = '10', offset = '0' } = req.query;
  const filters: string[] = [];
  const params: any[] = [];

  if (product) {
    filters.push(`product LIKE ?`);
    params.push(`%${product}%`);
  }

  const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

  db.all<Order[]>(
      `SELECT * FROM orders ${whereClause} LIMIT ? OFFSET ?`,
      [...params, Number(limit), Number(offset)],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      }
  );
};

export const createOrder = (req: Request, res: Response) => {
  const { product, qty, price } = req.body as CreateOrderBody;

  const validated = validateOrder(req.body);
  if(!validated.isValid) {
    res.status(400).json(validated.errors);
    return;
  }

  db.run(
      `INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)`,
      [product, qty, price],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });

        db.get<Order>(`SELECT * FROM orders WHERE id = ?`, [this.lastID], (err, row) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json(row);
        });
      }
  );
};
