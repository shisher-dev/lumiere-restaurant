import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "127.0.0.1",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "lumiere_restaurant",
  port: 3306,
  connectionLimit: 5,
});

export const prisma = new PrismaClient({
  adapter,
});