import { prisma } from "../lib/prisma.js";
import cloudinary from "../config/cloudinary.js";

// =========================================================
// CREATE FOOD
// =========================================================

export const createFood = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      publicId,
      rating,
      isFeatured,
      isAvailable,
      categoryId,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      price === undefined ||
      !image ||
      !categoryId
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, description, price, image and categoryId are required",
      });
    }

    // Check category
    const category = await prisma.category.findUnique({
      where: {
        id: Number(categoryId),
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Create food
    const food = await prisma.food.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        image: image.trim(),
        publicId: publicId?.trim() || null,

        rating:
          rating !== undefined
            ? Number(rating)
            : 0,

        isFeatured:
          isFeatured ?? false,

        isAvailable:
          isAvailable ?? true,

        categoryId: Number(categoryId),
      },

      include: {
        category: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Food created successfully",
      data: food,
    });
  } catch (error) {
    console.error("Create food error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create food",
    });
  }
};

// =========================================================
// GET ALL FOODS
// =========================================================

export const getFoods = async (req, res) => {
  try {
    const foods = await prisma.food.findMany({
      include: {
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.error("Get foods error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch foods",
    });
  }
};

// =========================================================
// GET SINGLE FOOD
// =========================================================

export const getFoodById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validate ID
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID",
      });
    }

    // Find food
    const food = await prisma.food.findUnique({
      where: {
        id,
      },

      include: {
        category: true,
      },
    });

    // Food not found
    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.json({
      success: true,
      data: food,
    });
  } catch (error) {
    console.error("Get food by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch food",
    });
  }
};

// =========================================================
// UPDATE FOOD
// =========================================================

export const updateFood = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      description,
      price,
      image,
      publicId,
      rating,
      isFeatured,
      isAvailable,
      categoryId,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      price === undefined ||
      !image ||
      !categoryId
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, description, price, image and categoryId are required",
      });
    }

    // =====================================================
    // FIND EXISTING FOOD
    // =====================================================

    const existingFood = await prisma.food.findUnique({
      where: {
        id,
      },
    });

    if (!existingFood) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    // =====================================================
    // CHECK CATEGORY
    // =====================================================

    const category = await prisma.category.findUnique({
      where: {
        id: Number(categoryId),
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // =====================================================
    // PREPARE IMAGE DATA
    // =====================================================

    const oldPublicId = existingFood.publicId;
    const newPublicId = publicId?.trim() || null;

    // =====================================================
    // UPDATE FOOD
    // =====================================================

    const food = await prisma.food.update({
      where: {
        id,
      },

      data: {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        image: image.trim(),
        publicId: newPublicId,

        rating:
          rating !== undefined
            ? Number(rating)
            : 0,

        isFeatured:
          isFeatured ?? false,

        isAvailable:
          isAvailable ?? true,

        categoryId: Number(categoryId),
      },

      include: {
        category: true,
      },
    });

    // =====================================================
    // DELETE OLD CLOUDINARY IMAGE
    // =====================================================

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
          "Old Cloudinary image deleted:",
          oldPublicId
        );
      } catch (cloudinaryError) {
        console.error(
          "Failed to delete old Cloudinary image:",
          cloudinaryError
        );
      }
    }

    // =====================================================
    // RESPONSE
    // =====================================================

    res.json({
      success: true,
      message: "Food updated successfully",
      data: food,
    });
  } catch (error) {
    console.error("Update food error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update food",
    });
  }
};

// =========================================================
// DELETE FOOD
// =========================================================

export const deleteFood = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // =====================================================
    // FIND FOOD FIRST
    // =====================================================

    const food = await prisma.food.findUnique({
      where: {
        id,
      },
    });

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    // =====================================================
    // DELETE CLOUDINARY IMAGE
    // =====================================================

    if (food.publicId) {
      try {
        await cloudinary.uploader.destroy(
          food.publicId,
          {
            resource_type: "image",
          }
        );

        console.log(
          "Cloudinary image deleted:",
          food.publicId
        );
      } catch (cloudinaryError) {
        console.error(
          "Cloudinary delete error:",
          cloudinaryError
        );

        // Continue deleting database record
      }
    }

    // =====================================================
    // DELETE DATABASE RECORD
    // =====================================================

    await prisma.food.delete({
      where: {
        id,
      },
    });

    // =====================================================
    // RESPONSE
    // =====================================================

    res.json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.error("Delete food error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete food",
    });
  }
};