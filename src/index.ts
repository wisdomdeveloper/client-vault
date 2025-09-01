import { drizzle } from "drizzle-orm/node-postgres";
import postgress from "postgres";

const connectionString = process.env.POSTGRES_URL;

export const client = postgress(connectionString!, { prepare: false });

export const db = drizzle(client);


function main() {
  
}
