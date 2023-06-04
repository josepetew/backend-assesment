import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import { prisma } from "@/prisma/prisma";
import { pubsub } from "@/graphql/pubsub";
import { schema } from "@/graphql/schema";

export const createWebSocketServer = (
  httpServer: http.Server,
  opts: { path: string }
) => {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: opts.path,
  });

  return useServer(
    {
      schema,
      context: async () => ({
        prisma,
        pubsub,
      }),
    },
    wsServer
  );
};
