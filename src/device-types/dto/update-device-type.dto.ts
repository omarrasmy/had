import { PartialType } from '@nestjs/swagger';
import { CreateDeviceTypeDto } from './create-device-type.dto';

export class UpdateDeviceTypeDto extends PartialType(CreateDeviceTypeDto) { }
