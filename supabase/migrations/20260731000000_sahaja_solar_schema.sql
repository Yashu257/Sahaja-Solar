-- Sahaja Solar Energy Solutions - Initial Database Schema Migration
-- Compatible with Supabase / PostgreSQL

-- 1. Enable UUID Extension if not already available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Solar Quotes Table
CREATE TABLE IF NOT EXISTS solar_quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    property_type VARCHAR(50) NOT NULL DEFAULT 'residential',
    location VARCHAR(255) NOT NULL,
    monthly_bill NUMERIC(12, 2),
    interested_capacity_kw NUMERIC(8, 2),
    message TEXT,
    source VARCHAR(100) DEFAULT 'website_quote_section',
    calculator_context JSONB,
    conversation_summary TEXT,
    booking_id VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    admin_notes JSONB DEFAULT '[]'::jsonb,
    consent BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for searching and filtering quotes
CREATE INDEX IF NOT EXISTS idx_solar_quotes_phone ON solar_quotes(phone);
CREATE INDEX IF NOT EXISTS idx_solar_quotes_status ON solar_quotes(status);
CREATE INDEX IF NOT EXISTS idx_solar_quotes_created_at ON solar_quotes(created_at DESC);

-- 3. Solar Bookings Table
CREATE TABLE IF NOT EXISTS solar_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    property_type VARCHAR(50) NOT NULL DEFAULT 'residential',
    location VARCHAR(255) NOT NULL,
    monthly_bill NUMERIC(12, 2),
    interested_capacity_kw NUMERIC(8, 2),
    consultation_type VARCHAR(50) NOT NULL DEFAULT 'phone',
    requested_date DATE NOT NULL,
    requested_time VARCHAR(20) NOT NULL,
    timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Kolkata',
    status VARCHAR(50) NOT NULL DEFAULT 'pending_confirmation',
    source VARCHAR(100) DEFAULT 'website_booking_section',
    quote_id VARCHAR(50),
    conversation_summary TEXT,
    consent BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Double-Booking Prevention: Unique Constraint on Active Bookings
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_active_booking_slot 
ON solar_bookings (requested_date, requested_time) 
WHERE status != 'cancelled';

-- Index for querying bookings by date and phone
CREATE INDEX IF NOT EXISTS idx_solar_bookings_date ON solar_bookings(requested_date);
CREATE INDEX IF NOT EXISTS idx_solar_bookings_phone ON solar_bookings(phone);
CREATE INDEX IF NOT EXISTS idx_solar_bookings_status ON solar_bookings(status);

-- 4. Availability Configuration Table
CREATE TABLE IF NOT EXISTS availability_config (
    id INT PRIMARY KEY DEFAULT 1,
    timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Kolkata',
    working_days INT[] NOT NULL DEFAULT ARRAY[1, 2, 3, 4, 5, 6], -- Mon(1) to Sat(6)
    start_hour INT NOT NULL DEFAULT 9,
    end_hour INT NOT NULL DEFAULT 18,
    slot_duration_mins INT NOT NULL DEFAULT 60,
    minimum_notice_hours INT NOT NULL DEFAULT 4,
    maximum_advance_days INT NOT NULL DEFAULT 30,
    notification_email VARCHAR(255) NOT NULL DEFAULT 'sahajasolar@gmail.com',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Seed Initial Availability Configuration
INSERT INTO availability_config (id, timezone, working_days, start_hour, end_hour, slot_duration_mins, minimum_notice_hours, maximum_advance_days, notification_email)
VALUES (1, 'Asia/Kolkata', ARRAY[1, 2, 3, 4, 5, 6], 9, 18, 60, 4, 30, 'sahajasolar@gmail.com')
ON CONFLICT (id) DO NOTHING;

-- 5. Blocked Dates Table
CREATE TABLE IF NOT EXISTS blocked_dates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blocked_date DATE UNIQUE NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_solar_quotes_modtime ON solar_quotes;
CREATE TRIGGER update_solar_quotes_modtime
BEFORE UPDATE ON solar_quotes
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS update_solar_bookings_modtime ON solar_bookings;
CREATE TRIGGER update_solar_bookings_modtime
BEFORE UPDATE ON solar_bookings
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
