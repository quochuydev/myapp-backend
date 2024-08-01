import { PrismaClient } from "@prisma/client";

export default function PrismaService(url: string): PrismaClient {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
    log: ["warn", "error"],
  });

  return prisma;
}
