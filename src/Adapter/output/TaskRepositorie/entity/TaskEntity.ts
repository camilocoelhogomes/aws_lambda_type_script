import {Attribute, Entity} from '@typedorm/common';

@Entity({
  name: 'task',
  primaryKey: {
    partitionKey: 'name#{{name}}',
    sortKey: 'registredDay#{{registredDay}}',
  },
})
export class TaskEntity {
  @Attribute()
  name: string;

  @Attribute()
  description: string;

  @Attribute()
  responsable: string;

  @Attribute()
  dueDate: string;

  @Attribute()
  registredDay: string;

  @Attribute()
  done: boolean;
}
