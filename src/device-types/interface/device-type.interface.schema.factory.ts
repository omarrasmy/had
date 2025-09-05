import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { DeviceTypes } from "../db/device-type.entity";
import { DeviceTypeResponseDto } from "../dto/device-type-response.dto";

export interface DeviceTypeInterfaceSchemaFactory extends IEntitySchemaFactory<DeviceTypes, DeviceTypeResponseDto> {
}
