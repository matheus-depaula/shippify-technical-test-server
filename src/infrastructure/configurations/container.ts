import * as Types from './types';
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
import { CompanyController } from '../../api/http-server/controllers/company.controller';
import { Mediator } from '../../application/mediator';
import { CreateCompanyHandler } from '../../application/company/create-company/create-company.handler';

const container: Container = new Container();

decorate(injectable(), Controller);

// ENTRY POINT
container.bind(MainHandler).toSelf().inSingletonScope();

// INFRASTRUCTURE
container.bind(Types.Container).toConstantValue(container);
container.bind(Settings).toSelf().inSingletonScope();
container.bind(DatabaseConnection).toSelf().inSingletonScope();
container.bind(DatabaseConnectionOptions).toSelf().inSingletonScope();

// APPLICATION
container.bind(Types.Mediator).to(Mediator);

// HANDLERS
container.bind(Types.CreateCompanyHandler).to(CreateCompanyHandler);

// API
container.bind(HttpServer).toSelf().inSingletonScope();
container.bind(CorsMiddleware).toSelf().inSingletonScope();
container.bind(ErrorMiddleware).toSelf().inSingletonScope();
container.bind(SwaggerMiddleware).toSelf().inSingletonScope();
container.bind(BodyParserMiddleware).toSelf().inSingletonScope();

// CONTROLLERS
container.bind(HealthCheckController).toSelf().inSingletonScope();
container.bind(CompanyController).toSelf().inSingletonScope();

export { container, container as iocContainer };
