/* eslint-disable node/no-unpublished-import */
const lambdaHandler = require('./bundle/index.js');
const fastify =require('fastify');

const server = fastify();
// Declare a route
server.post('/', async (request) => {
  const event = {};
  event.resource = request.body['resource'];
  event.httpMethod = request.body['httpMethod'];
  event.body = request.body['body'] ?? null;
  const result = await lambdaHandler(event, {});
  return {...result, body: JSON.parse(result.body)};
});

// Run the server!
const start = async () => {
  try {
    await server.listen({port: 8081});
    console.log('pode rodar');
  } catch (err) {
    server.log.error(err);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

start();
