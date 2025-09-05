import { IEntityRepository } from "src/database/interface.entity.repository";
import { DeviceTypes } from "../db/device-type.entity";
import { DeviceTypeResponseDto } from "../dto/device-type-response.dto";

export interface DeviceTypeInterfaceRepository extends IEntityRepository<DeviceTypes, DeviceTypeResponseDto> {
}
