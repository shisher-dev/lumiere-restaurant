import express from "express";

import {
  registerAdmin,
  loginAdmin,
} from "../controllers/adminController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.get("/test-protected", protectAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed successfully 🔐",
    admin: req.admin,
  });
});

export default router;