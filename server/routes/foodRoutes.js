import express from "express";

import {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// =========================================================
// PUBLIC
// =========================================================

router.get("/", getFoods);
router.get("/:id", getFoodById);

// =========================================================
// PROTECTED ADMIN
// =========================================================

router.post("/", protectAdmin, createFood);
router.put("/:id", protectAdmin, updateFood);
router.delete("/:id", protectAdmin, deleteFood);

export default router;