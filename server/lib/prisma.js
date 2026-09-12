import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),

  ssl: {
    rejectUnauthorized: false,
  },

  connectionLimit: 2,
  connectTimeout: 30000,
  acquireTimeout: 30000,
});

export const prisma = new PrismaClient({
  adapter,
});