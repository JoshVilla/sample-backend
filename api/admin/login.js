import { connectDB } from "../../lib/db.js";
import { loginAdmin } from "../../controllers/loginAdminController.js";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    return loginAdmin(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
