import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import addAdminRoutes from "./routes/addAdminRoutes.js";
import loginAdminRoutes from "./routes/loginAdminRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/admins", adminRoutes);
app.use("/api/admin/add", addAdminRoutes);
app.use("/api/admin/login", loginAdminRoutes);

app.get("/api/health", (req, res) => {
  res.json({ message: "✅ Backendssss is running!" });
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
