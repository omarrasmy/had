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
import { Gateways } from 'src/gateways/db/gateway.entity';
import { CreateGatewayDto } from 'src/gateways/dto/create-gateway.dto';
import { GatewayResponseDto } from 'src/gateways/dto/gateway-response.dto';
import { PeripheralDevices } from 'src/peripheral-devices/db/peripheral-device.entity';
import { PeripheralDeviceResponseDto } from 'src/peripheral-devices/dto/peripheral-device-response.dto';

@Injectable()
export class GatewaysProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }
    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Gateways, GatewayResponseDto,
                forMember((des) => des.devices, mapFrom((src) => {
                    if (src.devices)
                        return mapper.mapArray(src.devices, PeripheralDevices, PeripheralDeviceResponseDto);
                    return [];
                }))
            );
            createMap(mapper, GatewayResponseDto, Gateways);
            createMap(mapper, CreateGatewayDto, Gateways);
        };
    }
}
