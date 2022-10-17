import {Demo} from '../../../Domain/Demo';

export interface DemoCrudOutputPort {
  getAll(): Promise<Demo[]>;
}
