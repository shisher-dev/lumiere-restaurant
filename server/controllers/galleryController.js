import { prisma } from "../lib/prisma.js";
import cloudinary from "../config/cloudinary.js";

// ==================================================
// CREATE GALLERY IMAGE
// ==================================================

export const createGallery = async (req, res) => {
  try {
    const {
      image,
      publicId,
      title,
      category,
      isVisible,
    } = req.body;

    if (!image || !image.trim()) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    const gallery = await prisma.gallery.create({
      data: {
        image: image.trim(),
        publicId: publicId?.trim() || null,
        title: title?.trim() || null,
        category: category?.trim() || null,
        isVisible: isVisible ?? true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Gallery image created successfully",
      data: gallery,
    });
  } catch (error) {
    console.error("Create gallery error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create gallery image",
    });
  }
};

// ==================================================
// GET PUBLIC GALLERY
// ==================================================

export const getGallery = async (req, res) => {
  try {
    const gallery = await prisma.gallery.findMany({
      where: {
        isVisible: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    console.error("Get gallery error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery images",
    });
  }
};

// ==================================================
// GET ALL GALLERY FOR ADMIN
// ==================================================

export const getAdminGallery = async (req, res) => {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    console.error("Get admin gallery error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery images",
    });
  }
};

// ==================================================
// UPDATE GALLERY IMAGE
// ==================================================

export const updateGallery = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery image ID",
      });
    }

    const {
      image,
      publicId,
      title,
      category,
      isVisible,
    } = req.body;

    if (!image || !image.trim()) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    // Find existing image
    const existingGallery = await prisma.gallery.findUnique({
      where: {
        id,
      },
    });

    if (!existingGallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    const oldPublicId = existingGallery.publicId;
    const newPublicId = publicId?.trim() || null;

    // Update database
    const gallery = await prisma.gallery.update({
      where: {
        id,
      },
      data: {
        image: image.trim(),
        publicId: newPublicId,
        title: title?.trim() || null,
        category: category?.trim() || null,
        isVisible: isVisible ?? true,
      },
    });

    // If a different Cloudinary image was uploaded,
    // delete the old one.
    if (
      oldPublicId &&
      newPublicId &&
      oldPublicId !== newPublicId
    ) {
      try {
        await cloudinary.uploader.destroy(
          oldPublicId,
          {
            resource_type: "image",
          }
        );

        console.log(
          `Old Cloudinary image deleted: ${oldPublicId}`
        );
      } catch (cloudinaryError) {
        console.error(
          "Old Cloudinary image delete error:",
          cloudinaryError
        );

        // Do not fail the update because of
        // Cloudinary cleanup failure.
      }
    }

    res.json({
      success: true,
      message: "Gallery image updated successfully",
      data: gallery,
    });
  } catch (error) {
    console.error("Update gallery error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update gallery image",
    });
  }
};

// ==================================================
// DELETE GALLERY IMAGE
// ==================================================

export const deleteGallery = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery image ID",
      });
    }

    // Find gallery image
    const gallery = await prisma.gallery.findUnique({
      where: {
        id,
      },
    });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    // Delete Cloudinary image
    if (gallery.publicId) {
      try {
        await cloudinary.uploader.destroy(
          gallery.publicId,
          {
            resource_type: "image",
          }
        );

        console.log(
          `Cloudinary image deleted: ${gallery.publicId}`
        );
      } catch (cloudinaryError) {
        console.error(
          "Cloudinary delete error:",
          cloudinaryError
        );

        // Continue database deletion.
      }
    }

    // Delete database record
    await prisma.gallery.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    console.error("Delete gallery error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete gallery image",
    });
  }
};