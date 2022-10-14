import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import {createMock} from 'ts-auto-mock';
import {handler} from '..';
const mockEvent = createMock<APIGatewayProxyEvent>();
const context = createMock<Context>();
describe('teste do handler', () => {
  test('call event', async () => {
    const result = await handler(mockEvent, context, () => {});
    console.log(result);
  });
});
