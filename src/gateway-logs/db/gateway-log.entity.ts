import { AutoMap } from "@automapper/classes";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";
import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Gateways } from "src/gateways/db/gateway.entity";

@Entity()
export class GatewayLogs extends IdentifiableEntitySchema {

    @AutoMap()
    @Column({ type: 'uuid' })
    gatewayId: string;

    @AutoMap()
    @Column({ length: 100 })
    action: string;

    @AutoMap()
    @Column({ type: 'jsonb' })
    details: Record<string, any>;

    @AutoMap()
    @ManyToOne(() => Gateways, (gateway) => gateway.logs)
    @JoinColumn({ name: 'gatewayId' })
    gateway: Gateways;
}
