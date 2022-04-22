import { Container, decorate, injectable } from 'inversify';
import { Controller } from 'tsoa';
import { Settings } from './settings';
import { HttpServer } from '../../api/http-server/http-server';
import { CorsMiddleware } from '../../api/http-server/middlewares/cors.middleware';
import { BodyParserMiddleware } from '../../api/http-server/middlewares/body-parser.middleware';
import { DatabaseConnection } from '../database/database-connection';
import { DatabaseConnectionOptions } from '../database/database-connection-options';
import { HealthCheckController } from '../../api/http-server/controllers/health-check.controller';
import { SwaggerMiddleware } from '../../api/http-server/middlewares/swagger.middleware';
import { MainHandler } from '../../main.handler';
import { ErrorMiddleware } from '../../api/http-server/middlewares/error.middleware';

const container: Container = new Container();

decorate(injectable(), Controller);

// ENTRY POINT
container.bind(MainHandler).toSelf();

// INFRASTRUCTURE
container.bind(Settings).toSelf();
container.bind(DatabaseConnection).toSelf();
container.bind(DatabaseConnectionOptions).toSelf();

// API
container.bind(HttpServer).toSelf();
container.bind(CorsMiddleware).toSelf();
container.bind(ErrorMiddleware).toSelf();
container.bind(SwaggerMiddleware).toSelf();
container.bind(BodyParserMiddleware).toSelf();

// CONTROLLERS
container.bind(HealthCheckController).toSelf();

export { container, container as iocContainer };
