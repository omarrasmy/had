import { IEntityRepository } from "src/database/interface.entity.repository";
import { GatewayLogs } from "../db/gateway-log.entity";
import { GatewayLogResponseDto } from "../dto/gateway-log-response.dto";

export interface GatewayLogInterfaceRepository extends IEntityRepository<GatewayLogs, GatewayLogResponseDto> {
    findByGatewayId(gatewayId: string): Promise<GatewayLogResponseDto[]>;
}
