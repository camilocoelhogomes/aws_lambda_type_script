import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import {injectable} from 'tsyringe';
import {InputPort} from '../inputPort/InputPort';

@injectable()
export class ApiGatewayAdapter implements InputPort {
  constructor() {}

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
