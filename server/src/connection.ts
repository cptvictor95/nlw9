import { PrismaClient } from "@prisma/client";

const connection = new PrismaClient({
  log: ["query"],
});

export default connection;
