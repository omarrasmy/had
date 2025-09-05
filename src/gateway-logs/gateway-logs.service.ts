import { Inject, Injectable } from '@nestjs/common';
import { CreateGatewayLogDto } from './dto/create-gateway-log.dto';
import { GatewayLogInterfaceRepository } from './interface/gateway-log.interface.repository';
import { GATEWAY_LOG_INTERFACE_REPOSITORY } from './interface/gateway-log.tokens';
import { GatewayLogResponseDto } from './dto/gateway-log-response.dto';

@Injectable()
export class GatewayLogsService {
    constructor(
        @Inject(GATEWAY_LOG_INTERFACE_REPOSITORY)
        private readonly gatewayLogRepository: GatewayLogInterfaceRepository,
    ) { }

    create(createGatewayLogDto: CreateGatewayLogDto): Promise<GatewayLogResponseDto> {
        return this.gatewayLogRepository.create(createGatewayLogDto);
    }

    findAll() {
        return this.gatewayLogRepository.findAll({ order: { createdAt: 'DESC' } });
    }

    findOne(id: string): Promise<GatewayLogResponseDto> {
        return this.gatewayLogRepository.findOne({ where: { id } });
    }

    findByGatewayId(gatewayId: string): Promise<GatewayLogResponseDto[]> {
        return this.gatewayLogRepository.findByGatewayId(gatewayId);
    }

    // Helper method to log gateway actions
    async logAction(gatewayId: string, action: string, details: Record<string, any>): Promise<GatewayLogResponseDto> {
        const logDto: CreateGatewayLogDto = {
            gatewayId,
            action,
            details
        };
        return this.create(logDto);
    }
}
