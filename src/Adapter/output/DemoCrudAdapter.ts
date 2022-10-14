import {DemoCrudOutputPort} from '../../Application/output/DemoCrudOutputPort';
import {Demo} from '../../Domain/Demo';

export class DemoCrudAdapter implements DemoCrudOutputPort {
  async getAll(): Promise<Demo[]> {
    return [new Demo('camilo', '28')];
  }
}
