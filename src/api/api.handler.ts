import { httpServerHandler } from './http-server/http-server.handler';

export const apiHandler = async () => await httpServerHandler().start();
