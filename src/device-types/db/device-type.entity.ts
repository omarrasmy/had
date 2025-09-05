import { AutoMap } from "@automapper/classes";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";
import { Column, Entity, OneToMany } from "typeorm";
import { PeripheralDevices } from "src/peripheral-devices/db/peripheral-device.entity";

@Entity()
export class DeviceTypes extends IdentifiableEntitySchema {
    @AutoMap()
    @Column({ unique: true })
    name: string;

    @AutoMap()
    @Column({ type: 'text', nullable: true })
    description: string;

    @AutoMap()
    @OneToMany(() => PeripheralDevices, (device) => device.deviceType)
    devices: PeripheralDevices[];
}
