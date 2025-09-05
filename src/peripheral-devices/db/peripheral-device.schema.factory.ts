import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { PeripheralDeviceResponseDto } from "../dto/peripheral-device-response.dto";
import { PeripheralDevices } from "./peripheral-device.entity";
import { PeripheralDeviceInterfaceSchemaFactory } from "../interface/peripheral-device.interface.schema.factory";
import { Mapper } from "@automapper/core";
import { CreatePeripheralDeviceDto } from "../dto/create-peripheral-device.dto";
import { DeepPartial } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";

@Injectable()
export class PeripheralDeviceSchemaFactory implements PeripheralDeviceInterfaceSchemaFactory {
    constructor(@InjectMapper() private readonly mapper: Mapper) { }

    findAllToDto(data: PeripheralDevices[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<PeripheralDeviceResponseDto> {
        let entities = this.mapper.mapArray(data, PeripheralDevices, PeripheralDeviceResponseDto);
        return new GenericFindAllDomainResponse<PeripheralDeviceResponseDto>(
            entities,
            page,
            count > (page * take) ? page + 1 : null,
            count,
            dataLength
        );
    }

    createFromSchema(entitySchema: PeripheralDevices): PeripheralDeviceResponseDto {
        return this.mapper.map(entitySchema, PeripheralDevices, PeripheralDeviceResponseDto);
    }

    create(data: CreatePeripheralDeviceDto): DeepPartial<PeripheralDevices> {
        return this.mapper.map(data, CreatePeripheralDeviceDto, PeripheralDevices);
    }
}
