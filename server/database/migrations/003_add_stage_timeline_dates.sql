-- Migration: Add individual stage timeline dates
-- Replaces timeline_start_date and timeline_end_date with 6 specific milestone dates

-- Add new timeline columns
ALTER TABLE initiatives ADD COLUMN idea_date DATETIME;
ALTER TABLE initiatives ADD COLUMN concept_date DATETIME;
ALTER TABLE initiatives ADD COLUMN project_start_date DATETIME;
ALTER TABLE initiatives ADD COLUMN development_date DATETIME;
ALTER TABLE initiatives ADD COLUMN deployment_date DATETIME;
ALTER TABLE initiatives ADD COLUMN completion_date DATETIME;

-- Note: In SQLite, we cannot drop columns directly
-- The old timeline_start_date and timeline_end_date columns will remain but be unused
-- In a production environment, you would create a new table and migrate data
