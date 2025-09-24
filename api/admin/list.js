import { connectDB } from "../../lib/db.js";
import Admin from "../../models/Admin.js";

export default async function handler(req, res) {
  await connectDB();

  try {
    if (req.method === "GET") {
      // List all admins
      const admins = await Admin.find({}, { password: 0 }); // exclude passwords
      return res.status(200).json(admins);
    }

    // Add more methods if needed (POST, PUT, DELETE)
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
