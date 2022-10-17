import {Demo} from '../../../Domain/Demo';

export interface DemoFactoriePort {
  demo(name: string, id: string): Demo;
}
