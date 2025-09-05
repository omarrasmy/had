/* istanbul ignore file */
import {
    Mapper,
    MappingProfile,
    createMap,
    forMember,
    mapFrom
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { PeripheralDevices } from 'src/peripheral-devices/db/peripheral-device.entity';
import { CreatePeripheralDeviceDto } from 'src/peripheral-devices/dto/create-peripheral-device.dto';
import { PeripheralDeviceResponseDto } from 'src/peripheral-devices/dto/peripheral-device-response.dto';
import { DeviceTypes } from 'src/device-types/db/device-type.entity';
import { DeviceTypeResponseDto } from 'src/device-types/dto/device-type-response.dto';

@Injectable()
export class PeripheralDevicesProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }
    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, PeripheralDevices, PeripheralDeviceResponseDto,
                forMember((des) => des.deviceType, mapFrom((src) => {
                    if (src.deviceType)
                        return mapper.map(src.deviceType, DeviceTypes, DeviceTypeResponseDto);
                    return undefined;
                }))
            );
            createMap(mapper, PeripheralDeviceResponseDto, PeripheralDevices);
            createMap(mapper, CreatePeripheralDeviceDto, PeripheralDevices);
        };
    }
}
