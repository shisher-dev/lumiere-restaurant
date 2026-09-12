import { prisma } from "../lib/prisma.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalFoods,
      totalCategories,
      totalReviews,
      totalGalleryImages,
      availableFoods,
      unavailableFoods,
      featuredFoods,
      recentFoods,
      recentReviews,
    ] = await Promise.all([
      // Total Foods
      prisma.food.count(),

      // Total Categories
      prisma.category.count(),

      // Total Reviews
      prisma.review.count(),

      // Total Gallery Images
      prisma.gallery.count(),

      // Available Foods
      prisma.food.count({
        where: {
          isAvailable: true,
        },
      }),

      // Unavailable Foods
      prisma.food.count({
        where: {
          isAvailable: false,
        },
      }),

      // Featured Foods
      prisma.food.count({
        where: {
          isFeatured: true,
        },
      }),

      // Recent Foods
      prisma.food.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
        },
      }),

      // Recent Reviews
      prisma.review.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    res.json({
      success: true,

      data: {
        totalFoods,
        totalCategories,
        totalReviews,
        totalGalleryImages,
        availableFoods,
        unavailableFoods,
        featuredFoods,

        recentFoods,
        recentReviews,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};