import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import {inject, injectable} from 'tsyringe';
import DemoAppOrquestratorPort from '../../Application/ports/orquestrators/DemoAppOrquestratorPort';
import {DITokens} from '../../Domain/DITokens';
import {InputPort} from '../inputPort/InputPort';

@injectable()
export class ApiGatewayAdapter implements InputPort {
  constructor(
    @inject(DITokens.DEMO_APP_ORQUESTRATOR_PORT)
    private useCases: DemoAppOrquestratorPort
  ) {}

  async input(
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
