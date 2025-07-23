import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Failed to start server:", err);
    });
}

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
