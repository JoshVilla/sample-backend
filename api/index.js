// api/index.js (for Vercel)
import express from "express";
import cors from "cors";
import { connectDB } from "../lib/db.js";

import { addAdmin } from "../controllers/addAdminController.js";
import { loginAdmin } from "../controllers/loginAdminController.js";
import Admin from "../models/Admin.js";

const app = express();
app.use(cors());
app.use(express.json());

// connect to DB once
await connectDB();

// Routes
app.get("/api/health", (req, res) => {
  res.json({ message: "✅ Vercel backend running!" });
});

app.get("/api/admins", async (req, res) => {
  const admins = await Admin.find({}, { password: 0 });
  res.json(admins);
});

app.post("/api/admin/add", addAdmin);
app.post("/api/admin/login", loginAdmin);

// Export as Vercel handler
export default app;
