import type { ConnectRouter } from "@connectrpc/connect";
import { SortService } from "./gen/sort/v1/sort_pb.js";
import type {BubbleSortRequest, BubbleSortResponse } from "./gen/sort/v1/sort_pb.d.js";

export default (router: ConnectRouter) =>
  router.service(SortService, {
    bubbleSort(req: BubbleSortRequest): BubbleSortResponse {

      const numbers = req.data.slice();

      for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length - 1; j++) {
          if (numbers[j] > numbers[j + 1]) {
            const swap = numbers[j];
            numbers[j] = numbers[j + 1];
            numbers[j + 1] = swap;
          }
        }
      }

      return {
        data: numbers,
      };
    },
  });
