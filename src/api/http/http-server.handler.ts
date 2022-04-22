import 'reflect-metadata';
import { HttpServer } from '../../api/http/http-server';
import { container } from '../../infrastructure/configurations/container';

export const httpServerHandler = () => container.get(HttpServer);
