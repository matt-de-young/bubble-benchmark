import { GrpcServer } from "https://deno.land/x/grpc_basic@0.4.7/server.ts";
import type { SortService, list } from "./sort.d.ts";

const port = 50051;
const server = new GrpcServer();

const protoPath = new URL("../proto/sort.proto", import.meta.url);
const protoFile = await Deno.readTextFile(protoPath);

server.addService<SortService>(protoFile, {

  async BubbleSort(req : list) {
    const numbers = req.data?.slice() ?? [];

    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length - 1; j++) {
        if (numbers[j] > numbers[j + 1]) {
          const swap = numbers[j];
          numbers[j] = numbers[j + 1];
          numbers[j + 1] = swap;
        }
      }
    }

    return {data: numbers};
  },
});

console.log(`gonna listen on ${port} port`);
for await (const conn of Deno.listen({ port })) {
  server.handle(conn);
}
