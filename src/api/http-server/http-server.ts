import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { Settings } from '../../infrastructure/configurations/settings';
import { BodyParserMiddleware } from './middlewares/body-parser.middleware';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { SwaggerMiddleware } from './middlewares/swagger.middleware';

@injectable()
export class HttpServer {
  @inject(Settings)
  private readonly settings!: Settings;
  @inject(CorsMiddleware)
  private readonly corsMiddleware!: CorsMiddleware;
  @inject(ErrorMiddleware)
  private readonly errorMiddleware!: ErrorMiddleware;
  @inject(SwaggerMiddleware)
  private readonly swaggerMiddleware!: SwaggerMiddleware;
  @inject(BodyParserMiddleware)
  private readonly bodyParserMiddleware!: BodyParserMiddleware;

  public async start() {
    const app = express();
    const port = this.settings.getServerPort();

    this.configureMiddlewares(app);

    app.listen(port, () => console.log(`HTTP SERVER ### - Running at port ${port}`));
  }

  private configureMiddlewares(app: Express) {
    this.corsMiddleware.configure(app);
    this.errorMiddleware.configure(app);
    this.swaggerMiddleware.configure(app);
    this.bodyParserMiddleware.configure(app);
  }
}
