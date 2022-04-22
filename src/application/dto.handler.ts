export interface DtoHandler<D, R = undefined> {
  handle(dto: D): Promise<R>;
}
