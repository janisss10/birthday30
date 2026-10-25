import dotenv from "dotenv";
import path from "node:path";

// Load .env from the backend root
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});
