import {Task} from '../../../Domain/Task';
import {UnregistredTask} from '../../../Domain/UnregistredTask';

export interface TaskFactoriePort {
  fromUnregistredTask(unregistredTask: UnregistredTask): Task;
  fromRaw(raw: {
    id: string;
    name: string;
    description: string;
    responsable: string;
    dueDate: string;
    registredDay: string;
    done: boolean;
  }): Task;
}
