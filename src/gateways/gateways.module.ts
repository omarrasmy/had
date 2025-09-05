import { Module } from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { GatewaysController } from './gateways.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gateways } from './db/gateway.entity';
import { GatewayRepository } from './db/gateway.repository';
import { GatewaySchemaFactory } from './db/gateway.schema.factory';
import { GATEWAY_INTERFACE_REPOSITORY, GATEWAY_INTERFACE_SCHEMA_FACTORY } from './interface/gateway.tokens';
import { PeripheralDevices } from 'src/peripheral-devices/db/peripheral-device.entity';
import { GatewaysProfile } from 'src/automapper-profile/gateways.profile';

@Module({
    controllers: [GatewaysController],
    providers: [
        GatewaysService,
        { provide: GATEWAY_INTERFACE_REPOSITORY, useClass: GatewayRepository },
        { provide: GATEWAY_INTERFACE_SCHEMA_FACTORY, useClass: GatewaySchemaFactory },
        GatewaysProfile,
    ],
    imports: [
        TypeOrmModule.forFeature([Gateways, PeripheralDevices]),
    ],
    exports: [GatewaysService],
})
export class GatewaysModule { }
