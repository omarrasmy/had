import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { QueryFailedExceptionFilter } from './database/exception.filter';
import { RedisConfigModule } from './common/redis/redis.module';
import { DeviceTypesModule } from './device-types/device-types.module';
import { PeripheralDevicesModule } from './peripheral-devices/peripheral-devices.module';
import { GatewaysModule } from './gateways/gateways.module';
import { GatewayLogsModule } from './gateway-logs/gateway-logs.module';
@Module({
  imports: [
    DatabaseModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DeviceTypesModule,
    PeripheralDevicesModule,
    GatewaysModule,
    GatewayLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: QueryFailedExceptionFilter,
    },
  ],
})
export class AppModule { }
