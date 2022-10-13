import {Demo} from '../../Domain/Demo';

export default interface DemoAppInputPort {
  getAll(): Promise<Demo[]>;
}
