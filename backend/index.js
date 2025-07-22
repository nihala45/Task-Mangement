import express from "express"
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/connectDB.js";
import taskRoutes from "./routes/taskRoutes.js"
import cors from 'cors'
const app = express();
const port = 5431;

app.use(express.json())
connectDB()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/user',userRoutes)
app.use('/task',taskRoutes)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

