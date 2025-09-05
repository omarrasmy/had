import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsIPv4(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isIPv4',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: {
                validate(value: any) {
                    if (typeof value !== 'string') return false;

                    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                    return ipv4Regex.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid IPv4 address`;
                },
            },
        });
    };
}
