import { objectToSnake, objectToCamel } from 'ts-case-convert';

export function camelcaseConverter<T extends object>(obj: T) {
  return objectToCamel(obj);
}

export function snakecaseConverter<T extends object>(obj: T) {
  return objectToSnake(obj);
}
