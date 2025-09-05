import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { DeviceTypeResponseDto } from "../dto/device-type-response.dto";
import { DeviceTypes } from "./device-type.entity";
import { DeviceTypeInterfaceSchemaFactory } from "../interface/device-type.interface.schema.factory";
import { Mapper } from "@automapper/core";
import { CreateDeviceTypeDto } from "../dto/create-device-type.dto";
import { DeepPartial } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";

@Injectable()
export class DeviceTypeSchemaFactory implements DeviceTypeInterfaceSchemaFactory {
    constructor(@InjectMapper() private readonly mapper: Mapper) { }

    findAllToDto(data: DeviceTypes[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<DeviceTypeResponseDto> {
        let entities = this.mapper.mapArray(data, DeviceTypes, DeviceTypeResponseDto);
        return new GenericFindAllDomainResponse<DeviceTypeResponseDto>(
            entities,
            page,
            count > (page * take) ? page + 1 : null,
            count,
            dataLength
        );
    }

    createFromSchema(entitySchema: DeviceTypes): DeviceTypeResponseDto {
        return this.mapper.map(entitySchema, DeviceTypes, DeviceTypeResponseDto);
    }

    create(data: CreateDeviceTypeDto): DeepPartial<DeviceTypes> {
        return this.mapper.map(data, CreateDeviceTypeDto, DeviceTypes);
    }
}
