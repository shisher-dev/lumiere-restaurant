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
// PUBLIC ROUTES
// =========================================================

// Get all foods
router.get("/", getFoods);

// Get single food
router.get("/:id", getFoodById);

// =========================================================
// PROTECTED ADMIN ROUTES
// =========================================================

// Create food
router.post(
  "/",
  protectAdmin,
  createFood
);

// Update food
router.put(
  "/:id",
  protectAdmin,
  updateFood
);

// Delete food
router.delete(
  "/:id",
  protectAdmin,
  deleteFood
);

export default router;