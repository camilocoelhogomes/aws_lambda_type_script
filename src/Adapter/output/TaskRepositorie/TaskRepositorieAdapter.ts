import {EntityManager} from '@typedorm/core';
import {inject, injectable} from 'tsyringe';
import {TaskRepositoriePort} from '../../../Application/ports/output/TaskRepositoryPort';
import {DITokens} from '../../../Domain/DITokens';
import {Task} from '../../../Domain/Task';

@injectable()
export class TaskRepositorieAdapter implements TaskRepositoriePort {
  constructor(
    @inject(DITokens.ENTITY_MANAGER)
    private readonly entityManager: EntityManager
  ) {}
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
