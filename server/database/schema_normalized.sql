-- Innovation Lifecycle Manager - Database Schema (2NF Normalized)
-- SQLite Database Schema
-- This file can be run multiple times (idempotent)

-- Drop existing tables if they exist (for reset)
DROP TABLE IF EXISTS ai_interactions;
DROP TABLE IF EXISTS initiative_users;
DROP TABLE IF EXISTS initiative_attachments;
DROP TABLE IF EXISTS stage_transitions;
DROP TABLE IF EXISTS initiatives;
DROP TABLE IF EXISTS user_types;
DROP TABLE IF EXISTS users;

-- =============================================================================
-- USERS TABLE (Consolidated - all people in one table)
-- =============================================================================
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  department TEXT,
  function TEXT CHECK(function IN ('MFG & SCM', 'R&D', 'M&S', 'SF', 'AS', 'PP', 'MI', 'G&A', 'IT')),
  phone TEXT,
  role TEXT CHECK(role IN ('EMPLOYEE', 'REVIEWER', 'ADMIN')), -- System role for authentication
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME
);

-- Indexes for faster user lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_department ON users(department);

-- =============================================================================
-- USER TYPES TABLE (Reference table for initiative roles)
-- =============================================================================
CREATE TABLE user_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type_name TEXT UNIQUE NOT NULL, -- 'SUBMITTER', 'BUSINESS_OWNER', 'IT_OWNER', 'CONTACT', 'REVIEWER'
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed user types
INSERT INTO user_types (type_name, description) VALUES
  ('SUBMITTER', 'Person who submitted the initiative'),
  ('BUSINESS_OWNER', 'Business owner responsible for the initiative'),
  ('IT_OWNER', 'IT owner responsible for technical implementation'),
  ('CONTACT', 'Additional contact person for the initiative'),
  ('REVIEWER', 'Person who can review and approve stage transitions');

-- =============================================================================
-- INITIATIVES TABLE (Clean - only initiative data, no user duplication)
-- =============================================================================
CREATE TABLE initiatives (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  detailed_description TEXT,
  category TEXT NOT NULL CHECK(category IN ('TECHNOLOGY', 'PROCESS', 'PRODUCT', 'OTHER')),
  current_stage TEXT NOT NULL CHECK(current_stage IN ('IDEA', 'CONCEPT', 'DEVELOPMENT', 'DEPLOYED')),
  priority TEXT CHECK(priority IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')) DEFAULT 'MEDIUM',

  -- Timeline Dates (6 milestone dates)
  idea_date DATETIME,
  concept_date DATETIME,
  project_start_date DATETIME,
  development_date DATETIME,
  deployment_date DATETIME,
  completion_date DATETIME,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_stage_change_date DATETIME
);

-- Indexes for faster queries
CREATE INDEX idx_initiatives_stage ON initiatives(current_stage);
CREATE INDEX idx_initiatives_category ON initiatives(category);
CREATE INDEX idx_initiatives_priority ON initiatives(priority);

-- =============================================================================
-- INITIATIVE_USERS TABLE (Many-to-many relationship with role types)
-- =============================================================================
CREATE TABLE initiative_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  initiative_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  user_type_id INTEGER NOT NULL,
  is_primary INTEGER DEFAULT 0, -- For contacts/multiple people in same role
  assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (initiative_id) REFERENCES initiatives(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user_type_id) REFERENCES user_types(id),
  UNIQUE(initiative_id, user_id, user_type_id)
);

-- Indexes for faster queries
CREATE INDEX idx_initiative_users_initiative ON initiative_users(initiative_id);
CREATE INDEX idx_initiative_users_user ON initiative_users(user_id);
CREATE INDEX idx_initiative_users_type ON initiative_users(user_type_id);
CREATE INDEX idx_initiative_users_primary ON initiative_users(is_primary);

-- =============================================================================
-- STAGE TRANSITIONS TABLE (unchanged - already normalized)
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

  FOREIGN KEY (initiative_id) REFERENCES initiatives(id) ON DELETE CASCADE,
  FOREIGN KEY (requested_by) REFERENCES users(id),
  FOREIGN KEY (reviewer_id) REFERENCES users(id)
);

-- Indexes for faster queries
CREATE INDEX idx_transitions_status ON stage_transitions(status);
CREATE INDEX idx_transitions_reviewer ON stage_transitions(reviewer_id);
CREATE INDEX idx_transitions_initiative ON stage_transitions(initiative_id);

-- =============================================================================
-- INITIATIVE ATTACHMENTS TABLE (unchanged - already normalized)
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
-- AI INTERACTIONS TABLE (unchanged - already normalized)
-- =============================================================================
CREATE TABLE ai_interactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  initiative_id INTEGER,
  user_id INTEGER NOT NULL,
  interaction_type TEXT NOT NULL,
  user_query TEXT,
  ai_response TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (initiative_id) REFERENCES initiatives(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Index for faster lookups
CREATE INDEX idx_ai_interactions_initiative ON ai_interactions(initiative_id);
CREATE INDEX idx_ai_interactions_user ON ai_interactions(user_id);

-- =============================================================================
-- VIEWS FOR CONVENIENCE
-- =============================================================================

-- View for initiatives with all associated users
CREATE VIEW initiatives_with_all_users AS
SELECT
  i.*,
  GROUP_CONCAT(
    CASE WHEN ut.type_name = 'SUBMITTER'
    THEN u.first_name || ' ' || u.last_name
    END
  ) AS submitter_name,
  GROUP_CONCAT(
    CASE WHEN ut.type_name = 'BUSINESS_OWNER'
    THEN u.first_name || ' ' || u.last_name
    END
  ) AS business_owner_name,
  GROUP_CONCAT(
    CASE WHEN ut.type_name = 'BUSINESS_OWNER'
    THEN u.function
    END
  ) AS business_owner_function,
  GROUP_CONCAT(
    CASE WHEN ut.type_name = 'BUSINESS_OWNER'
    THEN u.department
    END
  ) AS business_owner_department,
  GROUP_CONCAT(
    CASE WHEN ut.type_name = 'IT_OWNER'
    THEN u.first_name || ' ' || u.last_name
    END
  ) AS it_owner_name,
  GROUP_CONCAT(
    CASE WHEN ut.type_name = 'IT_OWNER'
    THEN u.department
    END
  ) AS it_owner_department
FROM initiatives i
LEFT JOIN initiative_users iu ON i.id = iu.initiative_id
LEFT JOIN users u ON iu.user_id = u.id
LEFT JOIN user_types ut ON iu.user_type_id = ut.id
GROUP BY i.id;

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
