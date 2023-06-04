import { RedisPubSub } from "graphql-redis-subscriptions";
import vars from "@/config/vars";

export const pubsub = new RedisPubSub({ connection: vars.redisUrl });
