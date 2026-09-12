import "dotenv/config";
import { prisma } from "../lib/prisma.js";

const categories = [
  "Starters",
  "Main Course",
  "Pizza",
  "Pasta",
  "Desserts",
  "Beverages",
];

const foods = [
  {
    name: "Truffle Mushroom Soup",
    description:
      "A rich and creamy mushroom soup finished with aromatic truffle oil.",
    price: 450,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    rating: 4.8,
    isFeatured: true,
    category: "Starters",
  },
  {
    name: "Crispy Chicken Wings",
    description:
      "Golden crispy chicken wings served with our signature house sauce.",
    price: 520,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2",
    rating: 4.7,
    isFeatured: true,
    category: "Starters",
  },
  {
    name: "Grilled Chicken Steak",
    description:
      "Juicy grilled chicken breast served with seasonal vegetables and sauce.",
    price: 780,
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435",
    rating: 4.9,
    isFeatured: true,
    category: "Main Course",
  },
  {
    name: "Creamy Garlic Chicken",
    description:
      "Tender chicken cooked in a creamy garlic and herb sauce.",
    price: 720,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    rating: 4.8,
    isFeatured: false,
    category: "Main Course",
  },
  {
    name: "Classic Margherita Pizza",
    description:
      "Classic Italian pizza with tomato, mozzarella, basil and olive oil.",
    price: 650,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    rating: 4.7,
    isFeatured: true,
    category: "Pizza",
  },
  {
    name: "BBQ Chicken Pizza",
    description:
      "Wood-fired pizza topped with BBQ chicken, mozzarella and fresh herbs.",
    price: 750,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    rating: 4.9,
    isFeatured: true,
    category: "Pizza",
  },
  {
    name: "Creamy Alfredo Pasta",
    description:
      "Silky fettuccine pasta tossed in a creamy Parmesan Alfredo sauce.",
    price: 620,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a",
    rating: 4.8,
    isFeatured: false,
    category: "Pasta",
  },
  {
    name: "Chicken Penne Arrabbiata",
    description:
      "Penne pasta with grilled chicken in a spicy tomato and herb sauce.",
    price: 680,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    rating: 4.7,
    isFeatured: false,
    category: "Pasta",
  },
  {
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a rich molten chocolate center.",
    price: 420,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476e",
    rating: 4.9,
    isFeatured: true,
    category: "Desserts",
  },
  {
    name: "Classic Cheesecake",
    description:
      "Smooth and creamy cheesecake served with fresh berries.",
    price: 380,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
    rating: 4.8,
    isFeatured: false,
    category: "Desserts",
  },
  {
    name: "Fresh Lemon Mojito",
    description:
      "Refreshing lemon and mint drink with a bright citrus finish.",
    price: 280,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
    rating: 4.6,
    isFeatured: false,
    category: "Beverages",
  },
  {
    name: "Iced Coffee",
    description:
      "Smooth chilled coffee served over ice with a creamy finish.",
    price: 250,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
    rating: 4.7,
    isFeatured: false,
    category: "Beverages",
  },
];

// ==================================================
// DEMO REVIEWS
// Replace these with real customer reviews before
// using them as actual testimonials.
// ==================================================

const reviews = [
  {
    name: "Arif Rahman",
    role: "Food Enthusiast",
    rating: 5,
    comment:
      "The food was excellent and the overall dining experience was wonderful. The presentation and service were both impressive.",
    isVisible: true,
  },
  {
    name: "Nusrat Jahan",
    role: "Regular Guest",
    rating: 5,
    comment:
      "A beautiful place with delicious food and a warm atmosphere. Definitely one of my favorite dining experiences.",
    isVisible: true,
  },
  {
    name: "Tanvir Ahmed",
    role: "Customer",
    rating: 4,
    comment:
      "Great food, elegant environment, and friendly service. The dishes were fresh and nicely presented.",
    isVisible: true,
  },
  {
    name: "Sadia Karim",
    role: "Customer",
    rating: 5,
    comment:
      "Loved the taste and presentation. Everything felt carefully prepared and the atmosphere was very comfortable.",
    isVisible: true,
  },
  {
    name: "Rakib Hasan",
    role: "Food Lover",
    rating: 4,
    comment:
      "Really enjoyable experience. The food was tasty and the service was professional. Would visit again.",
    isVisible: true,
  },
];

async function main() {
  console.log("🌱 Starting Lumière Restaurant seed...");

  // ==================================================
  // RESTAURANT
  // ==================================================

  await prisma.restaurant.upsert({
    where: {
      id: 1,
    },

    update: {
      name: "Shisher X Al-Amin",
      description:
        "A premium dining destination offering carefully crafted dishes, warm hospitality, and an elegant dining experience.",
      address: "Palashbari, Gaibandha, Bangladesh",
      phone: "+8801409658800",
      email: "akshisher@gmail.com",
      openingHours: JSON.stringify({
        mondayThursday: "11:00 AM – 10:00 PM",
        fridaySaturday: "11:00 AM – 11:00 PM",
        sunday: "12:00 PM – 10:00 PM",
      }),
    },

    create: {
      id: 1,
      name: "Shisher X Al-Amin",
      description:
        "A premium dining destination offering carefully crafted dishes, warm hospitality, and an elegant dining experience.",
      address: "Palashbari, Gaibandha, Bangladesh",
      phone: "+8801409658800",
      email: "akshisher@gmail.com",
      openingHours: JSON.stringify({
        mondayThursday: "11:00 AM – 10:00 PM",
        fridaySaturday: "11:00 AM – 11:00 PM",
        sunday: "12:00 PM – 10:00 PM",
      }),
    },
  });

  console.log("✅ Restaurant information ready");

  // ==================================================
  // CATEGORIES
  // ==================================================

  const categoryMap = {};

  for (const name of categories) {
    const category = await prisma.category.upsert({
      where: {
        name,
      },

      update: {},

      create: {
        name,
      },
    });

    categoryMap[name] = category;
  }

  console.log(`✅ ${categories.length} categories ready`);

  // ==================================================
  // FOODS
  // ==================================================

  for (const food of foods) {
    const category = categoryMap[food.category];

    const existingFood = await prisma.food.findFirst({
      where: {
        name: food.name,
      },
    });

    if (existingFood) {
      await prisma.food.update({
        where: {
          id: existingFood.id,
        },

        data: {
          description: food.description,
          price: food.price,
          image: food.image,
          rating: food.rating,
          isFeatured: food.isFeatured,
          isAvailable: true,
          categoryId: category.id,
        },
      });
    } else {
      await prisma.food.create({
        data: {
          name: food.name,
          description: food.description,
          price: food.price,
          image: food.image,
          rating: food.rating,
          isFeatured: food.isFeatured,
          isAvailable: true,
          categoryId: category.id,
        },
      });
    }
  }

  console.log(`✅ ${foods.length} foods ready`);

  // ==================================================
  // REVIEWS
  // ==================================================

  for (const review of reviews) {
    const existingReview = await prisma.review.findFirst({
      where: {
        name: review.name,
      },
    });

    if (existingReview) {
      await prisma.review.update({
        where: {
          id: existingReview.id,
        },

        data: {
          role: review.role,
          rating: review.rating,
          comment: review.comment,
          isVisible: review.isVisible,
        },
      });
    } else {
      await prisma.review.create({
        data: {
          name: review.name,
          role: review.role,
          rating: review.rating,
          comment: review.comment,
          isVisible: review.isVisible,
        },
      });
    }
  }

  console.log(`✅ ${reviews.length} reviews ready`);

  // ==================================================
  // COMPLETE
  // ==================================================

  console.log("🎉 Lumière Restaurant seed completed!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });