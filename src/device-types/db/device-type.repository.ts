import { DeviceTypes } from "./device-type.entity";
import { Repository } from "typeorm";
import { DeviceTypeInterfaceRepository } from "../interface/device-type.interface.repository";
import { DeviceTypeInterfaceSchemaFactory } from "../interface/device-type.interface.schema.factory";
import { DeviceTypeResponseDto } from "../dto/device-type-response.dto";
import { EntityRepository } from "src/database/entity.repository";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DEVICE_TYPE_INTERFACE_SCHEMA_FACTORY } from "../interface/device-type.tokens";

@Injectable()
export class DeviceTypeRepository extends EntityRepository<DeviceTypes, DeviceTypeResponseDto> implements DeviceTypeInterfaceRepository {
    constructor(
        @InjectRepository(DeviceTypes)
        protected readonly repository: Repository<DeviceTypes>,
        @Inject(DEVICE_TYPE_INTERFACE_SCHEMA_FACTORY)
        protected readonly entitySchemaFactory: DeviceTypeInterfaceSchemaFactory,
    ) {
        super(repository, entitySchemaFactory);
    }
}
