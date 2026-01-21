import { PrismaClient } from "@/prisma/generated/prisma";
import "dotenv/config";

const prisma = new PrismaClient();

export { prisma };
