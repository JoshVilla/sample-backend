import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    //look for existing username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({
        error: "Username didnt exist",
      });
    }

    //match password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res
      .status(201)
      .json({
        message: "Login Successful",
        credentials: { password: _, ...admin },
      });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};
