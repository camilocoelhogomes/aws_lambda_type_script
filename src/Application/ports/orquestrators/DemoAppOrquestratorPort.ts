import {Demo} from '../../../Domain/Demo';

export default interface DemoAppOrquestratorPort {
  getAll(): Promise<Demo[]>;
}
