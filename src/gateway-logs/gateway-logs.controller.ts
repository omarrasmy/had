import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { GatewayLogsService } from './gateway-logs.service';
import { CreateGatewayLogDto } from './dto/create-gateway-log.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GatewayLogResponseDto } from './dto/gateway-log-response.dto';

@ApiTags('Gateway Logs')
@Controller('gateway-logs')
export class GatewayLogsController {
    constructor(private readonly gatewayLogsService: GatewayLogsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new gateway log entry' })
    @ApiResponse({ status: 201, description: 'Gateway log created successfully', type: GatewayLogResponseDto })
    create(@Body() createGatewayLogDto: CreateGatewayLogDto) {
        return this.gatewayLogsService.create(createGatewayLogDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all gateway logs' })
    @ApiResponse({ status: 200, description: 'Gateway logs retrieved successfully' })
    findAll() {
        return this.gatewayLogsService.findAll();
    }

    @Get('gateway/:gatewayId')
    @ApiOperation({ summary: 'Get logs for a specific gateway' })
    @ApiParam({ name: 'gatewayId', description: 'Gateway ID' })
    @ApiResponse({ status: 200, description: 'Gateway logs retrieved successfully' })
    findByGatewayId(@Param('gatewayId', ParseUUIDPipe) gatewayId: string) {
        return this.gatewayLogsService.findByGatewayId(gatewayId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a gateway log by ID' })
    @ApiParam({ name: 'id', description: 'Gateway log ID' })
    @ApiResponse({ status: 200, description: 'Gateway log retrieved successfully', type: GatewayLogResponseDto })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.gatewayLogsService.findOne(id);
    }
}
