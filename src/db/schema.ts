import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const file = pgTable("files", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  size: integer("size").notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  uploadedAt: timestamp("uploaded_at", { mode: "date" }).defaultNow().notNull(),
  userUID: varchar("user_uid", { length: 255 }).notNull(),
  // The maximum length for URLs is set to 2048 characters.
  // Ensure URLs are validated before insertion to avoid silent truncation.
  url: varchar("url", { length: 2048 }).notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firebaseUid: varchar("firebase_uid", { length: 255 }).unique().notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  files: many(file),
}));

export const fileRelations = relations(file, ({ one }) => ({
  user: one(users, { fields: [file.userUID], references: [users.firebaseUid] }),
}));
