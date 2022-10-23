import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import {inject, injectable} from 'tsyringe';
import {TaskFactoriePort} from '../../Application/ports/factories/TaskFactoriePort';
import {UnregistredTaskFactoriePort} from '../../Application/ports/factories/UnregistredTaskFactoriePort';
import type TaskAppOrquestrator from '../../Application/ports/orquestrators/DemoAppOrquestratorPort';
import {DITokens} from '../../Domain/DITokens';
import {InputPort} from '../inputPort/InputPort';

@injectable()
export class ApiGatewayAdapter implements InputPort {
  private readonly router: Record<
    string,
    Record<
      string,
      (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>
    >
  > = {
    '/task': {
      GET: this.taskGet.bind(this),
      POST: this.taskPost.bind(this),
      DELETE: this.taskDelete.bind(this),
      PUT: this.taskPut.bind(this),
    },
  };

  constructor(
    @inject(DITokens.TASK_ORQUESTRATOR)
    private readonly taskOrquestrator: TaskAppOrquestrator,
    @inject(DITokens.UNREGISTRED_TASK_FACTORIE)
    private readonly unregistredTaskFactorie: UnregistredTaskFactoriePort,
    @inject(DITokens.TASK_FACTORIE)
    private readonly taskFactorie: TaskFactoriePort
  ) {}

  async input(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    return this.router[event.resource][event.httpMethod](event);
  }

  private async taskGet(
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> {
    const now = new Date();
    const now7 = new Date(now);
    now7.setDate(now.getDate() + 7);
    const result = await this.taskOrquestrator.getAllByPeriod(now, now7);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }

  private async taskPost(
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> {
    if (!event.body) {
      throw new Error('sem corpo');
    }
    const body = JSON.parse(event.body);

    const unregistredTask = this.unregistredTaskFactorie.fromRaw(
      body['name'],
      body['description'],
      body['responsable'],
      body['dueDate']
    );
    const result = await this.taskOrquestrator.register(unregistredTask);
    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  }

  private async taskDelete(
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> {
    if (!event.body) {
      throw new Error('sem corpo');
    }
    const task = this.taskFactorie.fromRaw(JSON.parse(event.body));
    await this.taskOrquestrator.delete(task);
    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  }

  private async taskPut(
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> {
    if (!event.body) {
      throw new Error('sem corpo');
    }

    const task = this.taskFactorie.fromRaw(JSON.parse(event.body));
    const result = await this.taskOrquestrator.editTask(task);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }
}
