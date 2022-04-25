const extension = process.env.NODE_ENV === 'development' ? 'ts' : 'js';

module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  logging: false,
  entities: [`src/domain/entities/*.entity.${extension}`],
  migrations: [`src/infrastructure/database/migrations/*.${extension}`],
  cli: {
    entitiesDir: 'src/domain/entities',
    migrationsDir: 'src/infrastructure/database/migrations',
  },
};
