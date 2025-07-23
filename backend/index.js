import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

const allowedOrigins = [
  'https://task-mangement-ashy.vercel.app',
  'https://task-mangement-git-main-nihala45s-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.use("/user", userRoutes);
app.use("/task", taskRoutes);

export default app;
