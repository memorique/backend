import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUniqueEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[], args: ValidationArguments) {
          const emails = value.map((recipient: { email: string }) => recipient.email);
          return new Set(emails).size === emails.length; // Checks for duplicates by converting to Set
        },
        defaultMessage() {
          return 'Each email in the recipient list must be unique';
        },
      },
    });
  };
}