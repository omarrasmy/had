import { Module } from '@nestjs/common';
import { DeviceTypesService } from './device-types.service';
import { DeviceTypesController } from './device-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceTypes } from './db/device-type.entity';
import { DeviceTypeRepository } from './db/device-type.repository';
import { DeviceTypeSchemaFactory } from './db/device-type.schema.factory';
import { DEVICE_TYPE_INTERFACE_REPOSITORY, DEVICE_TYPE_INTERFACE_SCHEMA_FACTORY } from './interface/device-type.tokens';
import { DeviceTypesProfile } from 'src/automapper-profile/device-types.profile';

@Module({
    controllers: [DeviceTypesController],
    providers: [
        DeviceTypesService,
        { provide: DEVICE_TYPE_INTERFACE_REPOSITORY, useClass: DeviceTypeRepository },
        { provide: DEVICE_TYPE_INTERFACE_SCHEMA_FACTORY, useClass: DeviceTypeSchemaFactory },
        DeviceTypesProfile,
    ],
    imports: [
        TypeOrmModule.forFeature([DeviceTypes]),
    ],
    exports: [DeviceTypesService],
})
export class DeviceTypesModule { }
