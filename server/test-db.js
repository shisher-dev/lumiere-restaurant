import { prisma } from "./lib/prisma.js";

try {
  const result = await prisma.$queryRaw`SELECT 1`;
  console.log("Aiven MySQL connected");
  console.log(result);
} catch (error) {
  console.error("Database connection failed");
  console.error(error.message);
} finally {
  await prisma.$disconnect();
}