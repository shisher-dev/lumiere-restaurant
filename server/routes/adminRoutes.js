import express from "express";

import {
  registerAdmin,
  loginAdmin,
} from "../controllers/adminController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// =========================
// ADMIN AUTH
// =========================

// Register new admin
router.post("/register", registerAdmin);

// Admin login
router.post("/login", loginAdmin);

// =========================
// PROTECTED TEST ROUTE
// =========================

router.get(
  "/test-protected",
  protectAdmin,
  (req, res) => {
    res.json({
      success: true,
      message:
        "Protected route accessed successfully 🔐",
      admin: req.admin,
    });
  }
);

export default router;