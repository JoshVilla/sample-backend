import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/health", (req, res) => {
  res.json({ message: "✅ Backend is running on Vercel!" });
});

// ✅ export app instead of app.listen()
export default app;
