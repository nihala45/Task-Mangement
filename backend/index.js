import express from "express";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./config/connectDB.js";
import cors from "cors";

const app = express();


connectDB();

app.use(cors({
  origin: 'https://task-mangement-ashy.vercel.app',
  credentials: true
}));

app.use(express.json());


app.use('/user', userRoutes);
app.use('/task', taskRoutes);


export default app;
