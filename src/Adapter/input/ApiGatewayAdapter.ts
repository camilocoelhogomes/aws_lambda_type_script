import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import {inject, injectable} from 'tsyringe';
import TaskAppOrquestrator from '../../Application/ports/orquestrators/DemoAppOrquestratorPort';
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
    return {
      statusCode: 200,
      body: '',
    };
  }
}
