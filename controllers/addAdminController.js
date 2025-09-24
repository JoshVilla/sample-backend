import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../utils/constant.js";

export const addAdmin = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // validate required fields
    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }
    // check if username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin username already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // create new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      role: role || "admin",
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin added successfully",
      data: newAdmin,
    });
  } catch (error) {
    console.error("❌ Error in addAdmin:", error.message);
    res.status(500).json({ error: "Failed to add admin" });
  }
};
