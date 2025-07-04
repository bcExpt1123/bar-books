import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routers from './routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());

// request logging middleware
app.use(morgan('dev'));

// built-in JSON parser middleware
app.use(express.json());

// Routes
app.use('/api', routers);

export default app;
