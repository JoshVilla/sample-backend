import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../utils/constant.js";

export const addAdmin = async (req, res) => {
  try {
    const { username, password, status } = req.body;

    // validate required fields
    if (!username || !password) {
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
      status: status || 0, // default status if not provided
    });

    await newAdmin.save();

    // don’t expose password in response
    const { password: _, ...adminData } = newAdmin.toObject();

    res.status(201).json({
      message: "Admin added successfully",
      admin: adminData,
    });
  } catch (error) {
    console.error("❌ Error in addAdmin:", error.message);
    res.status(500).json({ error: "Failed to add admin" });
  }
};
