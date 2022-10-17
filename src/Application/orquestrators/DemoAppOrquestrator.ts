import {inject, injectable} from 'tsyringe';
import {Demo} from '../../Domain/Demo';
import {DITokens} from '../../Domain/DITokens';
import DemoAppOrquestratorPort from '../ports/orquestrators/DemoAppOrquestratorPort';
import {DemoCrudOutputPort} from '../ports/output/DemoCrudOutputPort';

@injectable()
export class DemoAppOrquestrator implements DemoAppOrquestratorPort {
  constructor(
    @inject(DITokens.DEMO_CRUD_OUTPUT_PORT)
    private readonly demoOutuputPort: DemoCrudOutputPort
  ) {}
  getAll(): Promise<Demo[]> {
    return this.demoOutuputPort.getAll();
  }
}
