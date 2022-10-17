import {Config} from './Adapter/Config';
import 'reflect-metadata';
class Main {
  constructor(private config: Config) {}
  async start() {
    const internalInput = await this.config.start();
    return internalInput.input.bind(internalInput);
  }
}

const handler = new Main(new Config()).start();
export default handler;
