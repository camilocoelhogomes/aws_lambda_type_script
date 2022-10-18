import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
// eslint-disable-next-line node/no-extraneous-import
import {DocumentClientV3} from '@typedorm/document-client';
import {Table} from '@typedorm/common';
import {container} from 'tsyringe';
import {UnregistredTaskFactorieAdater} from '../Application/factories/UnregistredTaskFactorieAdater';
import {DITokens} from '../Domain/DITokens';
import {ApiGatewayAdapter} from './input/ApiGatewayAdapter';
import {InputPort} from './inputPort/InputPort';
import {RandomAdapter} from './output/RamdomAdapter';
import {createConnection, getEntityManager} from '@typedorm/core';
import {TaskEntity} from './output/TaskRepositorie/entity/TaskEntity';

export class Config {
  constructor() {}
  async start(): Promise<InputPort> {
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
    const entityManager = getEntityManager();
    container.register(DITokens.ENTITY_MANAGER, {useValue: entityManager});
    container.register(DITokens.UNREGISTRED_TASK_FACTORIE, {
      useClass: UnregistredTaskFactorieAdater,
    });
    container.register(DITokens.RANDOM_PORT, {
      useClass: RandomAdapter,
    });
    return container.resolve(ApiGatewayAdapter);
  }
}
