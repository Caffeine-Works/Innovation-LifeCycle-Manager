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
  submitter_id, owner_id,
  business_owner_name, business_owner_function, business_owner_department,
  it_owner_name, it_owner_department,
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
  1, 1,
  'Jennifer Martinez', 'IT', 'ITS',
  'Alex Admin', 'ITD',
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
  4, 4,
  'Robert Johnson', 'G&A', 'HRD',
  'Mike Chen', 'ITD',
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
  6, 6,
  'Sarah Williams', 'PP', 'FAC',
  'David Kim', 'ITD',
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
  5, 5,
  'Emily Chen', 'M&S', 'MKT',
  'Lisa Park', 'ITD',
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
  submitter_id, owner_id,
  business_owner_name, business_owner_function, business_owner_department,
  it_owner_name, it_owner_department,
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
  1, 1,
  'Patricia Davis', 'SF', 'FIN',
  'Alex Admin', 'ITD',
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
  4, 4,
  'Michael Brown', 'IT', 'ITS',
  'Mike Chen', 'ITD',
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
  6, 6,
  'Thomas Anderson', 'MFG & SCM', 'SCM',
  'David Kim', 'ITD',
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
  submitter_id, owner_id,
  business_owner_name, business_owner_function, business_owner_department,
  it_owner_name, it_owner_department,
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
  5, 5,
  'Laura Thompson', 'SF', 'ACC',
  'Lisa Park', 'ITD',
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
  1, 1,
  'Karen Wilson', 'G&A', 'HRD',
  'Alex Admin', 'ITD',
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
  4, 4,
  'James Miller', 'MFG & SCM', 'LOG',
  'Mike Chen', 'ITD',
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
  submitter_id, owner_id,
  business_owner_name, business_owner_function, business_owner_department,
  it_owner_name, it_owner_department,
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
  6, 6,
  'Daniel Garcia', 'IT', 'ITS',
  'David Kim', 'ITD',
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
  5, 5,
  'Sophia Rodriguez', 'M&S', 'CUS',
  'Lisa Park', 'ITD',
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
-- INITIATIVE CONTACTS - Sample contacts for initiatives
-- =============================================================================

INSERT INTO initiative_contacts (initiative_id, contact_name, contact_role, contact_email, contact_phone, is_primary) VALUES
-- AI-Powered Meeting Scheduler (ID: 1)
(1, 'Jennifer Martinez', 'Business Owner', 'jennifer.martinez@company.com', '+1-555-0101', 1),
(1, 'Alex Admin', 'IT Owner', 'alex.admin@company.com', '+1-555-0102', 0),
(1, 'Steve Johnson', 'Product Manager', 'steve.johnson@company.com', '+1-555-0103', 0),

-- Employee Onboarding Portal (ID: 2)
(2, 'Robert Johnson', 'Business Owner', 'robert.johnson@company.com', '+1-555-0201', 1),
(2, 'Mike Chen', 'IT Owner', 'mike.chen@company.com', '+1-555-0202', 0),
(2, 'Amy Williams', 'HR Director', 'amy.williams@company.com', '+1-555-0203', 0),

-- Smart Office Energy Management (ID: 3)
(3, 'Sarah Williams', 'Business Owner', 'sarah.williams@company.com', '+1-555-0301', 1),
(3, 'David Kim', 'IT Owner', 'david.kim@company.com', '+1-555-0302', 0),
(3, 'Tom Richards', 'Facilities Manager', 'tom.richards@company.com', '+1-555-0303', 0),

-- Customer Feedback Loop System (ID: 4)
(4, 'Emily Chen', 'Business Owner', 'emily.chen@company.com', '+1-555-0401', 1),
(4, 'Lisa Park', 'IT Owner', 'lisa.park@company.com', '+1-555-0402', 0),

-- Mobile Expense Reporting App (ID: 5)
(5, 'Patricia Davis', 'Business Owner', 'patricia.davis@company.com', '+1-555-0501', 1),
(5, 'Alex Admin', 'IT Owner', 'alex.admin@company.com', '+1-555-0502', 0),
(5, 'Mark Thompson', 'Finance Director', 'mark.thompson@company.com', '+1-555-0503', 0),

-- Knowledge Base AI Assistant (ID: 6)
(6, 'Michael Brown', 'Business Owner', 'michael.brown@company.com', '+1-555-0601', 1),
(6, 'Mike Chen', 'IT Owner', 'mike.chen@company.com', '+1-555-0602', 0),

-- Supplier Performance Dashboard (ID: 7)
(7, 'Thomas Anderson', 'Business Owner', 'thomas.anderson@company.com', '+1-555-0701', 1),
(7, 'David Kim', 'IT Owner', 'david.kim@company.com', '+1-555-0702', 0),
(7, 'Susan Lee', 'Supply Chain Manager', 'susan.lee@company.com', '+1-555-0703', 0),

-- Automated Invoice Processing (ID: 8)
(8, 'Laura Thompson', 'Business Owner', 'laura.thompson@company.com', '+1-555-0801', 1),
(8, 'Lisa Park', 'IT Owner', 'lisa.park@company.com', '+1-555-0802', 0),
(8, 'Kevin Davis', 'AP Manager', 'kevin.davis@company.com', '+1-555-0803', 0),

-- Employee Skills Matrix (ID: 9)
(9, 'Karen Wilson', 'Business Owner', 'karen.wilson@company.com', '+1-555-0901', 1),
(9, 'Alex Admin', 'IT Owner', 'alex.admin@company.com', '+1-555-0902', 0),

-- Inventory Optimization System (ID: 10)
(10, 'James Miller', 'Business Owner', 'james.miller@company.com', '+1-555-1001', 1),
(10, 'Mike Chen', 'IT Owner', 'mike.chen@company.com', '+1-555-1002', 0),
(10, 'Rachel Green', 'Warehouse Manager', 'rachel.green@company.com', '+1-555-1003', 0),

-- Unified Communication Platform (ID: 11)
(11, 'Daniel Garcia', 'Business Owner', 'daniel.garcia@company.com', '+1-555-1101', 1),
(11, 'David Kim', 'IT Owner', 'david.kim@company.com', '+1-555-1102', 0),
(11, 'Paul Martinez', 'Change Management Lead', 'paul.martinez@company.com', '+1-555-1103', 0),

-- Customer Portal Self-Service (ID: 12)
(12, 'Sophia Rodriguez', 'Business Owner', 'sophia.rodriguez@company.com', '+1-555-1201', 1),
(12, 'Lisa Park', 'IT Owner', 'lisa.park@company.com', '+1-555-1202', 0),
(12, 'Chris Taylor', 'Customer Service Director', 'chris.taylor@company.com', '+1-555-1203', 0);

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
