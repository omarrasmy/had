import { Module } from '@nestjs/common';
import { GatewayLogsService } from './gateway-logs.service';
import { GatewayLogsController } from './gateway-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayLogs } from './db/gateway-log.entity';
import { GatewayLogRepository } from './db/gateway-log.repository';
import { GatewayLogSchemaFactory } from './db/gateway-log.schema.factory';
import { GATEWAY_LOG_INTERFACE_REPOSITORY, GATEWAY_LOG_INTERFACE_SCHEMA_FACTORY } from './interface/gateway-log.tokens';
import { GatewayLogsProfile } from 'src/automapper-profile/gateway-logs.profile';

@Module({
    controllers: [GatewayLogsController],
    providers: [
        GatewayLogsService,
        { provide: GATEWAY_LOG_INTERFACE_REPOSITORY, useClass: GatewayLogRepository },
        { provide: GATEWAY_LOG_INTERFACE_SCHEMA_FACTORY, useClass: GatewayLogSchemaFactory },
        GatewayLogsProfile,
    ],
    imports: [
        TypeOrmModule.forFeature([GatewayLogs]),
    ],
    exports: [GatewayLogsService],
})
export class GatewayLogsModule { }
