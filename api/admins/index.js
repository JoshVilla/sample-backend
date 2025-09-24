import { connectDB } from "../../lib/db.js";
import Admin from "../../models/Admin.js";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const admins = await Admin.find({}, { password: 0 });
    return res.status(200).json(admins);
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
