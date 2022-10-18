import {container} from 'tsyringe';
import {UnregistredTaskFactorieAdater} from '../Application/factories/UnregistredTaskFactorieAdater';
import {DITokens} from '../Domain/DITokens';
import {ApiGatewayAdapter} from './input/ApiGatewayAdapter';
import {InputPort} from './inputPort/InputPort';
import {RandomAdapter} from './output/RamdomAdapter';

export class Config {
  constructor() {}
  async start(): Promise<InputPort> {
    container.register(DITokens.UNREGISTRED_TASK_FACTORIE, {
      useClass: UnregistredTaskFactorieAdater,
    });
    container.register(DITokens.RANDOM_PORT, {
      useClass: RandomAdapter,
    });
    return container.resolve(ApiGatewayAdapter);
  }
}
