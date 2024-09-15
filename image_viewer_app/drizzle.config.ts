import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

module.exports = {
  schema: './drizzlea/schema.ts',
  dialect: "postgresql",
  schemaFilter: ["image"],
  out: "./src/db",
  dbCredentials: {
    host: process.env.PG_DB_HOST,
    user: process.env.PG_DB_USER,
    password: process.env.PG_DB_PASSWORD,
    database: process.env.PG_DB_NAME,
    ssl: false,
  },
} satisfies Config;