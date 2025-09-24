import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB (only once)
if (!global._mongooseConnected) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  global._mongooseConnected = true;
}

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

// ✅ Export the Express app as a Vercel handler
export default app;
