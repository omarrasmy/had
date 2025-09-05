import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { GatewaysService, GatewayDeletionMode } from './gateways.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GatewayResponseDto } from './dto/gateway-response.dto';

@ApiTags('Gateways')
@Controller('gateways')
export class GatewaysController {
    constructor(private readonly gatewaysService: GatewaysService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new gateway' })
    @ApiResponse({ status: 201, description: 'Gateway created successfully', type: GatewayResponseDto })
    create(@Body() createGatewayDto: CreateGatewayDto) {
        return this.gatewaysService.create(createGatewayDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all gateways with their devices' })
    @ApiResponse({ status: 200, description: 'Gateways retrieved successfully' })
    findAll() {
        return this.gatewaysService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get gateway details with devices' })
    @ApiParam({ name: 'id', description: 'Gateway ID' })
    @ApiResponse({ status: 200, description: 'Gateway retrieved successfully', type: GatewayResponseDto })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.gatewaysService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update gateway details (serial number cannot be changed)' })
    @ApiParam({ name: 'id', description: 'Gateway ID' })
    @ApiResponse({ status: 200, description: 'Gateway updated successfully', type: GatewayResponseDto })
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateGatewayDto: UpdateGatewayDto) {
        return this.gatewaysService.update(id, updateGatewayDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete gateway (with option to orphan or cascade delete devices)' })
    @ApiParam({ name: 'id', description: 'Gateway ID' })
    @ApiQuery({
        name: 'mode',
        enum: GatewayDeletionMode,
        required: false,
        description: 'Deletion mode: orphan devices or cascade delete'
    })
    @ApiResponse({ status: 200, description: 'Gateway deleted successfully' })
    remove(
        @Param('id', ParseUUIDPipe) id: string,
        @Query('mode') mode: GatewayDeletionMode = GatewayDeletionMode.ORPHAN_DEVICES
    ) {
        return this.gatewaysService.remove(id, mode);
    }

    @Post(':id/devices')
    @ApiOperation({ summary: 'Attach a device to a gateway' })
    @ApiParam({ name: 'id', description: 'Gateway ID' })
    @ApiResponse({ status: 200, description: 'Device attached successfully', type: GatewayResponseDto })
    attachDevice(
        @Param('id', ParseUUIDPipe) gatewayId: string,
        @Body('deviceId', ParseUUIDPipe) deviceId: string
    ) {
        return this.gatewaysService.attachDevice(gatewayId, deviceId);
    }

    @Delete(':id/devices/:deviceId')
    @ApiOperation({ summary: 'Remove a device from a gateway' })
    @ApiParam({ name: 'id', description: 'Gateway ID' })
    @ApiParam({ name: 'deviceId', description: 'Device ID' })
    @ApiResponse({ status: 200, description: 'Device removed successfully', type: GatewayResponseDto })
    detachDevice(
        @Param('id', ParseUUIDPipe) gatewayId: string,
        @Param('deviceId', ParseUUIDPipe) deviceId: string
    ) {
        return this.gatewaysService.detachDevice(gatewayId, deviceId);
    }
}
