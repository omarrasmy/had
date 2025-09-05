import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum, IsOptional, MaxLength, MinLength } from "class-validator";
import { GatewayStatus } from "../db/gateway.entity";
import { IsIPv4 } from "src/helper/decorator/ip-validation";
import { IsSerialNumber } from "src/helper/decorator/serial-number-validation";

export class CreateGatewayDto {
    @ApiProperty({
        description: 'Gateway serial number (unique, immutable)',
        example: 'GW-ABC123-XYZ789'
    })
    @IsString()
    @IsNotEmpty()
    @IsSerialNumber()
    @AutoMap()
    serialNumber: string;

    @ApiProperty({
        description: 'Gateway name',
        example: 'Main Building Gateway'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    @AutoMap()
    name: string;

    @ApiProperty({
        description: 'IPv4 address (unique)',
        example: '192.168.1.100'
    })
    @IsString()
    @IsNotEmpty()
    @IsIPv4()
    @AutoMap()
    ipv4Address: string;

    @ApiProperty({
        description: 'Gateway status',
        enum: GatewayStatus,
        default: GatewayStatus.INACTIVE
    })
    @IsEnum(GatewayStatus)
    @IsOptional()
    @AutoMap()
    status?: GatewayStatus;

    @ApiProperty({
        description: 'Gateway location (optional)',
        example: 'Building A, Floor 1',
        required: false
    })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    @AutoMap()
    location?: string;
}
