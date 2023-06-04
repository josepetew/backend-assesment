import { PrismaClient } from "@prisma/client";

export interface ApolloBaseContext {
  prisma: PrismaClient;
}
