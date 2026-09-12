import express from "express";

import { uploadImage } from "../controllers/uploadController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/image",
  protectAdmin,
  upload.single("image"),
  uploadImage
);

export default router;