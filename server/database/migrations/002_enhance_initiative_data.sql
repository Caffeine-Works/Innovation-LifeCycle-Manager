-- Migration: Enhance Initiative Data Model
-- Adds comprehensive tracking fields, attachments, and contacts
-- Date: 2025-11-07

-- =============================================================================
-- Step 1: Add new columns to initiatives table
-- =============================================================================

-- Business Owner Information
ALTER TABLE initiatives ADD COLUMN business_owner_name TEXT;
ALTER TABLE initiatives ADD COLUMN business_owner_function TEXT CHECK(business_owner_function IN ('MFG & SCM', 'R&D', 'M&S', 'SF', 'AS', 'PP', 'MI', 'G&A', 'IT'));
ALTER TABLE initiatives ADD COLUMN business_owner_department TEXT; -- 3-letter code

-- IT Owner Information (separate from business owner)
ALTER TABLE initiatives ADD COLUMN it_owner_name TEXT;
ALTER TABLE initiatives ADD COLUMN it_owner_department TEXT; -- 3-letter code

-- Priority/Criticality
ALTER TABLE initiatives ADD COLUMN priority TEXT CHECK(priority IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW'));

-- Extended Description
ALTER TABLE initiatives ADD COLUMN detailed_description TEXT;

-- Timeline
ALTER TABLE initiatives ADD COLUMN timeline_start_date DATETIME;
ALTER TABLE initiatives ADD COLUMN timeline_end_date DATETIME;

-- =============================================================================
-- Step 2: Create initiative_attachments table
-- =============================================================================

CREATE TABLE IF NOT EXISTS initiative_attachments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  initiative_id INTEGER NOT NULL,
  attachment_type TEXT NOT NULL CHECK(attachment_type IN ('IMAGE', 'VIDEO', 'DOCUMENT', 'LINK')),
  file_path TEXT, -- For local uploads
  external_url TEXT, -- For cloud links
  storage_provider TEXT CHECK(storage_provider IN ('LOCAL', 'ONEDRIVE', 'SHAREPOINT', 'GENERIC')),
  filename TEXT,
  file_size INTEGER, -- In bytes
  mime_type TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER,

  FOREIGN KEY (initiative_id) REFERENCES initiatives(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Indexes for faster queries
CREATE INDEX idx_attachments_initiative ON initiative_attachments(initiative_id);
CREATE INDEX idx_attachments_type ON initiative_attachments(attachment_type);

-- =============================================================================
-- Step 3: Create initiative_contacts table
-- =============================================================================

CREATE TABLE IF NOT EXISTS initiative_contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  initiative_id INTEGER NOT NULL,
  contact_name TEXT NOT NULL,
  contact_role TEXT, -- e.g., "Stakeholder", "Technical Lead", etc.
  contact_email TEXT,
  contact_phone TEXT,
  is_primary INTEGER DEFAULT 0, -- Boolean: 1 for primary contact, 0 otherwise
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (initiative_id) REFERENCES initiatives(id) ON DELETE CASCADE
);

-- Indexes for faster queries
CREATE INDEX idx_contacts_initiative ON initiative_contacts(initiative_id);
CREATE INDEX idx_contacts_primary ON initiative_contacts(is_primary);

-- =============================================================================
-- Step 4: Set default values for existing initiatives
-- =============================================================================

-- Set default values for existing records (NULL fields will remain NULL for now)
-- This allows backward compatibility - new fields are optional until explicitly required

UPDATE initiatives
SET
  priority = 'MEDIUM',
  detailed_description = description
WHERE priority IS NULL;

-- =============================================================================
-- Migration Complete
-- =============================================================================
-- Next steps:
-- 1. Run this migration on existing database
-- 2. Update application code to use new fields
-- 3. Update forms to collect new data
