import {Demo} from '../../Domain/Demo';

export default interface DemoCrudOutputPort {
  getAll(): Promise<Demo[]>;
}
