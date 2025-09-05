import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateGatewayDto } from './create-gateway.dto';

export class UpdateGatewayDto extends PartialType(OmitType(CreateGatewayDto, ['serialNumber'] as const)) { }
