module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  logging: false,
  entities: ['src/domain/entities/*.entity.ts'],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/domain/entities',
    migrationsDir: 'src/infrastructure/database/migrations',
  },
};
