import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const port = 50051;

// Get the absolute path to the proto file
const PROTO_PATH = path.resolve(process.cwd(), '../proto/sort.proto');

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// Load the service definition
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const sortService = protoDescriptor.sort.v1.SortService;

// Create a new gRPC server
const server = new grpc.Server();

// Implement the BubbleSort service
server.addService(sortService.service, {
  BubbleSort: (call, callback) => {
    const numbers = call.request.data?.slice() || [];

    // Bubble sort algorithm
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length - 1; j++) {
        if (numbers[j] > numbers[j + 1]) {
          const swap = numbers[j];
          numbers[j] = numbers[j + 1];
          numbers[j + 1] = swap;
        }
      }
    }

    callback(null, { data: numbers });
  }
});

// Start the server
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (error, bindPort) => {
    if (error) {
      console.error('Server failed to bind:', error);
      return;
    }
    console.log(`Server listening on port ${bindPort}`);
  }
);
