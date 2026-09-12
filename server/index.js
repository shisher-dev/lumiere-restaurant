import express from "express";
import cors from "cors";
import mariadb from "mariadb";
import dns from "node:dns/promises";
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
// ROOT
// ==================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Lumière Restaurant API is running 🚀",
  });
});

// ==================================================
// NETWORK + ENVIRONMENT DIAGNOSTIC
// ==================================================

app.get("/api/test-network", async (req, res) => {
  const host = process.env.DB_HOST;
  const port = Number(process.env.DB_PORT);

  try {
    console.log("====================================");
    console.log("NETWORK DIAGNOSTIC START");
    console.log("====================================");

    console.log("DB_HOST configured:", Boolean(process.env.DB_HOST));
    console.log("DB_PORT configured:", Boolean(process.env.DB_PORT));
    console.log("DB_USER configured:", Boolean(process.env.DB_USER));
    console.log(
      "DB_PASSWORD configured:",
      Boolean(process.env.DB_PASSWORD)
    );
    console.log("DB_NAME configured:", Boolean(process.env.DB_NAME));
    console.log("DB Port:", port);

    const addresses = await dns.lookup(host, {
      all: true,
    });

    console.log("DNS addresses:", addresses);

    res.json({
      success: true,

      environment: {
        dbHostConfigured: Boolean(process.env.DB_HOST),
        dbPortConfigured: Boolean(process.env.DB_PORT),
        dbUserConfigured: Boolean(process.env.DB_USER),
        dbPasswordConfigured: Boolean(process.env.DB_PASSWORD),
        dbNameConfigured: Boolean(process.env.DB_NAME),

        dbPortIsNumber: Number.isInteger(port),
        dbPort: Number.isInteger(port) ? port : null,
      },

      network: {
        dnsResolved: addresses.length > 0,
        dns: addresses,
      },
    });
  } catch (error) {
    console.error("====================================");
    console.error("NETWORK DIAGNOSTIC ERROR");
    console.error("====================================");

    console.error("Name:", error?.name);
    console.error("Message:", error?.message);
    console.error("Code:", error?.code);

    res.status(500).json({
      success: false,

      environment: {
        dbHostConfigured: Boolean(process.env.DB_HOST),
        dbPortConfigured: Boolean(process.env.DB_PORT),
        dbUserConfigured: Boolean(process.env.DB_USER),
        dbPasswordConfigured: Boolean(process.env.DB_PASSWORD),
        dbNameConfigured: Boolean(process.env.DB_NAME),

        dbPortIsNumber: Number.isInteger(port),
        dbPort: Number.isInteger(port) ? port : null,
      },

      error: {
        name: error?.name || null,
        message: error?.message || null,
        code: error?.code || null,
      },
    });
  }
});

// ==================================================
// DIRECT MARIADB DATABASE TEST
// ==================================================

app.get("/api/test-direct-db", async (req, res) => {
  let connection;

  try {
    console.log("====================================");
    console.log("DIRECT MARIADB DATABASE TEST");
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

    const result = await connection.query("SELECT 1 AS ok");

    res.json({
      success: true,
      message: "Direct MariaDB connection succeeded! 🟢",
      result: result.map((row) => ({
        ok: Number(row.ok),
      })),
    });
  } catch (error) {
    console.error("====================================");
    console.error("DIRECT MARIADB ERROR");
    console.error("====================================");

    console.error("Name:", error?.name);
    console.error("Message:", error?.message);
    console.error("Code:", error?.code);
    console.error("Errno:", error?.errno);
    console.error("SQL State:", error?.sqlState);
    console.error("Stack:", error?.stack);

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
    console.error("PRISMA DATABASE ERROR");
    console.error("====================================");

    console.error("Name:", error?.name);
    console.error("Message:", error?.message);
    console.error("Code:", error?.code);
    console.error("Stack:", error?.stack);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error?.message || null,
    });
  }
});

// ==================================================
// 404
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