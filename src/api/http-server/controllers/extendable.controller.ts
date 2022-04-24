import * as Types from '../../../infrastructure/configurations/types';
import { inject } from 'inversify';
import { Controller } from 'tsoa';
import { Mediator } from '../../../application/mediator';

export abstract class ExtendableController extends Controller {
  @inject(Types.Mediator)
  public mediator!: Mediator;
}
