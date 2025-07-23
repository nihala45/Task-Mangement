import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/connectDB.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";
import { createServerlessHandler } from "vercel-express"; 

const app = express();

connectDB();

app.use(cors({
    origin: 'https://task-mangement-ashy.vercel.app',
    credentials: true
}));

app.use(express.json());

app.use('/user', userRoutes);
app.use('/task', taskRoutes);

export default createServerlessHandler(app);
