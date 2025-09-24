import express from "express";
import { addAdmin } from "../controllers/addAdminController.js";

const router = express.Router();

// POST route to add a new admin
router.post("/", addAdmin);

export default router;
