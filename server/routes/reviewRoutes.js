import express from "express";

import {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getReviews);

// Protected admin routes
router.post("/", protectAdmin, createReview);
router.put("/:id", protectAdmin, updateReview);
router.delete("/:id", protectAdmin, deleteReview);

export default router;