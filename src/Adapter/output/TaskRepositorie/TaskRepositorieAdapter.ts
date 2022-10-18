import {EntityManager} from '@typedorm/core';
import {inject, injectable} from 'tsyringe';
import {TaskFactoriePort} from '../../../Application/ports/factories/TaskFactoriePort';
import {TaskRepositoriePort} from '../../../Application/ports/output/TaskRepositoryPort';
import {DITokens} from '../../../Domain/DITokens';
import {Task} from '../../../Domain/Task';
import {TaskEntity} from './entity/TaskEntity';

@injectable()
export class TaskRepositorieAdapter implements TaskRepositoriePort {
  constructor(
    @inject(DITokens.ENTITY_MANAGER)
    private readonly entityManager: EntityManager,
    @inject(DITokens.TASK_FACTORIE)
    private readonly taskFactorie: TaskFactoriePort
  ) {}
  getByPeriod(start: Date, end: Date): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }

  async create(task: Task): Promise<Task> {
    const taskEntity = this.taskEntityFactorie(task);
    const result = await this.entityManager.create<TaskEntity>(taskEntity);
    return this.taskFromEntity(result);
  }

  update(task: Task): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  delete(task: Task): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private taskEntityFactorie(task: Task): TaskEntity {
    const taskEntity = new TaskEntity();
    taskEntity.id = task.id;
    taskEntity.description = task.description;
    taskEntity.done = task.done;
    taskEntity.dueDate = task.dueDate.toISOString();
    taskEntity.name = task.name;
    taskEntity.responsable = task.responsable;
    taskEntity.registredDay = task.registredDay.toISOString();
    return taskEntity;
  }

  private taskFromEntity(taskEntity: TaskEntity): Task {
    return this.taskFactorie.fromRaw(
      taskEntity.id,
      taskEntity.name,
      taskEntity.description,
      taskEntity.responsable,
      taskEntity.dueDate,
      taskEntity.registredDay,
      taskEntity.done
    );
  }
}
