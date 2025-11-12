-- Innovation Lifecycle Manager - Database Schema
-- SQLite Database Schema
-- This file can be run multiple times (idempotent)

-- Drop existing tables if they exist (for reset)
DROP TABLE IF EXISTS ai_interactions;
DROP TABLE IF EXISTS initiative_contacts;
DROP TABLE IF EXISTS initiative_attachments;
DROP TABLE IF EXISTS stage_transitions;
DROP TABLE IF EXISTS initiatives;
DROP TABLE IF EXISTS users;

-- =============================================================================
-- USERS TABLE
-- =============================================================================
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('EMPLOYEE', 'REVIEWER', 'ADMIN')),
  department TEXT,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME
);

-- Index for faster user lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- =============================================================================
-- INITIATIVES TABLE
-- =============================================================================
CREATE TABLE initiatives (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('TECHNOLOGY', 'PROCESS', 'PRODUCT', 'OTHER')),
  current_stage TEXT NOT NULL CHECK(current_stage IN ('IDEA', 'CONCEPT', 'DEVELOPMENT', 'DEPLOYED')),
  submitter_id INTEGER NOT NULL,
  owner_id INTEGER NOT NULL,

  -- Business Owner Information
  business_owner_name TEXT,
  business_owner_function TEXT CHECK(business_owner_function IN ('MFG & SCM', 'R&D', 'M&S', 'SF', 'AS', 'PP', 'MI', 'G&A', 'IT')),
  business_owner_department TEXT,

  -- IT Owner Information
  it_owner_name TEXT,
  it_owner_department TEXT,

  -- Priority/Criticality
  priority TEXT CHECK(priority IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')) DEFAULT 'MEDIUM',

  -- Extended Description
  detailed_description TEXT,

  -- Timeline Dates (6 milestone dates)
  idea_date DATETIME,
  concept_date DATETIME,
  project_start_date DATETIME,
  development_date DATETIME,
  deployment_date DATETIME,
  completion_date DATETIME,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_stage_change_date DATETIME,

  FOREIGN KEY (submitter_id) REFERENCES users(id),
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Indexes for faster queries
CREATE INDEX idx_initiatives_stage ON initiatives(current_stage);
CREATE INDEX idx_initiatives_owner ON initiatives(owner_id);
CREATE INDEX idx_initiatives_category ON initiatives(category);
CREATE INDEX idx_initiatives_submitter ON initiatives(submitter_id);

-- =============================================================================
-- STAGE TRANSITIONS TABLE
-- =============================================================================
CREATE TABLE stage_transitions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  initiative_id INTEGER NOT NULL,
  from_stage TEXT NOT NULL,
  to_stage TEXT NOT NULL,
  requested_by INTEGER NOT NULL,
  justification TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('PENDING', 'APPROVED', 'REJECTED')),
  reviewer_id INTEGER,
  review_notes TEXT,
  requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  reviewed_at DATETIME,

  FOREIGN KEY (initiative_id) REFERENCES initiatives(id),
  FOREIGN KEY (requested_by) REFERENCES users(id),
  FOREIGN KEY (reviewer_id) REFERENCES users(id)
);

-- Indexes for faster queries
CREATE INDEX idx_transitions_status ON stage_transitions(status);
CREATE INDEX idx_transitions_reviewer ON stage_transitions(reviewer_id);
CREATE INDEX idx_transitions_initiative ON stage_transitions(initiative_id);

-- =============================================================================
-- INITIATIVE ATTACHMENTS TABLE
-- =============================================================================
CREATE TABLE initiative_attachments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  initiative_id INTEGER NOT NULL,
  attachment_type TEXT NOT NULL CHECK(attachment_type IN ('IMAGE', 'VIDEO', 'DOCUMENT', 'LINK')),
  file_path TEXT,
  external_url TEXT,
  storage_provider TEXT CHECK(storage_provider IN ('LOCAL', 'ONEDRIVE', 'SHAREPOINT', 'GENERIC')),
  filename TEXT,
  file_size INTEGER,
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
-- INITIATIVE CONTACTS TABLE
-- =============================================================================
CREATE TABLE initiative_contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  initiative_id INTEGER NOT NULL,
  contact_name TEXT NOT NULL,
  contact_role TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  is_primary INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (initiative_id) REFERENCES initiatives(id) ON DELETE CASCADE
);

-- Indexes for faster queries
CREATE INDEX idx_contacts_initiative ON initiative_contacts(initiative_id);
CREATE INDEX idx_contacts_primary ON initiative_contacts(is_primary);

-- =============================================================================
-- AI INTERACTIONS TABLE (Optional - for tracking AI usage)
-- =============================================================================
CREATE TABLE ai_interactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  initiative_id INTEGER,
  user_id INTEGER NOT NULL,
  interaction_type TEXT NOT NULL,
  user_query TEXT,
  ai_response TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (initiative_id) REFERENCES initiatives(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Index for faster lookups
CREATE INDEX idx_ai_interactions_initiative ON ai_interactions(initiative_id);
CREATE INDEX idx_ai_interactions_user ON ai_interactions(user_id);

-- =============================================================================
-- VIEWS FOR CONVENIENCE
-- =============================================================================

-- View for initiatives with user details
CREATE VIEW initiatives_with_users AS
SELECT
  i.*,
  u_submitter.first_name || ' ' || u_submitter.last_name AS submitter_name,
  u_submitter.email AS submitter_email,
  u_owner.first_name || ' ' || u_owner.last_name AS owner_name,
  u_owner.email AS owner_email,
  u_owner.department AS owner_department
FROM initiatives i
LEFT JOIN users u_submitter ON i.submitter_id = u_submitter.id
LEFT JOIN users u_owner ON i.owner_id = u_owner.id;

-- View for pending transitions with details
CREATE VIEW pending_transitions_with_details AS
SELECT
  t.*,
  i.title AS initiative_title,
  i.category AS initiative_category,
  u_requester.first_name || ' ' || u_requester.last_name AS requester_name
FROM stage_transitions t
LEFT JOIN initiatives i ON t.initiative_id = i.id
LEFT JOIN users u_requester ON t.requested_by = u_requester.id
WHERE t.status = 'PENDING';
