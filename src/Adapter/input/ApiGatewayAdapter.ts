import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import {inject, injectable} from 'tsyringe';
import type TaskAppOrquestrator from '../../Application/ports/orquestrators/DemoAppOrquestratorPort';
import {DITokens} from '../../Domain/DITokens';
import {InputPort} from '../inputPort/InputPort';

@injectable()
export class ApiGatewayAdapter implements InputPort {
  constructor(
    @inject(DITokens.TASK_ORQUESTRATOR)
    private readonly taskOrquestrator: TaskAppOrquestrator
  ) {}

  async input(
    event: APIGatewayProxyEvent,
    context: Context
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
}
