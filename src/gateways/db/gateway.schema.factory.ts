import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { GatewayResponseDto } from "../dto/gateway-response.dto";
import { Gateways } from "./gateway.entity";
import { GatewayInterfaceSchemaFactory } from "../interface/gateway.interface.schema.factory";
import { Mapper } from "@automapper/core";
import { CreateGatewayDto } from "../dto/create-gateway.dto";
import { DeepPartial } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";

@Injectable()
export class GatewaySchemaFactory implements GatewayInterfaceSchemaFactory {
    constructor(@InjectMapper() private readonly mapper: Mapper) { }

    findAllToDto(data: Gateways[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<GatewayResponseDto> {
        let entities = this.mapper.mapArray(data, Gateways, GatewayResponseDto);
        return new GenericFindAllDomainResponse<GatewayResponseDto>(
            entities,
            page,
            count > (page * take) ? page + 1 : null,
            count,
            dataLength
        );
    }

    createFromSchema(entitySchema: Gateways): GatewayResponseDto {
        return this.mapper.map(entitySchema, Gateways, GatewayResponseDto);
    }

    create(data: CreateGatewayDto): DeepPartial<Gateways> {
        return this.mapper.map(data, CreateGatewayDto, Gateways);
    }
}
