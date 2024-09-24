import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsBigInt(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBigInt',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'bigint' || !isNaN(Number(value));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a BigInt or a valid number`;
        },
      },
    });
  };
}
