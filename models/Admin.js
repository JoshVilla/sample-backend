import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    status: Boolean,
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model("admin", AdminSchema);
