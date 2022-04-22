import { apiHandler } from './api/api.handler';
import { databaseHandler } from './infrastructure/database/database.handler';

const start = async () => {
  await databaseHandler();
  await apiHandler();
};

start();
