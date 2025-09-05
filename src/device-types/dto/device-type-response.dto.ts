import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class DeviceTypeResponseDto {
    @ApiProperty({ description: 'Device type ID' })
    @AutoMap()
    id: string;

    @ApiProperty({ description: 'Device type name' })
    @AutoMap()
    name: string;

    @ApiProperty({ description: 'Device type description' })
    @AutoMap()
    description: string;

    @ApiProperty({ description: 'Creation timestamp' })
    @AutoMap()
    createdAt: Date;

    @ApiProperty({ description: 'Last update timestamp' })
    @AutoMap()
    updatedAt: Date;
}
