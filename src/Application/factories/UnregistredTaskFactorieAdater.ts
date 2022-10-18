import {injectable} from 'tsyringe';
import {UnregistredTask} from '../../Domain/UnregistredTask';
import {UnregistredTaskFactoriePort} from '../ports/factories/UnregistredTaskFactoriePort';

@injectable()
export class UnregistredTaskFactorieAdater
  implements UnregistredTaskFactoriePort
{
  fromRaw(
    name: string,
    description: string,
    responsable: string,
    dueDate: string
  ): UnregistredTask {
    return new UnregistredTask(
      name,
      description,
      responsable,
      new Date(dueDate)
    );
  }
}
