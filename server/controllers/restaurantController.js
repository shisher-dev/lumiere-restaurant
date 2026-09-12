import { prisma } from "../lib/prisma.js";

// Get Restaurant Settings
export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.findFirst({
      orderBy: {
        id: "asc",
      },
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant settings not found",
      });
    }

    res.json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurant settings",
    });
  }
};


// Create Restaurant Settings
export const createRestaurant = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      phone,
      email,
      openingHours,
      logo,
      coverImage,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Restaurant name is required",
      });
    }

    const existingRestaurant = await prisma.restaurant.findFirst();

    if (existingRestaurant) {
      return res.status(409).json({
        success: false,
        message: "Restaurant settings already exist",
      });
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        address: address?.trim() || null,
        phone: phone?.trim() || null,
        email: email?.trim() || null,
        openingHours: openingHours?.trim() || null,
        logo: logo?.trim() || null,
        coverImage: coverImage?.trim() || null,
      },
    });

    res.status(201).json({
      success: true,
      message: "Restaurant settings created successfully",
      data: restaurant,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create restaurant settings",
    });
  }
};


// Update Restaurant Settings
export const updateRestaurant = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      description,
      address,
      phone,
      email,
      openingHours,
      logo,
      coverImage,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Restaurant name is required",
      });
    }

    const restaurant = await prisma.restaurant.update({
      where: {
        id,
      },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        address: address?.trim() || null,
        phone: phone?.trim() || null,
        email: email?.trim() || null,
        openingHours: openingHours?.trim() || null,
        logo: logo?.trim() || null,
        coverImage: coverImage?.trim() || null,
      },
    });

    res.json({
      success: true,
      message: "Restaurant settings updated successfully",
      data: restaurant,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Restaurant settings not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update restaurant settings",
    });
  }
};