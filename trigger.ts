/* eslint-disable node/no-unpublished-import */
import {lambdaHandler} from './src/index';
import fastify from 'fastify';
import {APIGatewayProxyEvent, Context} from 'aws-lambda';
const event: APIGatewayProxyEvent = {
  body: 'eyJ0ZXN0IjoiYm9keSJ9',
  resource: '/{proxy+}',
  path: '/path/to/resource',
  httpMethod: 'POST',
  isBase64Encoded: true,
  queryStringParameters: {
    foo: 'bar',
  },
  multiValueQueryStringParameters: {
    foo: ['bar'],
  },
  pathParameters: {
    proxy: '/path/to/resource',
  },
  stageVariables: {
    baz: 'qux',
  },
  headers: {
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'en-US,en;q=0.8',
    'Cache-Control': 'max-age=0',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-Country': 'US',
    Host: '1234567890.execute-api.us-east-1.amazonaws.com',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Custom User Agent String',
    Via: '1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': 'cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==',
    'X-Forwarded-For': '127.0.0.1, 127.0.0.2',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https',
  },
  multiValueHeaders: {
    Accept: [
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    ],
    'Accept-Encoding': ['gzip, deflate, sdch'],
    'Accept-Language': ['en-US,en;q=0.8'],
    'Cache-Control': ['max-age=0'],
    'CloudFront-Forwarded-Proto': ['https'],
    'CloudFront-Is-Desktop-Viewer': ['true'],
    'CloudFront-Is-Mobile-Viewer': ['false'],
    'CloudFront-Is-SmartTV-Viewer': ['false'],
    'CloudFront-Is-Tablet-Viewer': ['false'],
    'CloudFront-Viewer-Country': ['US'],
    Host: ['0123456789.execute-api.us-east-1.amazonaws.com'],
    'Upgrade-Insecure-Requests': ['1'],
    'User-Agent': ['Custom User Agent String'],
    Via: ['1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)'],
    'X-Amz-Cf-Id': ['cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA=='],
    'X-Forwarded-For': ['127.0.0.1, 127.0.0.2'],
    'X-Forwarded-Port': ['443'],
    'X-Forwarded-Proto': ['https'],
  },
  requestContext: {
    accountId: '',
    apiId: '',
    authorizer: {},
    httpMethod: '',
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      accessKey: null,
      sourceIp: '127.0.0.1',
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: 'Custom User Agent String',
      user: null,
      apiKey: '',
      apiKeyId: '',
      clientCert: null,
      principalOrgId: '',
    },
    path: '/prod/path/to/resource',
    resourcePath: '/{proxy+}',
    protocol: 'HTTP/1.1',
    resourceId: '123456',
    stage: 'prod',
    requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
    requestTime: '09/Apr/2015:12:34:56 +0000',
    requestTimeEpoch: 1428582896000,
  },
};
const context: Context = {
  awsRequestId: '',
  callbackWaitsForEmptyEventLoop: true,
  functionName: '',
  functionVersion: '',
  getRemainingTimeInMillis: () => 1,
  invokedFunctionArn: '',
  logGroupName: '',
  logStreamName: '',
  memoryLimitInMB: '256',
  done: () => {},
  fail: () => {},
  succeed: () => {},
};
const server = fastify();
// Declare a route
server.post('/', async (request: any, reply: any) => {
  event.resource = request.body!['resource']!;
  event.httpMethod = request.body!['httpMethod']!;
  event.body = request.body['body'] ?? null;
  const result = await lambdaHandler(event, context);
  return {...result, body: JSON.parse(result.body)};
});

// Run the server!
const start = async () => {
  try {
    await server.listen({port: 8080});
    console.log('pode rodar');
  } catch (err) {
    server.log.error(err);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

start();
