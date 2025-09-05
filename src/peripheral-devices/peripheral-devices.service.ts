import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeripheralDeviceDto } from './dto/create-peripheral-device.dto';
import { UpdatePeripheralDeviceDto } from './dto/update-peripheral-device.dto';
import { PeripheralDeviceInterfaceRepository } from './interface/peripheral-device.interface.repository';
import { PERIPHERAL_DEVICE_INTERFACE_REPOSITORY } from './interface/peripheral-device.tokens';
import { PeripheralDeviceResponseDto } from './dto/peripheral-device-response.dto';

@Injectable()
export class PeripheralDevicesService {
    constructor(
        @Inject(PERIPHERAL_DEVICE_INTERFACE_REPOSITORY)
        private readonly peripheralDeviceRepository: PeripheralDeviceInterfaceRepository,
    ) { }

    async create(createPeripheralDeviceDto: CreatePeripheralDeviceDto): Promise<PeripheralDeviceResponseDto> {
        // Check if UID is already in use
        try {
            const existingDevice = await this.peripheralDeviceRepository.findOne({
                where: { uid: createPeripheralDeviceDto.uid }
            });
            if (existingDevice) {
                throw new BadRequestException('Device UID must be globally unique');
            }
        } catch (error) {
            if (error instanceof NotFoundException) {
                // This is expected when device doesn't exist, continue with creation
            } else {
                throw error;
            }
        }

        // If gatewayId is provided, validate max 10 devices rule
        if (createPeripheralDeviceDto.gatewayId) {
            const deviceCount = await this.peripheralDeviceRepository.countByGatewayId(createPeripheralDeviceDto.gatewayId);
            if (deviceCount >= 10) {
                throw new BadRequestException('Gateway cannot have more than 10 devices');
            }
        }

        return this.peripheralDeviceRepository.create(createPeripheralDeviceDto);
    }

    findAll() {
        return this.peripheralDeviceRepository.findAll({ relations: ['deviceType'] });
    }

    findOne(id: string): Promise<PeripheralDeviceResponseDto> {
        return this.peripheralDeviceRepository.findOne({
            where: { id },
            relations: ['deviceType']
        });
    }

    async update(id: string, updatePeripheralDeviceDto: UpdatePeripheralDeviceDto): Promise<PeripheralDeviceResponseDto> {
        // If gatewayId is being updated, validate max 10 devices rule
        if (updatePeripheralDeviceDto.gatewayId) {
            const deviceCount = await this.peripheralDeviceRepository.countByGatewayId(updatePeripheralDeviceDto.gatewayId);
            if (deviceCount >= 10) {
                throw new BadRequestException('Gateway cannot have more than 10 devices');
            }
        }

        return this.peripheralDeviceRepository.update(id, updatePeripheralDeviceDto);
    }

    remove(id: string) {
        return this.peripheralDeviceRepository.delete(id);
    }

    findByGatewayId(gatewayId: string): Promise<PeripheralDeviceResponseDto[]> {
        return this.peripheralDeviceRepository.findByGatewayId(gatewayId);
    }

    findOrphanDevices(): Promise<PeripheralDeviceResponseDto[]> {
        return this.peripheralDeviceRepository.findOrphanDevices();
    }
}
