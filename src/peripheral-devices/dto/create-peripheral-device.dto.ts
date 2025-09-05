import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional, IsPositive, Min } from "class-validator";
import { DeviceStatus } from "../db/peripheral-device.entity";

export class CreatePeripheralDeviceDto {
    @ApiProperty({
        description: 'Unique device identifier (globally unique)',
        example: 1234567890,
        minimum: 1
    })
    @IsNumber()
    @IsPositive()
    @Min(1)
    @AutoMap()
    uid: number;

    @ApiProperty({
        description: 'Device vendor name',
        example: 'Arduino LLC'
    })
    @IsString()
    @IsNotEmpty()
    @AutoMap()
    vendor: string;

    @ApiProperty({
        description: 'Device status',
        enum: DeviceStatus,
        default: DeviceStatus.OFFLINE
    })
    @IsEnum(DeviceStatus)
    @IsOptional()
    @AutoMap()
    status?: DeviceStatus;

    @ApiProperty({
        description: 'Device type ID',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsString()
    @IsNotEmpty()
    @AutoMap()
    deviceTypeId: string;

    @ApiProperty({
        description: 'Gateway ID (optional, can be null for orphan devices)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required: false
    })
    @IsString()
    @IsOptional()
    @AutoMap()
    gatewayId?: string;
}
