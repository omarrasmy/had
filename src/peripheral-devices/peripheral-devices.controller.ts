import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PeripheralDevicesService } from './peripheral-devices.service';
import { CreatePeripheralDeviceDto } from './dto/create-peripheral-device.dto';
import { UpdatePeripheralDeviceDto } from './dto/update-peripheral-device.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PeripheralDeviceResponseDto } from './dto/peripheral-device-response.dto';

@ApiTags('Peripheral Devices')
@Controller('peripheral-devices')
export class PeripheralDevicesController {
    constructor(private readonly peripheralDevicesService: PeripheralDevicesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new peripheral device' })
    @ApiResponse({ status: 201, description: 'Peripheral device created successfully', type: PeripheralDeviceResponseDto })
    create(@Body() createPeripheralDeviceDto: CreatePeripheralDeviceDto) {
        return this.peripheralDevicesService.create(createPeripheralDeviceDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all peripheral devices' })
    @ApiResponse({ status: 200, description: 'Peripheral devices retrieved successfully' })
    findAll() {
        return this.peripheralDevicesService.findAll();
    }

    @Get('orphans')
    @ApiOperation({ summary: 'Get all orphan devices (devices without gateway)' })
    @ApiResponse({ status: 200, description: 'Orphan devices retrieved successfully' })
    findOrphanDevices() {
        return this.peripheralDevicesService.findOrphanDevices();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a peripheral device by ID' })
    @ApiParam({ name: 'id', description: 'Peripheral device ID' })
    @ApiResponse({ status: 200, description: 'Peripheral device retrieved successfully', type: PeripheralDeviceResponseDto })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.peripheralDevicesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a peripheral device' })
    @ApiParam({ name: 'id', description: 'Peripheral device ID' })
    @ApiResponse({ status: 200, description: 'Peripheral device updated successfully', type: PeripheralDeviceResponseDto })
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePeripheralDeviceDto: UpdatePeripheralDeviceDto) {
        return this.peripheralDevicesService.update(id, updatePeripheralDeviceDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a peripheral device' })
    @ApiParam({ name: 'id', description: 'Peripheral device ID' })
    @ApiResponse({ status: 200, description: 'Peripheral device deleted successfully' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.peripheralDevicesService.remove(id);
    }
}
