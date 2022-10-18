import {UnregistredTask} from '../../../Domain/UnregistredTask';

export interface UnregistredTaskFactoriePort {
  fromRaw(
    name: string,
    description: string,
    responsable: string,
    dueDate: string
  ): UnregistredTask;
}
