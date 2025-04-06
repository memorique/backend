import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({name: 'ContainsGiftLink', async: false})
export class ContainsGiftLinkConstraint implements ValidatorConstraintInterface{
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        return typeof value === 'string' && value.includes('[gift_link]');
    }
    defaultMessage(validationArguments?: ValidationArguments): string {
        return `body must contain '[gift_link]' tag.`;
    }
}