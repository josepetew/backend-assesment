import http from "http";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { ApolloServer } from "@apollo/server";
import { koaMiddleware } from "@as-integrations/koa";
import { prisma } from "@/prisma/prisma";
import { ApolloBaseContext } from "@/types/apollo";
import Router from "@koa/router";
import { schema } from "@/graphql/schema";
import vars from "@/config/vars";

const graphqlPath = "/graphql";

const app = new Koa();
const router = new Router();
const httpServer = http.createServer(app.callback());

const server = new ApolloServer<ApolloBaseContext>({
  schema,
});

server.start().then(() => {
  app.use(cors());
  app.use(bodyParser());
  app.use(router.routes());
  router.all(
    graphqlPath,
    koaMiddleware(server, {
      context: async () => ({
        prisma,
      }),
    })
  );

  httpServer.listen({ port: vars.port }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${vars.port}${graphqlPath}`
    );
  });
});
