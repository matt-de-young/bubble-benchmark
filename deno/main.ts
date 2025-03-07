import { fastify } from "fastify";
import { fastifyConnectPlugin } from "@connectrpc/connect-fastify";
import routes from "./connect.ts";

const server = fastify();
await server.register(fastifyConnectPlugin, {
  routes,
});
await server.listen({ host: "localhost", port: 8080 });
console.log("server is listening at", server.addresses());
