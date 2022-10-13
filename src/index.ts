import {Handler} from 'aws-lambda';
import {Config} from './Adapter/Config';
import {Handlers} from './Adapter/input/Handlers';

class Main {
  constructor(private config: Handlers) {}
  async coldStart(): Promise<Handler> {
    return this.config.getHandler();
  }
}

export const handler = Promise.resolve(new Main(new Config()).coldStart());
