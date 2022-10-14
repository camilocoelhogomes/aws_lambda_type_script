import {Context, Handler} from 'aws-lambda';
import {Config} from './Adapter/Config';

class Main {
  constructor(private config: Config) {}
  async start() {
    const internalHandler = await this.config.start();
    return internalHandler.handler.bind(this);
  }
}

const main = new Main(new Config());
const starthandler = main.start();
export const handler: Handler = async (event, context: Context) => {
  const handler = await starthandler;
  return handler(event, context, () => {});
};
