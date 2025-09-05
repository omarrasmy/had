import { IEntityRepository } from "src/database/interface.entity.repository";
import { PeripheralDevices } from "../db/peripheral-device.entity";
import { PeripheralDeviceResponseDto } from "../dto/peripheral-device-response.dto";

export interface PeripheralDeviceInterfaceRepository extends IEntityRepository<PeripheralDevices, PeripheralDeviceResponseDto> {
    findByGatewayId(gatewayId: string): Promise<PeripheralDeviceResponseDto[]>;
    countByGatewayId(gatewayId: string): Promise<number>;
    findOrphanDevices(): Promise<PeripheralDeviceResponseDto[]>;
}
