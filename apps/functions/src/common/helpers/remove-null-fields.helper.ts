import isNull from 'lodash/isNull';

export const removeNullFields = <T>(input: T): T => {
  const result: any = {};
  Object.keys(input).forEach((key) => {
    if (!isNull(input[key])) {
      result[key] = input[key];
    }
  });
  return result;
};
