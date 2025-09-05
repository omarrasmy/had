import { AutoMap } from "@automapper/classes";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";
import { Column, Entity, ManyToOne, JoinColumn, Check } from "typeorm";
import { DeviceTypes } from "src/device-types/db/device-type.entity";
import { Gateways } from "src/gateways/db/gateway.entity";

export enum DeviceStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
    MAINTENANCE = 'maintenance'
}

@Entity()
@Check(`"uid" > 0`)
export class PeripheralDevices extends IdentifiableEntitySchema {
    @AutoMap()
    @Column({ type: 'bigint', unique: true })
    uid: number;

    @AutoMap()
    @Column()
    vendor: string;

    @AutoMap()
    @Column({
        type: 'enum',
        enum: DeviceStatus,
        default: DeviceStatus.OFFLINE
    })
    status: DeviceStatus;

    @AutoMap()
    @Column({ type: 'timestamp', nullable: true })
    lastSeenAt: Date;

    @AutoMap()
    @Column({ type: 'uuid', nullable: true })
    gatewayId: string;

    @AutoMap()
    @Column({ type: 'uuid' })
    deviceTypeId: string;

    @AutoMap()
    @ManyToOne(() => Gateways, (gateway) => gateway.devices, { nullable: true })
    @JoinColumn({ name: 'gatewayId' })
    gateway: Gateways;

    @AutoMap()
    @ManyToOne(() => DeviceTypes, (deviceType) => deviceType.devices, { eager: true })
    @JoinColumn({ name: 'deviceTypeId' })
    deviceType: DeviceTypes;
}
