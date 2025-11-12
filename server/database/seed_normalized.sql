-- Innovation Lifecycle Manager - Seed Data (Normalized)
-- Mock data for demonstration purposes with normalized structure
-- This file seeds the database with demo users, initiative relationships, and transitions

-- =============================================================================
-- DEMO USERS (passwords are all "demo123" - bcrypt hashed)
-- =============================================================================
-- Password: demo123
-- Bcrypt hash (10 rounds): $2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq

-- Core System Users (for authentication)
INSERT INTO users (email, password_hash, first_name, last_name, role, department, function, phone) VALUES
('employee@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'John', 'Employee', 'EMPLOYEE', 'Engineering', 'R&D', '+1-555-0001'),
('reviewer@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Sarah', 'Reviewer', 'REVIEWER', 'Innovation', 'MI', '+1-555-0002'),
('admin@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Alex', 'Admin', 'ADMIN', 'ITD', 'IT', '+1-555-0003');

-- Additional employees for variety
INSERT INTO users (email, password_hash, first_name, last_name, role, department, function, phone) VALUES
('mike.chen@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Mike', 'Chen', 'EMPLOYEE', 'ITD', 'IT', '+1-555-0004'),
('lisa.park@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Lisa', 'Park', 'EMPLOYEE', 'ITD', 'IT', '+1-555-0005'),
('david.kim@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'David', 'Kim', 'EMPLOYEE', 'ITD', 'IT', '+1-555-0006');

-- Business Owners and IT Owners (Referenced in Initiatives)
INSERT INTO users (email, password_hash, first_name, last_name, role, department, function, phone) VALUES
-- Business Owners
('jennifer.martinez@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Jennifer', 'Martinez', 'EMPLOYEE', 'ITS', 'IT', '+1-555-0101'),
('robert.johnson@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Robert', 'Johnson', 'EMPLOYEE', 'HRD', 'G&A', '+1-555-0201'),
('sarah.williams@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Sarah', 'Williams', 'EMPLOYEE', 'FAC', 'PP', '+1-555-0301'),
('emily.chen@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Emily', 'Chen', 'EMPLOYEE', 'MKT', 'M&S', '+1-555-0401'),
('patricia.davis@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Patricia', 'Davis', 'EMPLOYEE', 'FIN', 'SF', '+1-555-0501'),
('michael.brown@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Michael', 'Brown', 'EMPLOYEE', 'ITS', 'IT', '+1-555-0601'),
('thomas.anderson@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Thomas', 'Anderson', 'EMPLOYEE', 'SCM', 'MFG & SCM', '+1-555-0701'),
('laura.thompson@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Laura', 'Thompson', 'EMPLOYEE', 'ACC', 'SF', '+1-555-0801'),
('karen.wilson@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Karen', 'Wilson', 'EMPLOYEE', 'HRD', 'G&A', '+1-555-0901'),
('james.miller@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'James', 'Miller', 'EMPLOYEE', 'LOG', 'MFG & SCM', '+1-555-1001'),
('daniel.garcia@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Daniel', 'Garcia', 'EMPLOYEE', 'ITS', 'IT', '+1-555-1101'),
('sophia.rodriguez@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Sophia', 'Rodriguez', 'EMPLOYEE', 'CUS', 'M&S', '+1-555-1201');

-- Additional Contact Persons
INSERT INTO users (email, password_hash, first_name, last_name, role, department, function, phone) VALUES
('steve.johnson@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Steve', 'Johnson', 'EMPLOYEE', 'Product', 'R&D', '+1-555-0103'),
('amy.williams@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Amy', 'Williams', 'EMPLOYEE', 'HRD', 'G&A', '+1-555-0203'),
('tom.richards@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Tom', 'Richards', 'EMPLOYEE', 'FAC', 'PP', '+1-555-0303'),
('mark.thompson@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Mark', 'Thompson', 'EMPLOYEE', 'FIN', 'SF', '+1-555-0503'),
('susan.lee@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Susan', 'Lee', 'EMPLOYEE', 'SCM', 'MFG & SCM', '+1-555-0703'),
('kevin.davis@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Kevin', 'Davis', 'EMPLOYEE', 'ACC', 'SF', '+1-555-0803'),
('rachel.green@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Rachel', 'Green', 'EMPLOYEE', 'LOG', 'MFG & SCM', '+1-555-1003'),
('paul.martinez@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Paul', 'Martinez', 'EMPLOYEE', 'Change Management', 'MI', '+1-555-1103'),
('chris.taylor@demo.com', '$2b$10$YQ98PzeoYdKKs.AfqxZ8/.M1qGZ8PdPpDRJLXU1rE4LGnLxrfTLwq', 'Chris', 'Taylor', 'EMPLOYEE', 'CUS', 'M&S', '+1-555-1203');

-- =============================================================================
-- INITIATIVES - IDEA STAGE (4 initiatives)
-- =============================================================================

INSERT INTO initiatives (
  title, description, problem_statement, category, current_stage,
  priority, detailed_description,
  idea_date, concept_date, project_start_date, development_date, deployment_date, completion_date,
  created_at, last_stage_change_date
) VALUES
(
  'AI-Powered Meeting Scheduler',
  'An intelligent system that automatically schedules meetings based on participant availability, time zones, and preferences. Uses AI to find optimal meeting times and sends calendar invites.',
  'Scheduling meetings across different time zones and finding time slots that work for all participants is time-consuming and often leads to back-and-forth emails.',
  'TECHNOLOGY',
  'IDEA',
  'HIGH',
  'This AI-powered scheduling system will integrate with existing calendar systems (Google Calendar, Outlook) and use machine learning to understand participant preferences and availability patterns. The system will automatically propose optimal meeting times, send invites, and handle rescheduling requests.',
  datetime('now', '-5 days'),
  datetime('now', '+15 days'),
  datetime('now', '+30 days'),
  datetime('now', '+45 days'),
  datetime('now', '+90 days'),
  datetime('now', '+120 days'),
  datetime('now', '-5 days'),
  datetime('now', '-5 days')
),
(
  'Employee Onboarding Portal',
  'A centralized portal for new employee onboarding that includes document submission, training modules, team introductions, and progress tracking.',
  'New employees often feel lost during onboarding with scattered information across emails, documents, and verbal instructions.',
  'PROCESS',
  'IDEA',
  'MEDIUM',
  'Comprehensive onboarding portal that provides new hires with a single place to complete all onboarding tasks, access training materials, meet their team virtually, and track their progress. Includes automated reminders and manager dashboards.',
  datetime('now', '-3 days'),
  datetime('now', '+20 days'),
  datetime('now', '+45 days'),
  datetime('now', '+60 days'),
  datetime('now', '+120 days'),
  datetime('now', '+150 days'),
  datetime('now', '-3 days'),
  datetime('now', '-3 days')
),
(
  'Smart Office Energy Management',
  'IoT-based system to monitor and optimize energy usage in office buildings by automatically adjusting lighting, heating, and cooling based on occupancy.',
  'Office buildings waste significant energy by heating/cooling empty spaces and leaving lights on when not needed.',
  'TECHNOLOGY',
  'IDEA',
  'CRITICAL',
  'Deploy IoT sensors throughout office spaces to detect occupancy and environmental conditions. System will learn usage patterns and automatically optimize HVAC and lighting systems to reduce energy consumption while maintaining comfort. Expected 30-40% reduction in energy costs.',
  datetime('now', '-2 days'),
  datetime('now', '+25 days'),
  datetime('now', '+60 days'),
  datetime('now', '+80 days'),
  datetime('now', '+150 days'),
  datetime('now', '+180 days'),
  datetime('now', '-2 days'),
  datetime('now', '-2 days')
),
(
  'Customer Feedback Loop System',
  'Automated system to collect, analyze, and route customer feedback to relevant teams with AI-powered sentiment analysis and trend detection.',
  'Customer feedback is scattered across email, support tickets, and surveys making it hard to identify patterns and take action.',
  'PROCESS',
  'IDEA',
  'HIGH',
  'Centralized feedback platform that aggregates customer input from all channels, uses AI to analyze sentiment and identify trends, and automatically routes actionable feedback to the appropriate teams. Includes dashboards for tracking feedback trends and response times.',
  datetime('now', '-1 day'),
  datetime('now', '+10 days'),
  datetime('now', '+20 days'),
  datetime('now', '+35 days'),
  datetime('now', '+75 days'),
  datetime('now', '+90 days'),
  datetime('now', '-1 day'),
  datetime('now', '-1 day')
);

-- =============================================================================
-- INITIATIVES - CONCEPT STAGE (3 initiatives)
-- =============================================================================

INSERT INTO initiatives (
  title, description, problem_statement, category, current_stage,
  priority, detailed_description,
  idea_date, concept_date, project_start_date, development_date, deployment_date, completion_date,
  created_at, last_stage_change_date
) VALUES
(
  'Mobile Expense Reporting App',
  'Mobile-first application for employees to submit expenses with photo receipt capture, automatic categorization, and real-time approval workflow.',
  'Current expense reporting process is manual, paper-based, and takes weeks to get reimbursed.',
  'PRODUCT',
  'CONCEPT',
  'HIGH',
  'Native mobile app for iOS and Android that allows employees to photograph receipts, auto-categorize expenses using OCR and ML, route to managers for approval, and integrate with payroll for rapid reimbursement. Target: reduce reimbursement time from 3 weeks to 3 days.',
  datetime('now', '-20 days'),
  datetime('now', '-12 days'),
  datetime('now', '+10 days'),
  datetime('now', '+25 days'),
  datetime('now', '+80 days'),
  datetime('now', '+100 days'),
  datetime('now', '-20 days'),
  datetime('now', '-12 days')
),
(
  'Knowledge Base AI Assistant',
  'AI chatbot that helps employees find information from internal documentation, wikis, and knowledge bases using natural language queries.',
  'Employees spend hours searching for information across multiple systems and often can''t find what they need.',
  'TECHNOLOGY',
  'CONCEPT',
  'MEDIUM',
  'Conversational AI assistant that indexes all internal documentation and allows employees to ask questions in natural language. Will integrate with Confluence, SharePoint, Google Docs, and internal wikis. Uses RAG (Retrieval-Augmented Generation) for accurate answers with source citations.',
  datetime('now', '-18 days'),
  datetime('now', '-10 days'),
  datetime('now', '+25 days'),
  datetime('now', '+40 days'),
  datetime('now', '+95 days'),
  datetime('now', '+110 days'),
  datetime('now', '-18 days'),
  datetime('now', '-10 days')
),
(
  'Supplier Performance Dashboard',
  'Real-time dashboard showing supplier metrics including delivery times, quality scores, and cost trends with predictive analytics.',
  'Supply chain team has no visibility into supplier performance and relies on manual reports that are weeks old.',
  'PROCESS',
  'CONCEPT',
  'CRITICAL',
  'Executive dashboard pulling real-time data from ERP, quality management, and logistics systems. Displays KPIs for all suppliers including on-time delivery, defect rates, cost variance, and more. Predictive analytics to flag at-risk suppliers before issues occur.',
  datetime('now', '-15 days'),
  datetime('now', '-8 days'),
  datetime('now', '+15 days'),
  datetime('now', '+30 days'),
  datetime('now', '+60 days'),
  datetime('now', '+75 days'),
  datetime('now', '-15 days'),
  datetime('now', '-8 days')
);

-- =============================================================================
-- INITIATIVES - DEVELOPMENT STAGE (3 initiatives)
-- =============================================================================

INSERT INTO initiatives (
  title, description, problem_statement, category, current_stage,
  priority, detailed_description,
  idea_date, concept_date, project_start_date, development_date, deployment_date, completion_date,
  created_at, last_stage_change_date
) VALUES
(
  'Automated Invoice Processing',
  'System that automatically extracts data from invoices using OCR, matches with purchase orders, and routes for approval.',
  'Accounts payable team manually processes hundreds of invoices weekly, leading to errors and delays.',
  'TECHNOLOGY',
  'DEVELOPMENT',
  'CRITICAL',
  'Intelligent document processing system using OCR and machine learning to extract invoice data, validate against purchase orders, detect anomalies, and route exceptions to AP team. Handles multiple invoice formats and languages. Integration with SAP for payment processing. Expected to reduce processing time by 80%.',
  datetime('now', '-90 days'),
  datetime('now', '-60 days'),
  datetime('now', '-45 days'),
  datetime('now', '-25 days'),
  datetime('now', '+30 days'),
  datetime('now', '+60 days'),
  datetime('now', '-90 days'),
  datetime('now', '-25 days')
),
(
  'Employee Skills Matrix',
  'Platform for employees to document their skills, certifications, and interests to help managers with project staffing and career development.',
  'Managers don''t have visibility into team member skills and struggle to assign people to appropriate projects.',
  'PRODUCT',
  'DEVELOPMENT',
  'MEDIUM',
  'Self-service platform where employees maintain profiles with skills, certifications, project experience, and career interests. Includes skill gap analysis, certification tracking, and project-to-skill matching algorithms. Managers can search for team members with specific skills for project staffing.',
  datetime('now', '-75 days'),
  datetime('now', '-50 days'),
  datetime('now', '-40 days'),
  datetime('now', '-22 days'),
  datetime('now', '+35 days'),
  datetime('now', '+65 days'),
  datetime('now', '-75 days'),
  datetime('now', '-22 days')
),
(
  'Inventory Optimization System',
  'Machine learning system that predicts inventory needs and automatically triggers purchase orders to minimize stockouts and excess inventory.',
  'Frequent stockouts and excess inventory tie up capital and hurt customer satisfaction.',
  'TECHNOLOGY',
  'DEVELOPMENT',
  'HIGH',
  'ML-based demand forecasting system that analyzes historical sales, seasonality, promotions, and external factors to predict optimal inventory levels. Automatically generates purchase orders when stock falls below predicted thresholds. Expected to reduce stockouts by 60% and excess inventory by 40%.',
  datetime('now', '-80 days'),
  datetime('now', '-55 days'),
  datetime('now', '-38 days'),
  datetime('now', '-20 days'),
  datetime('now', '+25 days'),
  datetime('now', '+50 days'),
  datetime('now', '-80 days'),
  datetime('now', '-20 days')
);

-- =============================================================================
-- INITIATIVES - DEPLOYED STAGE (2 initiatives)
-- =============================================================================

INSERT INTO initiatives (
  title, description, problem_statement, category, current_stage,
  priority, detailed_description,
  idea_date, concept_date, project_start_date, development_date, deployment_date, completion_date,
  created_at, last_stage_change_date
) VALUES
(
  'Unified Communication Platform',
  'Single platform integrating chat, video calls, and file sharing to replace multiple disconnected tools.',
  'Teams use 5+ different communication tools leading to missed messages and information silos.',
  'PRODUCT',
  'DEPLOYED',
  'HIGH',
  'Enterprise collaboration platform that consolidates chat, video conferencing, screen sharing, and file collaboration into a single interface. Includes threaded conversations, @mentions, integrations with calendar and email, and mobile apps. Successfully migrated 500+ users from Slack, Zoom, and SharePoint.',
  datetime('now', '-180 days'),
  datetime('now', '-150 days'),
  datetime('now', '-120 days'),
  datetime('now', '-90 days'),
  datetime('now', '-30 days'),
  datetime('now', '+10 days'),
  datetime('now', '-180 days'),
  datetime('now', '-30 days')
),
(
  'Customer Portal Self-Service',
  'Web portal where customers can track orders, download invoices, and submit support tickets without calling.',
  'Customer service team is overwhelmed with routine inquiries that customers could handle themselves.',
  'PRODUCT',
  'DEPLOYED',
  'CRITICAL',
  'Customer-facing web portal with authentication, order tracking, invoice downloads, support ticket submission, and knowledge base. Integrated with CRM and ERP systems. Reduced customer service call volume by 45% in first 3 months. 4.5/5 customer satisfaction rating.',
  datetime('now', '-170 days'),
  datetime('now', '-140 days'),
  datetime('now', '-110 days'),
  datetime('now', '-85 days'),
  datetime('now', '-25 days'),
  datetime('now', '-5 days'),
  datetime('now', '-170 days'),
  datetime('now', '-25 days')
);

-- =============================================================================
-- INITIATIVE_USERS RELATIONSHIPS
-- =============================================================================
-- Link all initiatives with their submitters, business owners, IT owners, and additional contacts

-- Initiative 1: AI-Powered Meeting Scheduler
-- Submitter: John Employee (1), Business Owner: Jennifer Martinez (7), IT Owner: Alex Admin (3)
INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary) VALUES
(1, 1, 1, 1),  -- John Employee as SUBMITTER
(1, 7, 2, 1),  -- Jennifer Martinez as BUSINESS_OWNER
(1, 3, 3, 1),  -- Alex Admin as IT_OWNER
(1, 19, 4, 0), -- Steve Johnson as CONTACT
(1, 4, 4, 0);  -- Mike Chen as CONTACT

-- Initiative 2: Employee Onboarding Portal
-- Submitter: Mike Chen (4), Business Owner: Robert Johnson (8), IT Owner: Mike Chen (4)
INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary) VALUES
(2, 4, 1, 1),  -- Mike Chen as SUBMITTER
(2, 8, 2, 1),  -- Robert Johnson as BUSINESS_OWNER
(2, 4, 3, 1),  -- Mike Chen as IT_OWNER
(2, 20, 4, 0), -- Amy Williams as CONTACT
(2, 2, 4, 0);  -- Sarah Reviewer as CONTACT

-- Initiative 3: Smart Office Energy Management
-- Submitter: David Kim (6), Business Owner: Sarah Williams (9), IT Owner: David Kim (6)
INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary) VALUES
(3, 6, 1, 1),  -- David Kim as SUBMITTER
(3, 9, 2, 1),  -- Sarah Williams as BUSINESS_OWNER
(3, 6, 3, 1),  -- David Kim as IT_OWNER
(3, 21, 4, 0), -- Tom Richards as CONTACT
(3, 10, 4, 0); -- Emily Chen as CONTACT

-- Initiative 4: Customer Feedback Loop System
-- Submitter: Lisa Park (5), Business Owner: Emily Chen (10), IT Owner: Lisa Park (5)
INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary) VALUES
(4, 5, 1, 1),  -- Lisa Park as SUBMITTER
(4, 10, 2, 1), -- Emily Chen as BUSINESS_OWNER
(4, 5, 3, 1),  -- Lisa Park as IT_OWNER
(4, 4, 4, 0),  -- Mike Chen as CONTACT
(4, 2, 4, 0);  -- Sarah Reviewer as CONTACT

-- Initiative 5: Mobile Expense Reporting App
-- Submitter: John Employee (1), Business Owner: Patricia Davis (11), IT Owner: Alex Admin (3)
INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary) VALUES
(5, 1, 1, 1),  -- John Employee as SUBMITTER
(5, 11, 2, 1), -- Patricia Davis as BUSINESS_OWNER
(5, 3, 3, 1),  -- Alex Admin as IT_OWNER
(5, 22, 4, 0), -- Mark Thompson as CONTACT
(5, 19, 4, 0); -- Steve Johnson as CONTACT

-- Initiative 6: Knowledge Base AI Assistant
-- Submitter: Mike Chen (4), Business Owner: Michael Brown (12), IT Owner: Mike Chen (4)
INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary) VALUES
(6, 4, 1, 1),  -- Mike Chen as SUBMITTER
(6, 12, 2, 1), -- Michael Brown as BUSINESS_OWNER
(6, 4, 3, 1),  -- Mike Chen as IT_OWNER
(6, 20, 4, 0), -- Amy Williams as CONTACT
(6, 7, 4, 0);  -- Jennifer Martinez as CONTACT

-- Initiative 7: Supplier Performance Dashboard
-- Submitter: David Kim (6), Business Owner: Thomas Anderson (13), IT Owner: David Kim (6)
INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary) VALUES
(7, 6, 1, 1),  -- David Kim as SUBMITTER
(7, 13, 2, 1), -- Thomas Anderson as BUSINESS_OWNER
(7, 6, 3, 1),  -- David Kim as IT_OWNER
(7, 23, 4, 0), -- Susan Lee as CONTACT
(7, 17, 4, 0); -- James Miller as CONTACT

-- Initiative 8: Automated Invoice Processing
-- Submitter: Lisa Park (5), Business Owner: Laura Thompson (14), IT Owner: Lisa Park (5)
INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary) VALUES
(8, 5, 1, 1),  -- Lisa Park as SUBMITTER
(8, 14, 2, 1), -- Laura Thompson as BUSINESS_OWNER
(8, 5, 3, 1),  -- Lisa Park as IT_OWNER
(8, 24, 4, 0), -- Kevin Davis as CONTACT
(8, 11, 4, 0); -- Patricia Davis as CONTACT

-- Initiative 9: Employee Skills Matrix
-- Submitter: John Employee (1), Business Owner: Karen Wilson (15), IT Owner: Alex Admin (3)
INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary) VALUES
(9, 1, 1, 1),  -- John Employee as SUBMITTER
(9, 15, 2, 1), -- Karen Wilson as BUSINESS_OWNER
(9, 3, 3, 1),  -- Alex Admin as IT_OWNER
(9, 20, 4, 0), -- Amy Williams as CONTACT
(9, 8, 4, 0);  -- Robert Johnson as CONTACT

-- Initiative 10: Inventory Optimization System
-- Submitter: Mike Chen (4), Business Owner: James Miller (17), IT Owner: Mike Chen (4)
INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary) VALUES
(10, 4, 1, 1),  -- Mike Chen as SUBMITTER
(10, 17, 2, 1), -- James Miller as BUSINESS_OWNER
(10, 4, 3, 1),  -- Mike Chen as IT_OWNER
(10, 25, 4, 0), -- Rachel Green as CONTACT
(10, 23, 4, 0); -- Susan Lee as CONTACT

-- Initiative 11: Unified Communication Platform
-- Submitter: David Kim (6), Business Owner: Daniel Garcia (18), IT Owner: David Kim (6)
INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary) VALUES
(11, 6, 1, 1),  -- David Kim as SUBMITTER
(11, 18, 2, 1), -- Daniel Garcia as BUSINESS_OWNER
(11, 6, 3, 1),  -- David Kim as IT_OWNER
(11, 26, 4, 0), -- Paul Martinez as CONTACT
(11, 12, 4, 0); -- Michael Brown as CONTACT

-- Initiative 12: Customer Portal Self-Service
-- Submitter: Lisa Park (5), Business Owner: Sophia Rodriguez (16), IT Owner: Lisa Park (5)
INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary) VALUES
(12, 5, 1, 1),  -- Lisa Park as SUBMITTER
(12, 16, 2, 1), -- Sophia Rodriguez as BUSINESS_OWNER
(12, 5, 3, 1),  -- Lisa Park as IT_OWNER
(12, 27, 4, 0), -- Chris Taylor as CONTACT
(12, 10, 4, 0); -- Emily Chen as CONTACT

-- =============================================================================
-- STAGE TRANSITIONS
-- =============================================================================

-- One pending transition for demo
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

-- Historical approved transitions for other initiatives
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
