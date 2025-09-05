import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID, IsObject, MaxLength, ValidateNested } from "class-validator";


export class CreateGatewayLogDto {
    @ApiProperty({
        description: 'Gateway ID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    @AutoMap()
    gatewayId: string;

    @ApiProperty({
        description: 'Action performed',
        example: 'DEVICE_ATTACHED'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @AutoMap()
    action: string;

    @ApiProperty({
        description: 'Additional details in JSON format',
        example: { deviceId: '123e4567-e89b-12d3-a456-426614174000', deviceName: 'Temperature Sensor' }
    })
    @IsObject()
    @AutoMap()
    details: Record<string, any>;
}