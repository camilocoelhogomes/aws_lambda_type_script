import {inject, injectable} from 'tsyringe';
import {DITokens} from '../../Domain/DITokens';
import {Task} from '../../Domain/Task';
import {UnregistredTask} from '../../Domain/UnregistredTask';
import type {TaskFactoriePort} from '../ports/factories/TaskFactoriePort';
import TaskAppOrquestrator from '../ports/orquestrators/DemoAppOrquestratorPort';
import type {TaskRepositoriePort} from '../ports/output/TaskRepositoryPort';

@injectable()
export class TaskOrquestratorAdapter implements TaskAppOrquestrator {
  constructor(
    @inject(DITokens.TASK_REPOSITORIE)
    private readonly taskRepositorie: TaskRepositoriePort,
    @inject(DITokens.TASK_FACTORIE)
    private readonly taskFactorie: TaskFactoriePort
  ) {}
  getAllByPeriod(startDate: Date, endDate: Date): Promise<Task[]> {
    return this.taskRepositorie.getByPeriod(startDate, endDate);
  }
  register(unregistredTask: UnregistredTask): Promise<Task> {
    const task = this.taskFactorie.fromUnregistredTask(unregistredTask);
    return this.taskRepositorie.create(task);
  }
  editTask(task: Task): Promise<Task> {
    return this.taskRepositorie.update(task);
  }
  delete(task: Task): Promise<void> {
    return this.taskRepositorie.delete(task);
  }
}
