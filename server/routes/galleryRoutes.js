import express from "express";

import {
  createGallery,
  getGallery,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getGallery);

// Protected admin routes
router.post("/", protectAdmin, createGallery);
router.put("/:id", protectAdmin, updateGallery);
router.delete("/:id", protectAdmin, deleteGallery);

export default router;