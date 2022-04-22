import { Express, NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { ValidateError } from 'tsoa';
import { ErrorResult } from '../../../application/contracts/results/error-result.interface';
import { ValidationErrorResult } from '../../../application/contracts/results/validation-error-result.interface';
import { HttpClientError } from '../errors/http-client-error';
import { HttpServerError } from '../errors/http-server-error';
import { HttpClientErrorStatusCode, HttpServerErrorStatusCode } from '../http-status-code.enum';
import { IMiddleware } from './middleware.interface';

@injectable()
export class ErrorMiddleware implements IMiddleware {
  public configure(app: Express) {
    app.use((error: unknown, _req: Request, res: Response<ErrorResult | ValidationErrorResult>, next: NextFunction): Response | void => {
      console.log('oi');
      console.log('ERROR:', (error as any).message);

      if (error instanceof ValidateError) {
        return res.status(HttpClientErrorStatusCode.BAD_REQUEST).json({
          message: 'Invalid Request',
          details: error?.fields,
        });
      }

      if (error instanceof HttpClientError || error instanceof HttpServerError) {
        return res.status(error.status).json({ message: error.message });
      }

      if (error instanceof Error) {
        return res.status(HttpServerErrorStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
      }

      next();
    });
  }
}
