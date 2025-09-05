import { MigrationInterface, QueryRunner } from "typeorm";

export class GatewaySystem1757096672983 implements MigrationInterface {
    name = 'GatewaySystem1757096672983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gateway_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "gatewayId" uuid NOT NULL, "action" character varying(100) NOT NULL, "details" jsonb NOT NULL, CONSTRAINT "PK_1db20ff30ebaa48cc770037a216" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."gateways_status_enum" AS ENUM('active', 'inactive', 'decommissioned')`);
        await queryRunner.query(`CREATE TABLE "gateways" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "serialNumber" character varying(100) NOT NULL, "name" character varying(255) NOT NULL, "ipv4Address" character varying(15) NOT NULL, "status" "public"."gateways_status_enum" NOT NULL DEFAULT 'inactive', "location" character varying(500), CONSTRAINT "UQ_b83ffc250a4ea167e4ec9e40e5f" UNIQUE ("serialNumber"), CONSTRAINT "UQ_67958bd85b46304fd98591ef173" UNIQUE ("ipv4Address"), CONSTRAINT "PK_b53153080a6907017cf44cb7f58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."peripheral_devices_status_enum" AS ENUM('online', 'offline', 'maintenance')`);
        await queryRunner.query(`CREATE TABLE "peripheral_devices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "uid" bigint NOT NULL, "vendor" character varying NOT NULL, "status" "public"."peripheral_devices_status_enum" NOT NULL DEFAULT 'offline', "lastSeenAt" TIMESTAMP, "gatewayId" uuid, "deviceTypeId" uuid NOT NULL, CONSTRAINT "UQ_d1ff54d1ac98440ad002d0c1a50" UNIQUE ("uid"), CONSTRAINT "CHK_7e908fd2a8c32c98dc1588a113" CHECK ("uid" > 0), CONSTRAINT "PK_b1eabcaf7504a7c6e00b8d4a1dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "device_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text, CONSTRAINT "UQ_755591f9e972996061e1e90eb38" UNIQUE ("name"), CONSTRAINT "PK_c22e8985afe8ffe3ee485e41af8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "gateway_logs" ADD CONSTRAINT "FK_7b383d520d4f272903433264abc" FOREIGN KEY ("gatewayId") REFERENCES "gateways"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "peripheral_devices" ADD CONSTRAINT "FK_cb051ebcc20eeaf6a01563c06b0" FOREIGN KEY ("gatewayId") REFERENCES "gateways"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "peripheral_devices" ADD CONSTRAINT "FK_8ee555ee5460907f4fbec6eda5e" FOREIGN KEY ("deviceTypeId") REFERENCES "device_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "peripheral_devices" DROP CONSTRAINT "FK_8ee555ee5460907f4fbec6eda5e"`);
        await queryRunner.query(`ALTER TABLE "peripheral_devices" DROP CONSTRAINT "FK_cb051ebcc20eeaf6a01563c06b0"`);
        await queryRunner.query(`ALTER TABLE "gateway_logs" DROP CONSTRAINT "FK_7b383d520d4f272903433264abc"`);
        await queryRunner.query(`DROP TABLE "device_types"`);
        await queryRunner.query(`DROP TABLE "peripheral_devices"`);
        await queryRunner.query(`DROP TYPE "public"."peripheral_devices_status_enum"`);
        await queryRunner.query(`DROP TABLE "gateways"`);
        await queryRunner.query(`DROP TYPE "public"."gateways_status_enum"`);
        await queryRunner.query(`DROP TABLE "gateway_logs"`);
    }

}
