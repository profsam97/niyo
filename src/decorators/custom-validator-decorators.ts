import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  export function IsAtLeastOneDefined(
    properties: string[],
    validationOptions?: ValidationOptions,
  ) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isAtLeastOneDefined',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [properties],
        validator: {
          validate(_: any, args: ValidationArguments) {
            const [relatedProperties] = args.constraints;
            const object = args.object as any;
  
            return relatedProperties.some(
              (propertyName: string) => object[propertyName] !== undefined,
            );
          },
          defaultMessage(args: ValidationArguments) {
            const relatedProperties = args.constraints[0].join(' or ');
            return `At least one of ${relatedProperties} must be defined`;
          },
        },
      });
    };
  }
  