import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from '../config/db.js'; 
import userRoutes from "../routes/userRoutes.js";
import taskRoutes from "../routes/taskRoutes.js"
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://task-mangement-okny.vercel.app", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use("/user", userRoutes);
app.use("/task", taskRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default async function handler(req, res) {
  try {
    await connectDB(); 
    return app(req, res);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
