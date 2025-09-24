import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema + Model
const AdminSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    status: String,
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

// Routes
app.get("/api/health", (req, res) => {
  res.json({ message: "✅ Backend is running on Vercel!" });
});

// 🟢 GET all admins
app.get("/api/admins", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch admins", details: err.message });
  }
});

// ✅ For Vercel
export default app;

// ✅ For local testing
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}
