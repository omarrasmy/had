import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { GatewayStatus } from "../db/gateway.entity";
import { PeripheralDeviceResponseDto } from "src/peripheral-devices/dto/peripheral-device-response.dto";

export class GatewayResponseDto {
    @ApiProperty({ description: 'Gateway ID' })
    @AutoMap()
    id: string;

    @ApiProperty({ description: 'Gateway serial number' })
    @AutoMap()
    serialNumber: string;

    @ApiProperty({ description: 'Gateway name' })
    @AutoMap()
    name: string;

    @ApiProperty({ description: 'IPv4 address' })
    @AutoMap()
    ipv4Address: string;

    @ApiProperty({ description: 'Gateway status', enum: GatewayStatus })
    @AutoMap()
    status: GatewayStatus;

    @ApiProperty({ description: 'Gateway location' })
    @AutoMap()
    location: string;

    @ApiProperty({ description: 'Associated devices', type: [PeripheralDeviceResponseDto] })
    @AutoMap()
    devices: PeripheralDeviceResponseDto[];

    @ApiProperty({ description: 'Creation timestamp' })
    @AutoMap()
    createdAt: Date;

    @ApiProperty({ description: 'Last update timestamp' })
    @AutoMap()
    updatedAt: Date;
}
