import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { DeviceStatus } from "../db/peripheral-device.entity";
import { DeviceTypeResponseDto } from "src/device-types/dto/device-type-response.dto";

export class PeripheralDeviceResponseDto {
    @ApiProperty({ description: 'Device ID' })
    @AutoMap()
    id: string;

    @ApiProperty({ description: 'Unique device identifier' })
    @AutoMap()
    uid: number;

    @ApiProperty({ description: 'Device vendor' })
    @AutoMap()
    vendor: string;

    @ApiProperty({ description: 'Device status', enum: DeviceStatus })
    @AutoMap()
    status: DeviceStatus;

    @ApiProperty({ description: 'Last seen timestamp' })
    @AutoMap()
    lastSeenAt: Date;

    @ApiProperty({ description: 'Gateway ID', nullable: true })
    @AutoMap()
    gatewayId: string;

    @ApiProperty({ description: 'Device type ID' })
    @AutoMap()
    deviceTypeId: string;

    @ApiProperty({ description: 'Device type information' })
    @AutoMap()
    deviceType: DeviceTypeResponseDto;

    @ApiProperty({ description: 'Creation timestamp' })
    @AutoMap()
    createdAt: Date;

    @ApiProperty({ description: 'Last update timestamp' })
    @AutoMap()
    updatedAt: Date;
}
