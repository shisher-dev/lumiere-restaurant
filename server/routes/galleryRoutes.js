import express from "express";

import {
  createGallery,
  getGallery,
  getAdminGallery,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==================================================
// PUBLIC
// ==================================================

router.get("/", getGallery);

// ==================================================
// ADMIN
// ==================================================

router.get(
  "/admin",
  protectAdmin,
  getAdminGallery
);

router.post(
  "/",
  protectAdmin,
  createGallery
);

router.put(
  "/:id",
  protectAdmin,
  updateGallery
);

router.delete(
  "/:id",
  protectAdmin,
  deleteGallery
);

export default router;