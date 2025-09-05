import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { GatewayInterfaceRepository } from './interface/gateway.interface.repository';
import { GATEWAY_INTERFACE_REPOSITORY } from './interface/gateway.tokens';
import { GatewayResponseDto } from './dto/gateway-response.dto';

export enum GatewayDeletionMode {
    ORPHAN_DEVICES = 'orphan',
    CASCADE_DELETE = 'cascade'
}

@Injectable()
export class GatewaysService {
    constructor(
        @Inject(GATEWAY_INTERFACE_REPOSITORY)
        private readonly gatewayRepository: GatewayInterfaceRepository,
    ) { }

    create(createGatewayDto: CreateGatewayDto): Promise<GatewayResponseDto> {
        return this.gatewayRepository.create(createGatewayDto);
    }

    findAll() {
        return this.gatewayRepository.findAll({
            relations: ['devices', 'devices.deviceType']
        });
    }

    findOne(id: string): Promise<GatewayResponseDto> {
        return this.gatewayRepository.findOne({
            where: { id },
            relations: ['devices', 'devices.deviceType']
        });
    }

    async update(id: string, updateGatewayDto: UpdateGatewayDto): Promise<GatewayResponseDto> {
        // Validate that serial number is not being changed
        if (updateGatewayDto.hasOwnProperty('serialNumber')) {
            throw new BadRequestException('Serial number cannot be changed after creation');
        }

        return this.gatewayRepository.update(id, updateGatewayDto);
    }

    async remove(id: string, mode: GatewayDeletionMode = GatewayDeletionMode.ORPHAN_DEVICES) {
        if (mode === GatewayDeletionMode.CASCADE_DELETE) {
            return this.gatewayRepository.deleteWithCascade(id);
        } else {
            return this.gatewayRepository.deleteWithOrphanDevices(id);
        }
    }

    attachDevice(gatewayId: string, deviceId: string): Promise<GatewayResponseDto> {
        return this.gatewayRepository.attachDevice(gatewayId, deviceId);
    }

    detachDevice(gatewayId: string, deviceId: string): Promise<GatewayResponseDto> {
        return this.gatewayRepository.detachDevice(gatewayId, deviceId);
    }
}
