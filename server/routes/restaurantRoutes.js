import express from "express";

import {
  getRestaurant,
  createRestaurant,
  updateRestaurant,
} from "../controllers/restaurantController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getRestaurant);

// Protected admin routes
router.post("/", protectAdmin, createRestaurant);
router.put("/:id", protectAdmin, updateRestaurant);

export default router;