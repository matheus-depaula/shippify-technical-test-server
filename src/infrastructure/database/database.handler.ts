import 'reflect-metadata';
import { container } from '../configurations/container';
import { DatabaseConnection } from './database-connection';

export const databaseHandler = async () => await container.get(DatabaseConnection).getConnection();
