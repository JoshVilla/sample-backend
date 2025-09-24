// server.js (local dev only)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

// controllers
import { addAdmin } from "./controllers/addAdminController.js";
import { loginAdmin } from "./controllers/loginAdminController.js";
import Admin from "./models/Admin.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const app = express();
    app.use(cors());
    app.use(express.json());

    // Health check
    app.get("/api/health", (req, res) => {
      res.json({ message: "✅ Local backend running!" });
    });

    // Admin routes
    app.get("/api/admins", async (req, res) => {
      try {
        const admins = await Admin.find({}, { password: 0 });
        res.json(admins);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch admins" });
      }
    });

    app.post("/api/admin/add", addAdmin);
    app.post("/api/admin/login", loginAdmin);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Local server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
