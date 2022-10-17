import {Config} from './Adapter/Config';
import 'reflect-metadata';
class Main {
  constructor(private config: Config) {}
  async start() {
    const internalHandler = await this.config.start();
    return internalHandler.handler.bind(internalHandler);
  }
}

const handler = new Main(new Config()).start();
export default handler;
