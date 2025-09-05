import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { PeripheralDevices } from "../db/peripheral-device.entity";
import { PeripheralDeviceResponseDto } from "../dto/peripheral-device-response.dto";

export interface PeripheralDeviceInterfaceSchemaFactory extends IEntitySchemaFactory<PeripheralDevices, PeripheralDeviceResponseDto> {
}
