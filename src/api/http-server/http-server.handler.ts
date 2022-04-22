import { HttpServer } from './http-server';
import { container } from '../../infrastructure/configurations/container';

export const httpServerHandler = () => container.get(HttpServer);
