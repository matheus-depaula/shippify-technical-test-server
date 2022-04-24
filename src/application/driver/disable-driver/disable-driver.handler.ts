import { inject, injectable } from 'inversify';
import { DriverRepository } from '../../../infrastructure/database/repositories/driver.repository';
import { BadRequestResult } from '../../contracts/results/bad-request-result';
import { NoContentResult } from '../../contracts/results/no-content-result';
import { Result } from '../../contracts/results/result.handler';
import { DtoHandler } from '../../dto.handler';
import { DisableDriverDto } from './disable-driver.dto';

@injectable()
export class DisableDriverHandler implements DtoHandler<DisableDriverDto> {
  constructor(@inject(DriverRepository) private driverRepository: DriverRepository) {}

  public async handle(dto: DisableDriverDto): Promise<Result> {
    const driver = await this.driverRepository.findById(dto.id, [], true);

    if (!driver) return new BadRequestResult('Driver not exists');

    driver.disable();

    await this.driverRepository.save(driver);

    return new NoContentResult();
  }
}
