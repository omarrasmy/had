/* istanbul ignore file */
import {
    Mapper,
    MappingProfile,
    createMap,
    forMember,
    mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { GatewayLogs } from 'src/gateway-logs/db/gateway-log.entity';
import { CreateGatewayLogDto } from 'src/gateway-logs/dto/create-gateway-log.dto';
import { GatewayLogResponseDto } from 'src/gateway-logs/dto/gateway-log-response.dto';

@Injectable()
export class GatewayLogsProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }
    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, GatewayLogs, GatewayLogResponseDto,
                forMember((des) => des.details, mapFrom((src) => {
                    return {
                        ...src.details
                    };
                }))
            );
            createMap(mapper, GatewayLogResponseDto, GatewayLogs,
                forMember((des) => des.details, mapFrom((src) => {
                    return {
                        ...src.details
                    };
                }))
            );
            createMap(mapper, CreateGatewayLogDto, GatewayLogs,
                forMember((des) => des.details, mapFrom((src) => {
                    return {
                        ...src.details
                    };
                }))
            );
        };
    }
}
