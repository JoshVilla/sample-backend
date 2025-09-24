import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
console.log("MONGO_URI:", process.env.MONGODB_URI);
// MongoDB connection (works in both local + Vercel)
if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));
}

// Example schema
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

app.get("/api/admins", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admins" });
  }
});

// ✅ No app.listen here!
export default app;
