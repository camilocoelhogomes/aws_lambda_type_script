import {Handler} from 'aws-lambda';

export interface Handlers {
  getHandler(): Promise<Handler>;
}
