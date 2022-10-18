import {injectable} from 'tsyringe';
import {TaskRepositoriePort} from '../../../Application/ports/output/TaskRepositoryPort';
import {Task} from '../../../Domain/Task';

@injectable()
export class TaskRepositorieAdapter implements TaskRepositoriePort {
  getByPeriod(start: Date, end: Date): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }
  create(task: Task): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  update(task: Task): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  delete(task: Task): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
