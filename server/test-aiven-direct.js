import "dotenv/config";
import mariadb from "mariadb";

try {
  console.log("Testing direct MariaDB connection...");

  const connection = await mariadb.createConnection({
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

  console.log("✅ Direct MariaDB connection succeeded!");

  const result = await connection.query("SELECT 1 AS ok");

  console.log("Query result:", result);

  await connection.end();
} catch (error) {
  console.error("❌ DIRECT DB ERROR");
  console.error(error);
}