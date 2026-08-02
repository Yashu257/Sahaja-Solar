-- Setup Default Availability Configuration for Sahaja Solar
-- Run this in your Supabase SQL Editor

-- Insert default availability configuration
INSERT INTO availability_config (
  start_hour,
  end_hour,
  lunch_break_start,
  lunch_break_end,
  working_days,
  minimum_notice_hours,
  is_active
) VALUES (
  9,           -- Start at 9 AM
  18,          -- End at 6 PM
  13,          -- Lunch break starts at 1 PM
  14,          -- Lunch break ends at 2 PM
  ARRAY[1, 2, 3, 4, 5, 6], -- Monday to Saturday (0=Sunday, 1=Monday... 6=Saturday)
  2,           -- Minimum 2 hours notice required
  true         -- This config is active
)
ON CONFLICT DO NOTHING;

-- Verify the configuration was created
SELECT * FROM availability_config WHERE is_active = true;
