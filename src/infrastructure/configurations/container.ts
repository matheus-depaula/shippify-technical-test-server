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
import { CompanyRepository } from '../database/repositories/company.repository';
import { ListCompaniesHandler } from '../../application/company/list-companies/list-companies.handler';
import { DisableCompanyHandler } from '../../application/company/disable-company/disable-company.handler';
import { FindCompanyByIdHandler } from '../../application/company/find-company-by-id/find-company-by-id.handler';
import { UpdateCompanyHandler } from '../../application/company/update-company/update-company.handler';
import { DriverController } from '../../api/http-server/controllers/driver.controller';
import { DriverRepository } from '../database/repositories/driver.repository';
import { ListDriversHandler } from '../../application/driver/list-drivers/list-drivers.handler';
import { CreateDriverHandler } from '../../application/driver/create-driver/create-driver.handler';
import { FindDriverByIdHandler } from '../../application/driver/find-driver-by-id/find-driver-by-id.handler';
import { DisableDriverHandler } from '../../application/driver/disable-driver/disable-driver.handler';
import { UpdateDriverHandler } from '../../application/driver/update-driver/update-company.handler';
import { VehicleController } from '../../api/http-server/controllers/vehicle.controller';
import { VehicleRepository } from '../database/repositories/vehicle.repository';
import { CreateVehicleHandler } from '../../application/vehicle/create-vehicle/create-driver.handler';
import { ListVehiclesHandler } from '../../application/vehicle/list-vehicles/list-vehicles.handler';
import { FindVehicleByIdHandler } from '../../application/vehicle/find-vehicle-by-id/find-vehicle-by-id.handler';
import { UpdateVehicleHandler } from '../../application/vehicle/update-vehicle/update-vehicle.handler';
import { DisableVehicleHandler } from '../../application/vehicle/disable-vehicle/disable-driver.handler';

const container: Container = new Container();

decorate(injectable(), Controller);

// ENTRY POINT
container.bind(MainHandler).toSelf().inSingletonScope();

// INFRASTRUCTURE
container.bind(Types.Container).toConstantValue(container);
container.bind(Settings).toSelf().inSingletonScope();
container.bind(DatabaseConnection).toSelf().inSingletonScope();
container.bind(DatabaseConnectionOptions).toSelf().inSingletonScope();

// REPOSITORIES
container.bind(CompanyRepository).toSelf().inRequestScope();
container.bind(DriverRepository).toSelf().inRequestScope();
container.bind(VehicleRepository).toSelf().inRequestScope();

// APPLICATION
container.bind(Types.Mediator).to(Mediator).inSingletonScope();

// HANDLERS
container.bind(Types.CreateCompanyHandler).to(CreateCompanyHandler).inRequestScope();
container.bind(Types.ListCompaniesHandler).to(ListCompaniesHandler).inRequestScope();
container.bind(Types.FindCompanyByIdHandler).to(FindCompanyByIdHandler).inRequestScope();
container.bind(Types.UpdateCompanyHandler).to(UpdateCompanyHandler).inRequestScope();
container.bind(Types.DisableCompanyHandler).to(DisableCompanyHandler).inRequestScope();

container.bind(Types.CreateDriverHandler).to(CreateDriverHandler).inRequestScope();
container.bind(Types.ListDriversHandler).to(ListDriversHandler).inRequestScope();
container.bind(Types.FindDriverByIdHandler).to(FindDriverByIdHandler).inRequestScope();
container.bind(Types.UpdateDriverHandler).to(UpdateDriverHandler).inRequestScope();
container.bind(Types.DisableDriverHandler).to(DisableDriverHandler).inRequestScope();

container.bind(Types.CreateVehicleHandler).to(CreateVehicleHandler).inRequestScope();
container.bind(Types.ListVehiclesHandler).to(ListVehiclesHandler).inRequestScope();
container.bind(Types.FindVehicleByIdHandler).to(FindVehicleByIdHandler).inRequestScope();
container.bind(Types.UpdateVehicleHandler).to(UpdateVehicleHandler).inRequestScope();
container.bind(Types.DisableVehicleHandler).to(DisableVehicleHandler).inRequestScope();

// API
container.bind(HttpServer).toSelf().inSingletonScope();
container.bind(CorsMiddleware).toSelf().inSingletonScope();
container.bind(ErrorMiddleware).toSelf().inSingletonScope();
container.bind(SwaggerMiddleware).toSelf().inSingletonScope();
container.bind(BodyParserMiddleware).toSelf().inSingletonScope();

// CONTROLLERS
container.bind(HealthCheckController).toSelf().inSingletonScope();
container.bind(CompanyController).toSelf().inSingletonScope();
container.bind(DriverController).toSelf().inSingletonScope();
container.bind(VehicleController).toSelf().inSingletonScope();

export { container, container as iocContainer };
