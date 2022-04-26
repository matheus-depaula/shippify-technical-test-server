import { inject, injectable } from 'inversify';
import { dtoHasSufficientProperties } from '../../../helpers/update-dto-properties';
import { DriverRepository } from '../../../infrastructure/database/repositories/driver.repository';
import { BadRequestResult } from '../../contracts/results/bad-request-result';
import { NoContentResult } from '../../contracts/results/no-content-result';
import { Result } from '../../contracts/results/result.handler';
import { DtoHandler } from '../../dto.handler';
import { UpdateDriverDto } from './update-driver.dto';

@injectable()
export class UpdateDriverHandler implements DtoHandler<UpdateDriverDto> {
  constructor(@inject(DriverRepository) private driverRepository: DriverRepository) {}

  public async handle(dto: UpdateDriverDto): Promise<Result> {
    if (!dtoHasSufficientProperties(dto)) {
      return new BadRequestResult('Insufficient properties');
    }

    const driver = await this.driverRepository.findById(dto.id);

    if (!driver) return new BadRequestResult('Driver not exists');

    if (dto.email) {
      const emailRegistered = await this.driverRepository.exists('email', dto.email);

      if (emailRegistered) return new BadRequestResult('Email already registered');
    }

    driver.update(dto.firstName, dto.lastName, dto.email, dto.phone, dto.avatarUrl);

    await this.driverRepository.save({ ...driver, ...dto });

    return new NoContentResult();
  }
}
