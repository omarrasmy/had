import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateDeviceTypeDto {
    @ApiProperty({
        description: 'Device type name (e.g., sensor, actuator, controller)',
        example: 'sensor'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @AutoMap()
    name: string;

    @ApiProperty({
        description: 'Device type description',
        example: 'Temperature and humidity sensor',
        required: false
    })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    @AutoMap()
    description?: string;
}
