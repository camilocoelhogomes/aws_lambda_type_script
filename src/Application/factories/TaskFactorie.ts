import {inject, injectable} from 'tsyringe';
import {DITokens} from '../../Domain/DITokens';
import {Task} from '../../Domain/Task';
import {UnregistredTask} from '../../Domain/UnregistredTask';
import {TaskFactoriePort} from '../ports/factories/TaskFactoriePort';
import type {RandomPort} from '../ports/output/RandomPort';

@injectable()
export class TaskFactorie implements TaskFactoriePort {
  constructor(
    @inject(DITokens.RANDOM_PORT) private readonly random: RandomPort
  ) {}
  fromUnregistredTask(unregistredTask: UnregistredTask): Task {
    return new Task(
      this.random.UUID(),
      unregistredTask.name,
      unregistredTask.description,
      unregistredTask.responsable,
      unregistredTask.dueDate,
      new Date(),
      false
    );
  }
  fromRaw(raw: {
    id: string;
    name: string;
    description: string;
    responsable: string;
    dueDate: string;
    registredDay: string;
    done: boolean;
  }): Task {
    return new Task(
      raw.id,
      raw.name,
      raw.description,
      raw.responsable,
      new Date(raw.dueDate),
      new Date(raw.registredDay),
      raw.done
    );
  }
}
