import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../utils/constant.js";
export const addAdmin = async (req, res) => {
  try {
    const { username, password, status } = req.body;

    const isExistingUsername = await Admin.findOne({ username });

    if (isExistingUsername) {
      return res.status(400).json({
        error: "Admin Username already Exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      status, // Consider hashing the password before saving
    });

    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin added successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ error: "Failed to add admin" });
  }
};
