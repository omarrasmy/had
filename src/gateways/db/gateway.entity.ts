import { AutoMap } from "@automapper/classes";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";
import { Column, Entity, OneToMany } from "typeorm";
import { PeripheralDevices } from "src/peripheral-devices/db/peripheral-device.entity";
import { GatewayLogs } from "src/gateway-logs/db/gateway-log.entity";

export enum GatewayStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DECOMMISSIONED = 'decommissioned'
}

@Entity()
export class Gateways extends IdentifiableEntitySchema {
    @AutoMap()
    @Column({ unique: true, length: 100 })
    serialNumber: string;

    @AutoMap()
    @Column({ length: 255 })
    name: string;

    @AutoMap()
    @Column({ unique: true, length: 15 })
    ipv4Address: string;

    @AutoMap()
    @Column({
        type: 'enum',
        enum: GatewayStatus,
        default: GatewayStatus.INACTIVE
    })
    status: GatewayStatus;

    @AutoMap()
    @Column({ length: 500, nullable: true })
    location: string;

    @AutoMap()
    @OneToMany(() => PeripheralDevices, (device) => device.gateway, { cascade: true })
    devices: PeripheralDevices[];

    @AutoMap()
    @OneToMany(() => GatewayLogs, (log) => log.gateway, { cascade: true })
    logs: GatewayLogs[];
}
