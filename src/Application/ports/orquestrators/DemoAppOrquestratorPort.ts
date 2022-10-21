import {Task} from '../../../Domain/Task';
import {UnregistredTask} from '../../../Domain/UnregistredTask';

export default interface TaskAppOrquestrator {
  getAllByPeriod(startDate: Date, endDate: Date): Promise<Task[]>;
  register(unregistredTask: UnregistredTask): Promise<Task>;
  editTask(task: Task): Promise<Task>;
  delete(task: Task): Promise<void>;
}
