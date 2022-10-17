import {container} from 'tsyringe';
import {DemoFactorie} from '../Application/factories/DemoFactorie';
import {DemoAppOrquestrator} from '../Application/orquestrators/DemoAppOrquestrator';
import {DITokens} from '../Domain/DITokens';
import {ApiGatewayAdapter} from './input/ApiGatewayAdapter';
import {LambdaInterface} from './interfaces/LambdaInterface';
import {DemoCrudAdapter} from './output/DemoCrudAdapter';

export class Config {
  constructor() {}
  async start(): Promise<LambdaInterface> {
    container.register(DITokens.DEMO_CRUD_OUTPUT_PORT, {
      useClass: DemoCrudAdapter,
    });
    container.register(DITokens.DEMO_APP_ORQUESTRATOR_PORT, {
      useClass: DemoAppOrquestrator,
    });
    container.register(DITokens.DEMO_FACTORIE_OUTUPUT_PORT, {
      useClass: DemoFactorie,
    });
    return container.resolve(ApiGatewayAdapter);
  }
}
