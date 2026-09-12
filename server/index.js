import express from "express";
import cors from "cors";
import mariadb from "mariadb";
import { prisma } from "./lib/prisma.js";

import categoryRoutes from "./routes/categoryRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

// ==================================================
// MIDDLEWARE
// ==================================================

app.use(cors());
app.use(express.json());

// ==================================================
// API ROUTES
// ==================================================

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/upload", uploadRoutes);

// ==================================================
// ROOT API
// ==================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Lumière Restaurant API is running 🚀",
  });
});

// ==================================================
// DIRECT MARIADB DATABASE TEST
// Temporary diagnostic route
// ==================================================

app.get("/api/test-direct-db", async (req, res) => {
  let connection;

  try {
    console.log("====================================");
    console.log("DIRECT MARIADB DATABASE TEST START");
    console.log("====================================");

    connection = await mariadb.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      ssl: {
        rejectUnauthorized: false,
      },

      connectTimeout: 30000,
    });

    console.log("✅ Direct MariaDB connection established");

    const result = await connection.query("SELECT 1 AS ok");

    console.log("✅ Database query successful");
    console.log("Query result:", result);

    res.json({
      success: true,
      message: "Direct MariaDB connection succeeded! 🟢",
      result,
    });
  } catch (error) {
    console.error("====================================");
    console.error("❌ DIRECT DB ERROR");
    console.error("====================================");

    console.error("Name:", error?.name);
    console.error("Message:", error?.message);
    console.error("Code:", error?.code);
    console.error("Errno:", error?.errno);
    console.error("SQL State:", error?.sqlState);
    console.error("Stack:", error?.stack);
    console.error("Full Error:", error);

    console.error("====================================");

    res.status(500).json({
      success: false,
      message: "Direct MariaDB connection failed",
      error: {
        name: error?.name || null,
        message: error?.message || null,
        code: error?.code || null,
        errno: error?.errno || null,
        sqlState: error?.sqlState || null,
      },
    });
  } finally {
    if (connection) {
      try {
        await connection.end();
        console.log("Database connection closed");
      } catch (closeError) {
        console.error(
          "Database connection close error:",
          closeError?.message
        );
      }
    }
  }
});

// ==================================================
// PRISMA DATABASE TEST
// ==================================================

app.get("/api/test-db", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: "MySQL database connected successfully! 🟢",
    });
  } catch (error) {
    console.error("====================================");
    console.error("❌ PRISMA DATABASE ERROR");
    console.error("====================================");
    console.error(error);
    console.error("====================================");

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error?.message || null,
    });
  }
});

// ==================================================
// 404 HANDLER
// ==================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ==================================================
// START SERVER
// ==================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});