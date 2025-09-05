import { PeripheralDevices } from "./peripheral-device.entity";
import { Repository } from "typeorm";
import { PeripheralDeviceInterfaceRepository } from "../interface/peripheral-device.interface.repository";
import { PeripheralDeviceInterfaceSchemaFactory } from "../interface/peripheral-device.interface.schema.factory";
import { PeripheralDeviceResponseDto } from "../dto/peripheral-device-response.dto";
import { EntityRepository } from "src/database/entity.repository";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PERIPHERAL_DEVICE_INTERFACE_SCHEMA_FACTORY } from "../interface/peripheral-device.tokens";

@Injectable()
export class PeripheralDeviceRepository extends EntityRepository<PeripheralDevices, PeripheralDeviceResponseDto> implements PeripheralDeviceInterfaceRepository {
    constructor(
        @InjectRepository(PeripheralDevices)
        protected readonly repository: Repository<PeripheralDevices>,
        @Inject(PERIPHERAL_DEVICE_INTERFACE_SCHEMA_FACTORY)
        protected readonly entitySchemaFactory: PeripheralDeviceInterfaceSchemaFactory,
    ) {
        super(repository, entitySchemaFactory);
    }

    async findByGatewayId(gatewayId: string): Promise<PeripheralDeviceResponseDto[]> {
        const devices = await this.repository.find({
            where: { gatewayId },
            relations: ['deviceType']
        });
        return devices.map(device => this.entitySchemaFactory.createFromSchema(device));
    }

    async countByGatewayId(gatewayId: string): Promise<number> {
        return this.repository.count({ where: { gatewayId } });
    }

    async findOrphanDevices(): Promise<PeripheralDeviceResponseDto[]> {
        const devices = await this.repository.find({
            where: { gatewayId: null },
            relations: ['deviceType']
        });
        return devices.map(device => this.entitySchemaFactory.createFromSchema(device));
    }
}
