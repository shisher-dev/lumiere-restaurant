import { prisma } from "../lib/prisma.js";
import cloudinary from "../config/cloudinary.js";

// =========================
// CREATE GALLERY IMAGE
// =========================
export const createGallery = async (req, res) => {
  try {
    const {
      image,
      publicId,
      title,
      category,
      isVisible,
    } = req.body;

    if (!image) {
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
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create gallery image",
    });
  }
};


// =========================
// GET GALLERY IMAGES
// =========================
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
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery images",
    });
  }
};


// =========================
// UPDATE GALLERY IMAGE
// =========================
export const updateGallery = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      image,
      publicId,
      title,
      category,
      isVisible,
    } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    const gallery = await prisma.gallery.update({
      where: {
        id,
      },
      data: {
        image: image.trim(),
        publicId: publicId?.trim() || null,
        title: title?.trim() || null,
        category: category?.trim() || null,
        isVisible: isVisible ?? true,
      },
    });

    res.json({
      success: true,
      message: "Gallery image updated successfully",
      data: gallery,
    });
  } catch (error) {
    console.error(error);

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


// =========================
// DELETE GALLERY IMAGE
// =========================
export const deleteGallery = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Find gallery image first
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

    // Delete from Cloudinary if publicId exists
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

        // Don't stop database deletion
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
    console.error(error);

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