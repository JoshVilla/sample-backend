import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    role: String,
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model("admin", AdminSchema);
