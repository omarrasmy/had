import { Module } from '@nestjs/common';
import { PeripheralDevicesService } from './peripheral-devices.service';
import { PeripheralDevicesController } from './peripheral-devices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeripheralDevices } from './db/peripheral-device.entity';
import { PeripheralDeviceRepository } from './db/peripheral-device.repository';
import { PeripheralDeviceSchemaFactory } from './db/peripheral-device.schema.factory';
import { PERIPHERAL_DEVICE_INTERFACE_REPOSITORY, PERIPHERAL_DEVICE_INTERFACE_SCHEMA_FACTORY } from './interface/peripheral-device.tokens';
import { PeripheralDevicesProfile } from 'src/automapper-profile/peripheral-devices.profile';

@Module({
    controllers: [PeripheralDevicesController],
    providers: [
        PeripheralDevicesService,
        { provide: PERIPHERAL_DEVICE_INTERFACE_REPOSITORY, useClass: PeripheralDeviceRepository },
        { provide: PERIPHERAL_DEVICE_INTERFACE_SCHEMA_FACTORY, useClass: PeripheralDeviceSchemaFactory },
        PeripheralDevicesProfile,
    ],
    imports: [
        TypeOrmModule.forFeature([PeripheralDevices]),
    ],
    exports: [PeripheralDevicesService],
})
export class PeripheralDevicesModule { }
