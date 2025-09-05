
/* istanbul ignore file */
import {
    Mapper,
    MappingProfile,
    createMap,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { DeviceTypes } from 'src/device-types/db/device-type.entity';
import { CreateDeviceTypeDto } from 'src/device-types/dto/create-device-type.dto';
import { DeviceTypeResponseDto } from 'src/device-types/dto/device-type-response.dto';

@Injectable()
export class DeviceTypesProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }
    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, DeviceTypes, DeviceTypeResponseDto);
            createMap(mapper, DeviceTypeResponseDto, DeviceTypes);
            createMap(mapper, CreateDeviceTypeDto, DeviceTypes);
        };
    }
}
