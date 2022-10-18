import {Task} from '../../../Domain/Task';

export interface TaskRepositoriePort {
  getByPeriod(start: Date, end: Date): Promise<Task[]>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(task: Task): Promise<void>;
}
