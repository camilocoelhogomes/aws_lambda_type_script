import {inject, injectable} from 'tsyringe';
import {Demo} from '../Domain/Demo';
import {DITokens} from '../Domain/DITokens';
import DemoAppInputPort from './input/DemoAppInputPort';
import DemoCrudOutputPort from './output/DemoCrudOutputPort';

@injectable()
export class DemoApp implements DemoAppInputPort {
  constructor(
    @inject(DITokens.DEMO_CRUD_OUTPUT_PORT)
    private readonly demoOutuputPort: DemoCrudOutputPort
  ) {}
  getAll(): Promise<Demo[]> {
    return this.demoOutuputPort.getAll();
  }
}
