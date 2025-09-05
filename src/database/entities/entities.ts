import { DeviceTypes } from "src/device-types/db/device-type.entity";
import { PeripheralDevices } from "src/peripheral-devices/db/peripheral-device.entity";
import { Gateways } from "src/gateways/db/gateway.entity";
import { GatewayLogs } from "src/gateway-logs/db/gateway-log.entity";

const entities = {
  device_types: DeviceTypes,
  peripheral_devices: PeripheralDevices,
  gateways: Gateways,
  gateway_logs: GatewayLogs
};
export default entities;
