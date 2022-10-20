const handler = require('./build/index.js');
    
(async () => {
    const now = new Date();
    const now7 = new Date(now);
    now7.setDate(now.getDate() + 7);
   const result = await handler.lambdaHandler({
  "resource": "/task",
     "httpMethod": "GET",
     "body": JSON.stringify({
       name: 'teste do name',
       description: 'teste description',
       responsable: 'teste responsable',
       dueDate: now7.toISOString()
     })
   })
    console.log(result)
  })();