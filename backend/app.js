import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: 'https://task-mangement-ashy.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/user', userRoutes);
app.use('/task', taskRoutes);

app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

export default app;
