import {container} from 'tsyringe';
import {DemoApp} from '../Application/DemoApp';
import {DITokens} from '../Domain/DITokens';
import {ApiGatewayAdapter} from './input/ApiGatewayAdapter';
import {LambdaInterface} from './interfaces/LambdaInterface';
import {DemoCrudAdapter} from './output/DemoCrudAdapter';

export class Config {
  constructor() {}
  async start(): Promise<LambdaInterface> {
    container.register(DITokens.DEMO_APP_INPUT_PORT, {useClass: DemoApp});
    container.register(DITokens.DEMO_CRUD_OUTPUT_PORT, {
      useClass: DemoCrudAdapter,
    });
    return container.resolve(ApiGatewayAdapter);
  }
}
