import "dotenv/config";
import net from "node:net";

const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);

console.log("Testing TCP connection...");
console.log("Host:", host);
console.log("Port:", port);

const socket = net.createConnection(
  {
    host,
    port,
    timeout: 15000,
  },
  () => {
    console.log("✅ TCP connection to Aiven succeeded!");
    socket.end();
    process.exit(0);
  }
);

socket.on("timeout", () => {
  console.error("❌ TCP connection timed out");
  socket.destroy();
  process.exit(1);
});

socket.on("error", (error) => {
  console.error("❌ TCP connection failed");
  console.error(error.message);
  process.exit(1);
});