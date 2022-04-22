import 'reflect-metadata';
import { Container } from 'inversify';
import { Settings } from './settings';
import { HttpServer } from '../../api/http/http-server';
import { CorsMiddleware } from '../../api/http/middlewares/cors.middleware';
import { BodyParserMiddleware } from '../../api/http/middlewares/body-parser.middleware';
import { DatabaseConnection } from '../database/database-connection';
import { DatabaseConnectionOptions } from '../database/database-connection-options';

export const container = new Container();

// INFRASTRUCTURE
container.bind(Settings).toSelf().inSingletonScope();
container.bind(DatabaseConnection).toSelf().inSingletonScope();
container.bind(DatabaseConnectionOptions).toSelf().inSingletonScope();

// API
container.bind(HttpServer).toSelf().inSingletonScope();
container.bind(CorsMiddleware).toSelf().inSingletonScope();
container.bind(BodyParserMiddleware).toSelf().inSingletonScope();
