import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DeviceTypesService } from './device-types.service';
import { CreateDeviceTypeDto } from './dto/create-device-type.dto';
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DeviceTypeResponseDto } from './dto/device-type-response.dto';

@ApiTags('Device Types')
@Controller('device-types')
export class DeviceTypesController {
    constructor(private readonly deviceTypesService: DeviceTypesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new device type' })
    @ApiResponse({ status: 201, description: 'Device type created successfully', type: DeviceTypeResponseDto })
    create(@Body() createDeviceTypeDto: CreateDeviceTypeDto) {
        return this.deviceTypesService.create(createDeviceTypeDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all device types' })
    @ApiResponse({ status: 200, description: 'Device types retrieved successfully' })
    findAll() {
        return this.deviceTypesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a device type by ID' })
    @ApiParam({ name: 'id', description: 'Device type ID' })
    @ApiResponse({ status: 200, description: 'Device type retrieved successfully', type: DeviceTypeResponseDto })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.deviceTypesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a device type' })
    @ApiParam({ name: 'id', description: 'Device type ID' })
    @ApiResponse({ status: 200, description: 'Device type updated successfully', type: DeviceTypeResponseDto })
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDeviceTypeDto: UpdateDeviceTypeDto) {
        return this.deviceTypesService.update(id, updateDeviceTypeDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a device type' })
    @ApiParam({ name: 'id', description: 'Device type ID' })
    @ApiResponse({ status: 200, description: 'Device type deleted successfully' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.deviceTypesService.remove(id);
    }
}
