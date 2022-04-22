import { Container as ContainerInstance, inject, injectable } from 'inversify';
import { Container } from '../infrastructure/configurations/types';
import { DtoHandler } from './dto.handler';

@injectable()
export class Mediator {
  @inject(Container)
  private readonly container!: ContainerInstance;

  public async send<D extends object, R = undefined>(dto: D): Promise<R> {
    const dtoName = dto.constructor.name.replace('Dto', '');
    const handlerName = Symbol.for(`${dtoName}Handler`);

    const handler = this.container.get<DtoHandler<D, R>>(handlerName);

    return handler.handle(dto);
  }
}
