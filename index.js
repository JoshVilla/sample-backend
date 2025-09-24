// server.js (local only)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

// controllers
import { addAdmin } from "./controllers/addAdminController.js";
import { loginAdmin } from "./controllers/loginAdminController.js";
import Admin from "./models/Admin.js";

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/health", (req, res) => {
  res.json({ message: "✅ Backend is running locally!" });
});

app.get("/api/admins", async (req, res) => {
  const admins = await Admin.find({}, { password: 0 });
  res.json(admins);
});

app.post("/api/admin/add", addAdmin);
app.post("/api/admin/login", loginAdmin);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
