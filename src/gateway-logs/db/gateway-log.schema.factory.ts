import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { GatewayLogResponseDto } from "../dto/gateway-log-response.dto";
import { GatewayLogs } from "./gateway-log.entity";
import { GatewayLogInterfaceSchemaFactory } from "../interface/gateway-log.interface.schema.factory";
import { Mapper } from "@automapper/core";
import { CreateGatewayLogDto } from "../dto/create-gateway-log.dto";
import { DeepPartial } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";

@Injectable()
export class GatewayLogSchemaFactory implements GatewayLogInterfaceSchemaFactory {
    constructor(@InjectMapper() private readonly mapper: Mapper) { }

    findAllToDto(data: GatewayLogs[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<GatewayLogResponseDto> {
        let entities = this.mapper.mapArray(data, GatewayLogs, GatewayLogResponseDto);
        return new GenericFindAllDomainResponse<GatewayLogResponseDto>(
            entities,
            page,
            count > (page * take) ? page + 1 : null,
            count,
            dataLength
        );
    }

    createFromSchema(entitySchema: GatewayLogs): GatewayLogResponseDto {
        return this.mapper.map(entitySchema, GatewayLogs, GatewayLogResponseDto);
    }

    create(data: CreateGatewayLogDto): DeepPartial<GatewayLogs> {
        return this.mapper.map(data, CreateGatewayLogDto, GatewayLogs);
    }
}
