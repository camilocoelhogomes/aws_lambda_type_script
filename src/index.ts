import {Config} from './Adapter/Config';
import {Context, APIGatewayProxyResult, APIGatewayEvent} from 'aws-lambda';
import 'reflect-metadata';
class Main {
  constructor(private config: Config) {}
  async start() {
    const internalInput = await this.config.start();
    return internalInput.input.bind(internalInput);
  }
}
const handler = new Main(new Config()).start();

export const lambdaHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const internalHanlder = await handler;
  return internalHanlder(event, context, () => {});
};
