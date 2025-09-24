import express from "express";
import { loginAdmin } from "../controllers/loginAdminController.js";

const router = express.Router();

router.post("/login", loginAdmin);

export default router;
