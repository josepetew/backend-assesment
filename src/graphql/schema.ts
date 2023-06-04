import { readFileSync } from "node:fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";

export const typeDefs = readFileSync("./src/graphql/schema.graphql", "utf8");

export const schema = makeExecutableSchema({ typeDefs, resolvers });
