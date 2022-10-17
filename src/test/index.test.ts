/* eslint-disable node/no-unpublished-import */
import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import handler from '..';
import {createMock} from 'ts-auto-mock';
const mockEvent = createMock<APIGatewayProxyEvent>();
const context = createMock<Context>();

describe('teste do handler', () => {
  test('call event', async () => {
    const lambdaHandler = await Promise.resolve(handler);
    const result = await lambdaHandler(mockEvent, context, () => {});
    console.log(result);
  });
});
