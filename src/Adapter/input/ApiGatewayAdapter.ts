import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import {inject, injectable} from 'tsyringe';
import {DemoApp} from '../../Application/DemoApp';
import {DITokens} from '../../Domain/DITokens';
import {LambdaInterface} from '../interfaces/LambdaInterface';

@injectable()
export class ApiGatewayAdapter implements LambdaInterface {
  constructor(
    @inject(DITokens.DEMO_APP_INPUT_PORT) private useCases: DemoApp
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
