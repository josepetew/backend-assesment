import http from "http";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { koaMiddleware } from "@as-integrations/koa";
import { prisma } from "@/prisma/prisma";
import { ApolloBaseContext } from "@/types/apollo";
import Router from "@koa/router";
import Keyv from "keyv";
import { KeyvAdapter } from "@apollo/utils.keyvadapter";
import responseCachePlugin from "@apollo/server-plugin-response-cache";
import { createWebSocketServer } from "@/server/createWebSocketServer";
import { schema } from "@/graphql/schema";
import { pubsub } from "@/graphql/pubsub";
import vars from "@/config/vars";

const graphqlPath = "/graphql";

const app = new Koa();
const router = new Router();
const httpServer = http.createServer(app.callback());
const serverCleanup = createWebSocketServer(httpServer, {
  path: graphqlPath,
});

const server = new ApolloServer<ApolloBaseContext>({
  schema,
  cache: new KeyvAdapter(new Keyv(vars.redisUrl)),
  plugins: [
    responseCachePlugin(),
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

server.start().then(() => {
  app.use(cors());
  app.use(bodyParser());
  app.use(router.routes());
  router.all(
    graphqlPath,
    koaMiddleware(server, {
      context: async ({ ctx }) => ({
        token: ctx.headers.token,
        prisma,
        pubsub,
      }),
    })
  );

  httpServer.listen({ port: vars.port }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${vars.port}${graphqlPath}`
    );
    console.log(
      `🚀 Websocket server ready at wss://localhost:${vars.port}${graphqlPath}`
    );
  });
});
