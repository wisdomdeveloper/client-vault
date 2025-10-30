import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import postgres from "postgres";

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  console.log("NO connection string found");
}

export const client = postgres(connectionString!, { prepare: false });
export const db = drizzle(client);
