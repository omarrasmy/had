import { Gateways } from "./gateway.entity";
import { DeleteResult, Repository } from "typeorm";
import { GatewayInterfaceRepository } from "../interface/gateway.interface.repository";
import { GatewayInterfaceSchemaFactory } from "../interface/gateway.interface.schema.factory";
import { GatewayResponseDto } from "../dto/gateway-response.dto";
import { EntityRepository } from "src/database/entity.repository";
import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GATEWAY_INTERFACE_SCHEMA_FACTORY } from "../interface/gateway.tokens";
import { PeripheralDevices } from "src/peripheral-devices/db/peripheral-device.entity";

@Injectable()
export class GatewayRepository extends EntityRepository<Gateways, GatewayResponseDto> implements GatewayInterfaceRepository {
    constructor(
        @InjectRepository(Gateways)
        protected readonly repository: Repository<Gateways>,
        @Inject(GATEWAY_INTERFACE_SCHEMA_FACTORY)
        protected readonly entitySchemaFactory: GatewayInterfaceSchemaFactory,
        @InjectRepository(PeripheralDevices)
        private readonly deviceRepository: Repository<PeripheralDevices>,
    ) {
        super(repository, entitySchemaFactory);
    }

    async attachDevice(gatewayId: string, deviceId: string): Promise<GatewayResponseDto> {
        // Check if gateway exists
        const gateway = await this.repository.findOne({ where: { id: gatewayId } });
        if (!gateway) {
            throw new NotFoundException('Gateway not found');
        }

        // Check if device exists
        const device = await this.deviceRepository.findOne({ where: { id: deviceId } });
        if (!device) {
            throw new NotFoundException('Device not found');
        }

        // Check if device is already attached to this gateway
        if (device.gatewayId === gatewayId) {
            throw new BadRequestException('Device is already attached to this gateway');
        }

        // Check max 10 devices rule
        const deviceCount = await this.deviceRepository.count({ where: { gatewayId } });
        if (deviceCount >= 10) {
            throw new BadRequestException('Gateway cannot have more than 10 devices');
        }

        // Attach device
        await this.deviceRepository.update(deviceId, { gatewayId });

        return this.findOne({
            where: { id: gatewayId },
            relations: ['devices', 'devices.deviceType']
        });
    }

    async detachDevice(gatewayId: string, deviceId: string): Promise<GatewayResponseDto> {
        // Check if gateway exists
        const gateway = await this.repository.findOne({ where: { id: gatewayId } });
        if (!gateway) {
            throw new NotFoundException('Gateway not found');
        }

        // Check if device exists and is attached to this gateway
        const device = await this.deviceRepository.findOne({
            where: { id: deviceId, gatewayId }
        });
        if (!device) {
            throw new NotFoundException('Device not found or not attached to this gateway');
        }

        // Detach device (set gateway to null)
        await this.deviceRepository.update(deviceId, { gatewayId: null });

        return this.findOne({
            where: { id: gatewayId },
            relations: ['devices', 'devices.deviceType']
        });
    }

    async deleteWithOrphanDevices(id: string): Promise<DeleteResult> {
        // Set all devices' gatewayId to null (orphan them)
        await this.deviceRepository.update({ gatewayId: id }, { gatewayId: null });

        // Delete the gateway
        return this.delete(id);
    }

    async deleteWithCascade(id: string): Promise<DeleteResult> {
        // Delete all associated devices first
        await this.deviceRepository.delete({ gatewayId: id });

        // Delete the gateway
        return this.delete(id);
    }
}
