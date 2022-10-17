import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import {inject, injectable} from 'tsyringe';
import DemoAppOrquestratorPort from '../../Application/ports/orquestrators/DemoAppOrquestratorPort';
import {DITokens} from '../../Domain/DITokens';
import {LambdaInterface} from '../interfaces/LambdaInterface';

@injectable()
export class ApiGatewayAdapter implements LambdaInterface {
  constructor(
    @inject(DITokens.DEMO_APP_ORQUESTRATOR_PORT)
    private useCases: DemoAppOrquestratorPort
  ) {}

  async handler(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const result = await this.useCases.getAll();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }
}
