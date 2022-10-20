import {TaskRepositorieAdapter} from '../../../Adapter/output/TaskRepositorie/TaskRepositorieAdapter';
import {TaskFactorie} from '../../../Application/factories/TaskFactorie';
import {RandomAdapter} from '../../../Adapter/output/RamdomAdapter';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {Table} from '@typedorm/common';
import {createConnection} from '@typedorm/core';
import {TaskEntity} from '../../../Adapter/output/TaskRepositorie/entity/TaskEntity';
// eslint-disable-next-line node/no-extraneous-import
import {DocumentClientV3} from '@typedorm/document-client';
const taskFactorie = new TaskFactorie(new RandomAdapter());
const taskTable = new Table({
  name: 'task_table',
  partitionKey: 'pk',
  sortKey: 'sk',
});
const documentClient = new DocumentClientV3(new DynamoDBClient({}));
createConnection({
  table: taskTable,
  entities: [TaskEntity],
  documentClient,
});
describe('test_repositorie_test', () => {
  const testingClass = new TaskRepositorieAdapter(taskFactorie);
  test('getAll', async () => {
    const now = new Date();
    const now7 = new Date(now);
    now7.setDate(now.getDate() + 7);
    try {
      const result = await testingClass.getByPeriod(now, now7);
      console.log(result);
    } catch (error) {
      const e = error;
      console.log(e);
    }
  });
});
