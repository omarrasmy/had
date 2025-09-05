import { Inject, Injectable } from '@nestjs/common';
import { CreateDeviceTypeDto } from './dto/create-device-type.dto';
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto';
import { DeviceTypeInterfaceRepository } from './interface/device-type.interface.repository';
import { DEVICE_TYPE_INTERFACE_REPOSITORY } from './interface/device-type.tokens';
import { DeviceTypeResponseDto } from './dto/device-type-response.dto';

@Injectable()
export class DeviceTypesService {
    constructor(
        @Inject(DEVICE_TYPE_INTERFACE_REPOSITORY)
        private readonly deviceTypeRepository: DeviceTypeInterfaceRepository,
    ) { }

    create(createDeviceTypeDto: CreateDeviceTypeDto): Promise<DeviceTypeResponseDto> {
        return this.deviceTypeRepository.create(createDeviceTypeDto);
    }

    findAll() {
        return this.deviceTypeRepository.findAll({});
    }

    findOne(id: string): Promise<DeviceTypeResponseDto> {
        return this.deviceTypeRepository.findOne({ where: { id } });
    }

    update(id: string, updateDeviceTypeDto: UpdateDeviceTypeDto): Promise<DeviceTypeResponseDto> {
        return this.deviceTypeRepository.update(id, updateDeviceTypeDto);
    }

    remove(id: string) {
        return this.deviceTypeRepository.delete(id);
    }
}
