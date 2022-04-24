export function dtoHasSufficientProperties(dto: object): boolean {
  const length = Object.keys(dto).filter(e => e !== undefined).length;

  return length > 1;
}
