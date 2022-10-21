import {Attribute, Entity} from '@typedorm/common';

@Entity({
  name: 'task',
  primaryKey: {
    partitionKey: 'name#{{id}}',
    sortKey: 'registredDay#{{registredDay}}',
  },
})
export class TaskEntity {
  @Attribute()
  id: string;

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
