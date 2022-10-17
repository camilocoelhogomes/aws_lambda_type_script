import {Demo} from '../../Domain/Demo';
import {DemoFactoriePort} from '../ports/factories/DemoFactoriePort';

export class DemoFactorie implements DemoFactoriePort {
  demo(name: string, id: string): Demo {
    return new Demo(name, id);
  }
}
