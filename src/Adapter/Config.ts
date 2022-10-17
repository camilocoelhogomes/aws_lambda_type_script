import {container} from 'tsyringe';
import {DemoFactorie} from '../Application/factories/DemoFactorie';
import {DemoAppOrquestrator} from '../Application/orquestrators/DemoAppOrquestrator';
import {DITokens} from '../Domain/DITokens';
import {ApiGatewayAdapter} from './input/ApiGatewayAdapter';
import {InputPort} from './inputPort/InputPort';
import {DemoCrudAdapter2} from './output/DemoCrudAdapter2';

export class Config {
  constructor() {}
  async start(): Promise<InputPort> {
    container.register(DITokens.DEMO_CRUD_OUTPUT_PORT, {
      useClass: DemoCrudAdapter2,
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
