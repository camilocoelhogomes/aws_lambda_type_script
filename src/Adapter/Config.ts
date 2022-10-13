import {Handler} from 'aws-lambda';
import {Handlers} from './input/Handlers';

export class Config implements Handlers {
  getHandler(): Promise<Handler<any, any>> {
    throw new Error('Method not implemented.');
  }
}
