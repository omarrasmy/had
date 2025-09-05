import { PartialType, OmitType } from '@nestjs/swagger';
import { CreatePeripheralDeviceDto } from './create-peripheral-device.dto';

export class UpdatePeripheralDeviceDto extends PartialType(OmitType(CreatePeripheralDeviceDto, ['uid'] as const)) { }
