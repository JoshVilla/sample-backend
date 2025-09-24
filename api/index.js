import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const AdminSchema = new mongoose.Schema({ name: String });
const Admin = mongoose.models.User || mongoose.model("User", AdminSchema);
// Test route
app.get("/api/health", (req, res) => {
  res.json({ message: "✅ Backend is running on Vercel!" });
});

// ✅ export app instead of app.listen()

app.post("/api/admin", async (req, res) => {
  const admin = new Admin({ data: req.body.name });
  await admin.save();
  res.json(admin);
});
export default app;
