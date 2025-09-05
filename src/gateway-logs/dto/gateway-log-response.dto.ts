import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class GatewayLogResponseDto {
    @ApiProperty({ description: 'Log ID' })
    @AutoMap()
    id: string;

    @ApiProperty({ description: 'Gateway ID' })
    @AutoMap()
    gatewayId: string;

    @ApiProperty({ description: 'Action performed' })
    @AutoMap()
    action: string;

    @ApiProperty({ description: 'Additional details' })
    @AutoMap()
    details: Record<string, any>;

    @ApiProperty({ description: 'Creation timestamp' })
    @AutoMap()
    createdAt: Date;
}
