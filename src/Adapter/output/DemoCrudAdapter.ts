import {inject, injectable} from 'tsyringe';
import {DemoFactoriePort} from '../../Application/ports/factories/DemoFactoriePort';
import {DemoCrudOutputPort} from '../../Application/ports/output/DemoCrudOutputPort';
import {Demo} from '../../Domain/Demo';
import {DITokens} from '../../Domain/DITokens';

@injectable()
export class DemoCrudAdapter implements DemoCrudOutputPort {
  constructor(
    @inject(DITokens.DEMO_FACTORIE_OUTUPUT_PORT)
    private readonly demoFactorie: DemoFactoriePort
  ) {}
  async getAll(): Promise<Demo[]> {
    return [this.demoFactorie.demo('camilo', '1')];
  }
}
