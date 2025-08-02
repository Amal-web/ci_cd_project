import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export default async function databaseConnect() {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully!!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
