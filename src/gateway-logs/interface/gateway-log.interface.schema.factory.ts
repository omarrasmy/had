import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { GatewayLogs } from "../db/gateway-log.entity";
import { GatewayLogResponseDto } from "../dto/gateway-log-response.dto";

export interface GatewayLogInterfaceSchemaFactory extends IEntitySchemaFactory<GatewayLogs, GatewayLogResponseDto> {
}
