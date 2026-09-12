import { prisma } from "../lib/prisma.js";
import cloudinary from "../config/cloudinary.js";

// =========================================================
// HELPERS
// =========================================================

const parseBoolean = (value, defaultValue) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }

  return defaultValue;
};

const parsePositiveInt = (value) => {
  const number = Number(value);

  if (!Number.isInteger(number) || number <= 0) {
    return null;
  }

  return number;
};

const parsePrice = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return null;
  }

  return number;
};

const parseRating = (value) => {
  if (value === undefined || value === null || value === "") {
    return 0;
  }

  const number = Number(value);

  if (!Number.isFinite(number) || number < 0 || number > 5) {
    return null;
  }

  return number;
};

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

    // Required fields
    if (
      !name?.trim() ||
      !description?.trim() ||
      price === undefined ||
      !image?.trim() ||
      categoryId === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, description, price, image and categoryId are required",
      });
    }

    // Validate category ID
    const categoryIdNumber = parsePositiveInt(categoryId);

    if (!categoryIdNumber) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    // Validate price
    const parsedPrice = parsePrice(price);

    if (parsedPrice === null) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid non-negative number",
      });
    }

    // Validate rating
    const parsedRating = parseRating(rating);

    if (parsedRating === null) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 0 and 5",
      });
    }

    // Check category
    const category = await prisma.category.findUnique({
      where: {
        id: categoryIdNumber,
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
        price: parsedPrice,
        image: image.trim(),
        publicId: publicId?.trim() || null,
        rating: parsedRating,
        isFeatured: parseBoolean(isFeatured, false),
        isAvailable: parseBoolean(isAvailable, true),
        categoryId: categoryIdNumber,
      },

      include: {
        category: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Food created successfully",
      data: food,
    });
  } catch (error) {
    console.error("Create food error:", error);

    return res.status(500).json({
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

    return res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.error("Get foods error:", error);

    return res.status(500).json({
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
    const id = parsePositiveInt(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID",
      });
    }

    const food = await prisma.food.findUnique({
      where: {
        id,
      },

      include: {
        category: true,
      },
    });

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    return res.json({
      success: true,
      data: food,
    });
  } catch (error) {
    console.error("Get food by ID error:", error);

    return res.status(500).json({
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
    const id = parsePositiveInt(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID",
      });
    }

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

    // Required fields
    if (
      !name?.trim() ||
      !description?.trim() ||
      price === undefined ||
      !image?.trim() ||
      categoryId === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, description, price, image and categoryId are required",
      });
    }

    // Validate category
    const categoryIdNumber = parsePositiveInt(categoryId);

    if (!categoryIdNumber) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    // Validate price
    const parsedPrice = parsePrice(price);

    if (parsedPrice === null) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid non-negative number",
      });
    }

    // Validate rating
    const parsedRating = parseRating(rating);

    if (parsedRating === null) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 0 and 5",
      });
    }

    // Find existing food
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

    // Check category
    const category = await prisma.category.findUnique({
      where: {
        id: categoryIdNumber,
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Image information
    const oldPublicId = existingFood.publicId;
    const newPublicId = publicId?.trim() || null;

    // Update food
    const food = await prisma.food.update({
      where: {
        id,
      },

      data: {
        name: name.trim(),
        description: description.trim(),
        price: parsedPrice,
        image: image.trim(),
        publicId: newPublicId,
        rating: parsedRating,
        isFeatured: parseBoolean(isFeatured, false),
        isAvailable: parseBoolean(isAvailable, true),
        categoryId: categoryIdNumber,
      },

      include: {
        category: true,
      },
    });

    // Delete old Cloudinary image
    if (
      oldPublicId &&
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

    return res.json({
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

    return res.status(500).json({
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
    const id = parsePositiveInt(req.params.id);

    if (!id) {
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
    });

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    // Delete Cloudinary image
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
      }
    }

    // Delete database record
    await prisma.food.delete({
      where: {
        id,
      },
    });

    return res.json({
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

    return res.status(500).json({
      success: false,
      message: "Failed to delete food",
    });
  }
};