import { IEntityRepository } from "src/database/interface.entity.repository";
import { Gateways } from "../db/gateway.entity";
import { GatewayResponseDto } from "../dto/gateway-response.dto";
import { DeleteResult } from "typeorm";

export interface GatewayInterfaceRepository extends IEntityRepository<Gateways, GatewayResponseDto> {
    attachDevice(gatewayId: string, deviceId: string): Promise<GatewayResponseDto>;
    detachDevice(gatewayId: string, deviceId: string): Promise<GatewayResponseDto>;
    deleteWithOrphanDevices(id: string): Promise<DeleteResult>;
    deleteWithCascade(id: string): Promise<DeleteResult>;
}
