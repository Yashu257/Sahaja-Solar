-- Enable API access for all tables by granting permissions
-- This is required for the REST API to work

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Grant all permissions to service_role (our API key)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Enable Row Level Security but allow service_role to bypass it
ALTER TABLE solar_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE solar_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

-- Create policies that allow service_role full access
CREATE POLICY "Service role has full access" ON solar_quotes 
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access" ON solar_bookings 
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access" ON availability_config 
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access" ON blocked_dates 
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Verify tables are accessible
SELECT tablename FROM pg_tables WHERE schemaname = 'public' 
  AND tablename IN ('solar_quotes', 'solar_bookings', 'availability_config', 'blocked_dates');
