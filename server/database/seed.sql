-- Innovation Lifecycle Manager - Seed Data
-- Mock data for demonstration purposes
-- This file seeds the database with demo users and initiatives

-- =============================================================================
-- DEMO USERS (passwords are all "demo123" - bcrypt hashed)
-- =============================================================================
-- Password: demo123
-- Bcrypt hash (10 rounds): $2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq

INSERT INTO users (email, password_hash, first_name, last_name, role, department) VALUES
('employee@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'John', 'Employee', 'EMPLOYEE', 'Engineering'),
('reviewer@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Sarah', 'Reviewer', 'REVIEWER', 'Innovation'),
('admin@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Alex', 'Admin', 'ADMIN', 'IT');

-- Additional employees for variety
INSERT INTO users (email, password_hash, first_name, last_name, role, department) VALUES
('mike.chen@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Mike', 'Chen', 'EMPLOYEE', 'Product'),
('lisa.park@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Lisa', 'Park', 'EMPLOYEE', 'Marketing'),
('david.kim@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'David', 'Kim', 'EMPLOYEE', 'Operations');

-- =============================================================================
-- INITIATIVES - IDEA STAGE (4 initiatives)
-- =============================================================================

INSERT INTO initiatives (
  title, description, problem_statement, category, current_stage,
  submitter_id, owner_id, created_at, last_stage_change_date
) VALUES
(
  'AI-Powered Meeting Scheduler',
  'An intelligent system that automatically schedules meetings based on participant availability, time zones, and preferences. Uses AI to find optimal meeting times and sends calendar invites.',
  'Scheduling meetings across different time zones and finding time slots that work for all participants is time-consuming and often leads to back-and-forth emails.',
  'TECHNOLOGY',
  'IDEA',
  1, 1,
  datetime('now', '-5 days'),
  datetime('now', '-5 days')
),
(
  'Employee Onboarding Portal',
  'A centralized portal for new employee onboarding that includes document submission, training modules, team introductions, and progress tracking.',
  'New employees often feel lost during onboarding with scattered information across emails, documents, and verbal instructions.',
  'PROCESS',
  'IDEA',
  4, 4,
  datetime('now', '-3 days'),
  datetime('now', '-3 days')
),
(
  'Smart Office Energy Management',
  'IoT-based system to monitor and optimize energy usage in office buildings by automatically adjusting lighting, heating, and cooling based on occupancy.',
  'Office buildings waste significant energy by heating/cooling empty spaces and leaving lights on when not needed.',
  'TECHNOLOGY',
  'IDEA',
  6, 6,
  datetime('now', '-2 days'),
  datetime('now', '-2 days')
),
(
  'Customer Feedback Loop System',
  'Automated system to collect, analyze, and route customer feedback to relevant teams with AI-powered sentiment analysis and trend detection.',
  'Customer feedback is scattered across email, support tickets, and surveys making it hard to identify patterns and take action.',
  'PROCESS',
  'IDEA',
  5, 5,
  datetime('now', '-1 day'),
  datetime('now', '-1 day')
);

-- =============================================================================
-- INITIATIVES - CONCEPT STAGE (3 initiatives)
-- =============================================================================

INSERT INTO initiatives (
  title, description, problem_statement, category, current_stage,
  submitter_id, owner_id, created_at, last_stage_change_date
) VALUES
(
  'Mobile Expense Reporting App',
  'Mobile-first application for employees to submit expenses with photo receipt capture, automatic categorization, and real-time approval workflow.',
  'Current expense reporting process is manual, paper-based, and takes weeks to get reimbursed.',
  'PRODUCT',
  'CONCEPT',
  1, 1,
  datetime('now', '-20 days'),
  datetime('now', '-12 days')
),
(
  'Knowledge Base AI Assistant',
  'AI chatbot that helps employees find information from internal documentation, wikis, and knowledge bases using natural language queries.',
  'Employees spend hours searching for information across multiple systems and often can''t find what they need.',
  'TECHNOLOGY',
  'CONCEPT',
  4, 4,
  datetime('now', '-18 days'),
  datetime('now', '-10 days')
),
(
  'Supplier Performance Dashboard',
  'Real-time dashboard showing supplier metrics including delivery times, quality scores, and cost trends with predictive analytics.',
  'Supply chain team has no visibility into supplier performance and relies on manual reports that are weeks old.',
  'PROCESS',
  'CONCEPT',
  6, 6,
  datetime('now', '-15 days'),
  datetime('now', '-8 days')
);

-- =============================================================================
-- INITIATIVES - DEVELOPMENT STAGE (3 initiatives)
-- =============================================================================

INSERT INTO initiatives (
  title, description, problem_statement, category, current_stage,
  submitter_id, owner_id, created_at, last_stage_change_date
) VALUES
(
  'Automated Invoice Processing',
  'System that automatically extracts data from invoices using OCR, matches with purchase orders, and routes for approval.',
  'Accounts payable team manually processes hundreds of invoices weekly, leading to errors and delays.',
  'TECHNOLOGY',
  'DEVELOPMENT',
  5, 5,
  datetime('now', '-45 days'),
  datetime('now', '-25 days')
),
(
  'Employee Skills Matrix',
  'Platform for employees to document their skills, certifications, and interests to help managers with project staffing and career development.',
  'Managers don''t have visibility into team member skills and struggle to assign people to appropriate projects.',
  'PRODUCT',
  'DEVELOPMENT',
  1, 1,
  datetime('now', '-40 days'),
  datetime('now', '-22 days')
),
(
  'Inventory Optimization System',
  'Machine learning system that predicts inventory needs and automatically triggers purchase orders to minimize stockouts and excess inventory.',
  'Frequent stockouts and excess inventory tie up capital and hurt customer satisfaction.',
  'TECHNOLOGY',
  'DEVELOPMENT',
  4, 4,
  datetime('now', '-38 days'),
  datetime('now', '-20 days')
);

-- =============================================================================
-- INITIATIVES - DEPLOYED STAGE (2 initiatives)
-- =============================================================================

INSERT INTO initiatives (
  title, description, problem_statement, category, current_stage,
  submitter_id, owner_id, created_at, last_stage_change_date
) VALUES
(
  'Unified Communication Platform',
  'Single platform integrating chat, video calls, and file sharing to replace multiple disconnected tools.',
  'Teams use 5+ different communication tools leading to missed messages and information silos.',
  'PRODUCT',
  'DEPLOYED',
  6, 6,
  datetime('now', '-90 days'),
  datetime('now', '-10 days')
),
(
  'Customer Portal Self-Service',
  'Web portal where customers can track orders, download invoices, and submit support tickets without calling.',
  'Customer service team is overwhelmed with routine inquiries that customers could handle themselves.',
  'PRODUCT',
  'DEPLOYED',
  5, 5,
  datetime('now', '-85 days'),
  datetime('now', '-8 days')
);

-- =============================================================================
-- STAGE TRANSITIONS - One pending for demo
-- =============================================================================

INSERT INTO stage_transitions (
  initiative_id, from_stage, to_stage, requested_by, justification, status, requested_at
) VALUES
(
  1, -- AI-Powered Meeting Scheduler
  'IDEA',
  'CONCEPT',
  1, -- John Employee
  'Initial user research completed. Validated problem with 15 team members. Identified similar tools in market but none meet our specific needs for multi-timezone scheduling. Ready to develop detailed business case and ROI analysis.',
  'PENDING',
  datetime('now', '-6 hours')
);

-- Some historical approved transitions for other initiatives
INSERT INTO stage_transitions (
  initiative_id, from_stage, to_stage, requested_by, justification, status,
  reviewer_id, review_notes, requested_at, reviewed_at
) VALUES
(
  5, -- Mobile Expense Reporting App
  'IDEA',
  'CONCEPT',
  1,
  'Validated problem with finance team. Current process takes 2-3 weeks for reimbursement.',
  'APPROVED',
  2, -- Sarah Reviewer
  'Good problem validation. Approved to develop business case.',
  datetime('now', '-12 days'),
  datetime('now', '-11 days')
),
(
  8, -- Automated Invoice Processing
  'CONCEPT',
  'DEVELOPMENT',
  5,
  'Strong business case: Can save 20 hours/week for AP team. ROI of 250% in first year.',
  'APPROVED',
  2, -- Sarah Reviewer
  'Excellent business case. Approved for development.',
  datetime('now', '-25 days'),
  datetime('now', '-24 days')
);
