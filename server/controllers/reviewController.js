import { prisma } from "../lib/prisma.js";

// Create Review
export const createReview = async (req, res) => {
  try {
    const {
      name,
      role,
      rating,
      comment,
      image,
      isVisible,
    } = req.body;

    if (!name || rating === undefined || !comment) {
      return res.status(400).json({
        success: false,
        message: "Name, rating and comment are required",
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5",
      });
    }

    const review = await prisma.review.create({
      data: {
        name: name.trim(),
        role: role?.trim() || null,
        rating: numericRating,
        comment: comment.trim(),
        image: image?.trim() || null,
        isVisible: isVisible ?? true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create review",
    });
  }
};


// Get Reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        isVisible: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};


// Update Review
export const updateReview = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      role,
      rating,
      comment,
      image,
      isVisible,
    } = req.body;

    if (!name || rating === undefined || !comment) {
      return res.status(400).json({
        success: false,
        message: "Name, rating and comment are required",
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5",
      });
    }

    const review = await prisma.review.update({
      where: {
        id,
      },
      data: {
        name: name.trim(),
        role: role?.trim() || null,
        rating: numericRating,
        comment: comment.trim(),
        image: image?.trim() || null,
        isVisible: isVisible ?? true,
      },
    });

    res.json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update review",
    });
  }
};


// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.review.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};