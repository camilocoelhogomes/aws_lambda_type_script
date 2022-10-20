const handler = require('./build/index.js');
  (async () => {
   const result = await handler.lambdaHandler({
  "resource": "/task",
  "httpMethod": "GET"
   })
    console.log(result)
  })();