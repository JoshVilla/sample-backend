import express from "express";
import adminRoutes from "./adminRoutes.js";
import addAdminRoutes from "./addAdminRoutes.js";
const router = express.Router();

// Mount individual route modules
router.use("/admins", adminRoutes);
router.use("/admin/add", addAdminRoutes);

export default router;
