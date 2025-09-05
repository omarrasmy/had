import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsSerialNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isSerialNumber',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: {
                validate(value: any) {
                    if (typeof value !== 'string') return false;

                    // Serial number should be alphanumeric, allow hyphens and underscores
                    // Length between 6 and 50 characters
                    const serialRegex = /^[A-Za-z0-9_-]{6,50}$/;
                    return serialRegex.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid serial number (6-50 alphanumeric characters, hyphens and underscores allowed)`;
                },
            },
        });
    };
}
