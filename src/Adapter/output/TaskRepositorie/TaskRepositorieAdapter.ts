import {
  EntityManager,
  getEntityManager,
  getScanManager,
  ScanManager,
} from '@typedorm/core';
import {inject, injectable} from 'tsyringe';
import type {TaskFactoriePort} from '../../../Application/ports/factories/TaskFactoriePort';
import {TaskRepositoriePort} from '../../../Application/ports/output/TaskRepositoryPort';
import {DITokens} from '../../../Domain/DITokens';
import {Task} from '../../../Domain/Task';
import {TaskEntity} from './entity/TaskEntity';

@injectable()
export class TaskRepositorieAdapter implements TaskRepositoriePort {
  private readonly entityManager: EntityManager;
  private readonly scamManager: ScanManager;
  constructor(
    @inject(DITokens.TASK_FACTORIE)
    private readonly taskFactorie: TaskFactoriePort
  ) {
    this.entityManager = getEntityManager();
    this.scamManager = getScanManager();
  }

  async getByPeriod(start: Date, end: Date): Promise<Task[]> {
    const result = await this.scamManager.find(TaskEntity, {
      where: {
        OR: {
          dueDate: {BETWEEN: [start.toISOString(), end.toISOString()]},
          done: {CONTAINS: false},
        },
      },
    });
    if (!result.items) {
      return [];
    }
    return result.items.map(item => this.taskFromEntity(item));
  }

  async create(task: Task): Promise<Task> {
    const taskEntity = this.taskEntityFactorie(task);
    const result = await this.entityManager.create<TaskEntity>(taskEntity);
    return this.taskFromEntity(result);
  }

  async update(task: Task): Promise<Task> {
    const taskEntity = this.taskEntityFactorie(task);
    const result = await this.entityManager.update(
      TaskEntity,
      {id: taskEntity.id, registredDay: taskEntity.registredDay},
      {...taskEntity}
    );
    if (!result) {
      throw Error('entity not found');
    }
    return this.taskFromEntity(result);
  }

  async delete(task: Task): Promise<void> {
    const taskEntity = this.taskEntityFactorie(task);
    const result = await this.entityManager.delete(TaskEntity, taskEntity);
    if (!result) {
      throw Error('cant delete');
    }
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
    return this.taskFactorie.fromRaw({
      id:
        taskEntity.id ??
        `${taskEntity.name}${taskEntity.responsable}${taskEntity.registredDay}`,
      name: taskEntity.name,
      description: taskEntity.description,
      responsable: taskEntity.responsable,
      dueDate: taskEntity.dueDate,
      registredDay: taskEntity.registredDay,
      done: taskEntity.done,
    });
  }
}
