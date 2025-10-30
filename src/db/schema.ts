import { StoredFile } from "@/types/type";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";




export const fileTable = pgTable("files", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  size: integer().notNull()
});
