import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { Settings } from '../../infrastructure/configurations/settings';
import { BodyParserMiddleware } from './middlewares/body-parser.middleware';
import { CorsMiddleware } from './middlewares/cors.middleware';

@injectable()
export class HttpServer {
  constructor(
    @inject(Settings) private settings: Settings,
    @inject(CorsMiddleware) private corsMiddleware: CorsMiddleware,
    @inject(BodyParserMiddleware) private bodyParserMiddleware: BodyParserMiddleware
  ) {}

  public async start() {
    const app = express();
    const port = this.settings.getServerPort();

    this.configureMiddlewares(app);

    app.get('/', (req: any, res: any) => res.send('Ok'));

    app.listen(port, () => console.log(`Server running at port ${port}`));
  }

  private configureMiddlewares(app: Express) {
    this.corsMiddleware.configure(app);
    this.bodyParserMiddleware.configure(app);
  }
}
