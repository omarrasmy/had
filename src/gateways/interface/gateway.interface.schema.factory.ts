import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { Gateways } from "../db/gateway.entity";
import { GatewayResponseDto } from "../dto/gateway-response.dto";

export interface GatewayInterfaceSchemaFactory extends IEntitySchemaFactory<Gateways, GatewayResponseDto> {
}
