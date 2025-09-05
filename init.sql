-- ./init.sql for PostgreSQL
-- Database initialization for the HAD (Hardware and Device) management system

-- Enable UUID extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- The database 'had' is already created by docker-compose
-- This file can be used for additional initialization if needed