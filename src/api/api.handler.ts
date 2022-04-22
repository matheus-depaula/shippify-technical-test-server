import { httpServerHandler } from './http/http-server.handler';

export const apiHandler = async () => await httpServerHandler().start();
