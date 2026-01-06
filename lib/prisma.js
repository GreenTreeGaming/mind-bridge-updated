// lib/prisma.js
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"; // for Postgres

const globalForPrisma = globalThis;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL, // keep using your env var
});

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, // <-- required in Prisma v7 for direct DB
    log: ["query", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
