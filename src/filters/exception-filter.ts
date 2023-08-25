import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { EntityValidationException } from '@exceptions/entity-validation-exception';
import { ValidationError } from 'class-validator';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(exception);
    let errorResult: [HttpStatus, { message: string; field: string }[] | string[]] = null;
    if (exception instanceof EntityValidationException) {
      const response = exception.getResponse();
      errorResult = [HttpStatus.BAD_REQUEST, this.parseValidationObject(response['message'] as ValidationError[])];
    } else if (exception instanceof HttpException) {
      const messages = exception.getResponse();
      errorResult = [exception.getStatus(), Array.isArray(messages) ? messages : [messages['message']]];
    } else {
      errorResult = [HttpStatus.INTERNAL_SERVER_ERROR, ['Something went wrong']];
    }

    response.status(errorResult[0]).json({
      timestamp: new Date().toISOString(),
      errors: errorResult[1],
    });
  }

  parseValidationObject(messages: ValidationError[]) {
    return (
      messages?.map((msg) => {
        return { field: msg.property, message: Object.values(msg.constraints)?.at(0) ?? '' };
      }) ?? []
    );
  }
}
