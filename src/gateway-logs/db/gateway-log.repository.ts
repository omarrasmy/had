import { GatewayLogs } from "./gateway-log.entity";
import { Repository } from "typeorm";
import { GatewayLogInterfaceRepository } from "../interface/gateway-log.interface.repository";
import { GatewayLogInterfaceSchemaFactory } from "../interface/gateway-log.interface.schema.factory";
import { GatewayLogResponseDto } from "../dto/gateway-log-response.dto";
import { EntityRepository } from "src/database/entity.repository";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GATEWAY_LOG_INTERFACE_SCHEMA_FACTORY } from "../interface/gateway-log.tokens";

@Injectable()
export class GatewayLogRepository extends EntityRepository<GatewayLogs, GatewayLogResponseDto> implements GatewayLogInterfaceRepository {
    constructor(
        @InjectRepository(GatewayLogs)
        protected readonly repository: Repository<GatewayLogs>,
        @Inject(GATEWAY_LOG_INTERFACE_SCHEMA_FACTORY)
        protected readonly entitySchemaFactory: GatewayLogInterfaceSchemaFactory,
    ) {
        super(repository, entitySchemaFactory);
    }

    async findByGatewayId(gatewayId: string): Promise<GatewayLogResponseDto[]> {
        const logs = await this.repository.find({
            where: { gatewayId },
            order: { createdAt: 'DESC' }
        });
        return logs.map(log => this.entitySchemaFactory.createFromSchema(log));
    }
}
