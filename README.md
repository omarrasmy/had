# HAD (Hardware and Device) Management System

> A comprehensive REST API service for managing gateways and their peripheral devices with enterprise-grade architecture.

## 🏗️ **Architecture Overview**

The HAD system is a NestJS-based REST API that manages gateways (master devices) and their associated peripheral devices. Built with modern TypeScript patterns, enterprise-level validation, and comprehensive business rule enforcement.

### **Key Features**
- ✅ **Gateway Management** - Complete CRUD operations for gateway devices
- ✅ **Peripheral Device Management** - Device lifecycle management with type categorization
- ✅ **Device Attachment System** - Flexible device-to-gateway relationships
- ✅ **Business Rule Enforcement** - Maximum 10 devices per gateway, unique constraints
- ✅ **Audit Logging** - Comprehensive gateway action logging
- ✅ **UUID-Based Architecture** - All entities use UUID for scalability
- ✅ **Docker Containerization** - Production-ready deployment
- ✅ **PostgreSQL Database** - Robust data persistence with migrations
- ✅ **Custom Validation** - IPv4, Serial Number, and UID validation
- ✅ **OpenAPI Documentation** - Auto-generated Swagger documentation

## 📊 **Data Model**

### **Core Entities**

#### **🔌 Device Types**
```typescript
{
  id: string (UUID)           // Primary key
  name: string               // Unique name (e.g., "sensor", "actuator")
  description?: string       // Optional description
  createdAt: Date           // Auto-generated
  updatedAt: Date          // Auto-updated
}
```

#### **📱 Peripheral Devices**
```typescript
{
  id: string (UUID)           // Primary key
  uid: number                // Globally unique device identifier
  vendor: string            // Device manufacturer
  status: DeviceStatus      // online | offline | maintenance
  lastSeenAt?: Date        // Last communication timestamp
  gatewayId?: string       // Optional gateway association (UUID)
  deviceTypeId: string     // Device type reference (UUID)
  createdAt: Date         // Auto-generated
  updatedAt: Date        // Auto-updated
}
```

#### **🌐 Gateways**
```typescript
{
  id: string (UUID)           // Primary key
  serialNumber: string       // Unique, immutable identifier
  name: string              // Gateway display name
  ipv4Address: string       // Unique IPv4 address
  status: GatewayStatus     // active | inactive | decommissioned
  location?: string         // Optional physical location
  createdAt: Date          // Auto-generated
  updatedAt: Date         // Auto-updated
}
```

#### **📋 Gateway Logs**
```typescript
{
  id: string (UUID)           // Primary key
  gatewayId: string          // Gateway reference
  action: string            // Action performed (e.g., "DEVICE_ATTACHED")
  details: object           // JSONB details
  createdAt: Date          // Auto-generated
}
```

## 🚀 **Quick Start**

### **Prerequisites**
- Docker & Docker Compose
- Node.js 20+ (for local development)

### **1. Clone & Setup**
```bash
git clone <repository-url>
cd had
```

### **2. Environment Configuration**
Create environment files:

**.development.env**
```env
NODE_ENV=development
TYPEORM_HOST=localhost
TYPEORM_PORT=5433
TYPEORM_DATABASE=had
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=rasmy4535
SALT=10
```

**.production.env**
```env
NODE_ENV=production
TYPEORM_HOST=postgres
TYPEORM_PORT=5432
TYPEORM_DATABASE=had
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=rasmy4535
SALT=10
```

### **3. Run with Docker**
```bash
# Start the complete system
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs app
```

### **4. Access the API**
- **Application**: http://localhost:8080
- **Swagger Documentation**: http://localhost:8080/had-swagger-docs
- **PostgreSQL**: localhost:5433

## 🔗 **API Endpoints**

### **Device Types Management**
```http
POST   /device-types          # Create device type
GET    /device-types          # List all device types
GET    /device-types/:id      # Get device type details
PATCH  /device-types/:id      # Update device type
DELETE /device-types/:id      # Delete device type
```

### **Peripheral Devices Management**
```http
POST   /peripheral-devices              # Create device
GET    /peripheral-devices              # List all devices
GET    /peripheral-devices/orphans      # Get unassigned devices
GET    /peripheral-devices/:id          # Get device details
PATCH  /peripheral-devices/:id          # Update device
DELETE /peripheral-devices/:id          # Delete device
```

### **Gateway Management**
```http
POST   /gateways                        # Create gateway
GET    /gateways                        # List all gateways with devices
GET    /gateways/:id                    # Get gateway details
PATCH  /gateways/:id                    # Update gateway (serial immutable)
DELETE /gateways/:id                    # Delete gateway
```

### **Device-Gateway Association**
```http
POST   /gateways/:id/devices            # Attach device to gateway
DELETE /gateways/:id/devices/:deviceId  # Detach device from gateway
```

### **Gateway Logs**
```http
POST   /gateway-logs                    # Create log entry
GET    /gateway-logs                    # Get all logs
GET    /gateway-logs/gateway/:id        # Get logs for specific gateway
GET    /gateway-logs/:id                # Get specific log entry
```

## 🔒 **Business Rules & Validation**

### **Gateway Constraints**
- ✅ **Serial Number**: Immutable after creation, alphanumeric 6-50 chars
- ✅ **IPv4 Address**: Must be valid IPv4 format and unique
- ✅ **Device Limit**: Maximum 10 devices per gateway
- ✅ **Unique Fields**: Serial number and IP address globally unique

### **Device Constraints**
- ✅ **Global UID**: Device UID must be globally unique across all devices
- ✅ **Positive UID**: Device UID must be a positive number
- ✅ **Gateway Association**: Optional, allows orphan devices

### **Custom Validators**
- **IPv4 Validation**: `@IsIPv4()` - Validates IPv4 address format
- **Serial Number**: `@IsSerialNumber()` - Alphanumeric with hyphens/underscores
- **UID Validation**: Positive number validation with uniqueness check

## 🗄️ **Database Operations**

### **Run Migrations**
```bash
# Generate new migration
npm run typeorm:migrate --name=MigrationName

# Run pending migrations
npm run typeorm:run

# Revert last migration
npm run typeorm:revert
```

### **Database Schema**
The system uses PostgreSQL with the following key features:
- **UUID Extensions**: Automatic UUID generation
- **JSONB Support**: Flexible log details storage
- **Foreign Key Constraints**: Data integrity enforcement
- **Unique Constraints**: Business rule enforcement
- **Enum Types**: Status field validation

## 🏛️ **Architecture Patterns**

### **Repository Pattern**
```typescript
// Interface abstraction
interface IEntityRepository<TSchema, TEntity> {
  findAll(options: FindOptions): Promise<GenericResponse<TEntity>>;
  findOne(options: FindOptions): Promise<TEntity>;
  create(entity: object): Promise<TEntity>;
  update(id: string, entity: object): Promise<TEntity>;
  delete(id: string): Promise<DeleteResult>;
}

// Implementation
class EntityRepository<TSchema, TEntity> implements IEntityRepository<TSchema, TEntity> {
  // Generic CRUD implementation
}
```

### **Schema Factory Pattern**
```typescript
interface IEntitySchemaFactory<TSchema, TEntity> {
  createFromSchema(schema: TSchema): TEntity;
  create(data: object): DeepPartial<TSchema>;
  findAllToDto(data: TSchema[], ...): GenericResponse<TEntity>;
}
```

### **Module Structure**
Each feature follows a consistent structure:
```
feature-name/
├── db/
│   ├── feature.entity.ts      # TypeORM entity
│   ├── feature.repository.ts  # Repository implementation
│   └── feature.schema.factory.ts
├── dto/
│   ├── create-feature.dto.ts  # Input validation
│   ├── update-feature.dto.ts  # Update validation
│   └── feature-response.dto.ts # Response formatting
├── interface/
│   ├── feature.tokens.ts      # DI tokens
│   ├── feature.interface.repository.ts
│   └── feature.interface.schema.factory.ts
├── feature.controller.ts      # REST endpoints
├── feature.service.ts         # Business logic
└── feature.module.ts         # NestJS module
```

## 🐳 **Docker Configuration**

### **Multi-Container Setup**
```yaml
services:
  app:                    # NestJS Application
    - Port: 8080
    - Environment: Production-ready
    - Depends on: PostgreSQL
    
  postgres:              # PostgreSQL Database
    - Port: 5433 (external)
    - Version: 15
    - Persistent Volume
```

### **Development Commands**
```bash
# Development with auto-reload
docker-compose up -d postgres
npm run start:dev

# Production deployment
docker-compose up -d

# Database only
docker-compose up -d postgres

# Rebuild after changes
docker-compose build --no-cache
```

## 🛠️ **Development Tools**

### **Code Quality**
```bash
npm run lint          # ESLint checking
npm run format        # Prettier formatting
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
```

### **AutoMapper Integration**
The system uses AutoMapper for object transformation:
```typescript
@Profile()
export class FeatureProfile extends AutomapperProfile {
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Entity, ResponseDto);
      createMap(mapper, CreateDto, Entity);
    };
  }
}
```

## 📝 **Error Handling**

### **Validation Errors**
- **400 Bad Request**: Invalid input data, business rule violations
- **404 Not Found**: Entity not found
- **409 Conflict**: Unique constraint violations

### **Business Logic Errors**
- **Device Limit**: "Gateway cannot have more than 10 devices"
- **Unique UID**: "Device UID must be globally unique"
- **Immutable Serial**: "Serial number cannot be changed after creation"

## 🔄 **Gateway Deletion Options**

The system provides flexible gateway deletion strategies:

```typescript
enum GatewayDeletionMode {
  ORPHAN_DEVICES = 'orphan',    // Set device.gatewayId = NULL
  CASCADE_DELETE = 'cascade'     // Delete associated devices
}

// Usage
DELETE /gateways/:id?mode=orphan    // Default: orphan devices
DELETE /gateways/:id?mode=cascade   // Delete devices too
```

## 📊 **Monitoring & Logging**

### **Application Logs**
- **Startup Logs**: Module initialization
- **Route Mapping**: Endpoint registration
- **Database Queries**: TypeORM query logging (configurable)

### **Gateway Action Logging**
Automatic logging of gateway operations:
```typescript
// Logged actions
- GATEWAY_CREATED
- GATEWAY_UPDATED
- DEVICE_ATTACHED
- DEVICE_DETACHED
- GATEWAY_DELETED
```

## 🚀 **Production Deployment**

### **Environment Variables**
```env
NODE_ENV=production
TYPEORM_HOST=your-postgres-host
TYPEORM_PORT=5432
TYPEORM_DATABASE=had_production
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=your-secure-password
SALT=12
```

### **Production Checklist**
- ✅ Set secure database credentials
- ✅ Configure appropriate SALT rounds
- ✅ Set up database backups
- ✅ Configure log aggregation
- ✅ Set up monitoring alerts
- ✅ Configure reverse proxy (nginx)
- ✅ Set up SSL certificates

## 🤝 **Contributing**

### **Code Standards**
- Follow NestJS best practices
- Use TypeScript strict mode
- Implement comprehensive validation
- Write unit tests for business logic
- Document API endpoints with Swagger

### **Git Workflow**
```bash
# Feature development
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

## 📄 **License**

This project is licensed under the UNLICENSED license.

---

## 🎯 **Summary**

The HAD (Hardware and Device) Management System provides a robust, scalable solution for managing IoT gateway devices and their peripheral components. Built with enterprise patterns, comprehensive validation, and production-ready deployment configurations.

**Key Highlights:**
- 🏗️ **Clean Architecture** - Repository pattern, dependency injection
- 🔒 **Data Integrity** - Comprehensive validation and constraints
- 🚀 **Scalable Design** - UUID-based, Docker containerized
- 📝 **Developer Experience** - Auto-generated docs, type safety
- 🛡️ **Production Ready** - Error handling, logging, monitoring

For questions or support, please refer to the API documentation at `/api` when the application is running.