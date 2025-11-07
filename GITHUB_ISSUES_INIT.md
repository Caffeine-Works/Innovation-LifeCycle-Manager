# GitHub Issues Initialization

## Required Issues to Create

Create these issues at: https://github.com/Caffeine-Works/Innovation-LifeCycle-Manager/issues

---

### Issue #1: Implement Authentication (P0)
**Labels**: `enhancement`, `P0`

**Description**:
Implement simple authentication for demo with hardcoded users.

**Requirements**:
- Login page with email selection (no password for demo)
- Hardcoded users: employee@demo.com, reviewer@demo.com, admin@demo.com
- Store user in React context
- Show user name in header
- Protect routes requiring authentication

**Acceptance Criteria**:
- [ ] User can select email from dropdown
- [ ] User info stored in context
- [ ] Username displayed in header
- [ ] Unauthenticated users redirected to login

**Related**: DEMO_SCOPE.md - Epic 1

---

### Issue #2: Stage Transition & Approval Workflow (P0)
**Labels**: `enhancement`, `P0`

**Description**:
Implement initiative progression through lifecycle stages with approval workflow.

**Requirements**:
- "Request Stage Transition" button for initiative owners
- "Pending Approvals" view for reviewers
- Approve/reject actions
- Update initiative stage on approval
- Backend API endpoints for transitions

**Acceptance Criteria**:
- [ ] Owner can request stage transition
- [ ] Reviewer sees pending requests
- [ ] Reviewer can approve/reject
- [ ] Initiative moves to new stage on approval
- [ ] Audit log of transitions

**Related**: DEMO_SCOPE.md - Epic 4

---

### Issue #3: AI Duplicate Detection (P0)
**Labels**: `enhancement`, `P0`, `ai`

**Description**:
Integrate Claude API for duplicate detection on idea submission.

**Requirements**:
- Call Claude API when submitting new idea
- Analyze title, description, problem statement
- Show warning modal if similarity > 70%
- Allow user to proceed anyway or cancel
- Backend endpoint for AI duplicate check

**Acceptance Criteria**:
- [ ] API call on idea submission
- [ ] Similarity analysis working
- [ ] Warning modal shows similar initiatives
- [ ] User can proceed with justification
- [ ] Duplicate check logged

**Related**: DEMO_SCOPE.md - Epic 5

---

### Issue #4: Add Unit Tests for Core Features (P1)
**Labels**: `testing`, `P1`

**Description**:
Add comprehensive unit tests for backend and frontend.

**Requirements**:
- Backend: API endpoint tests
- Backend: Model/controller tests
- Frontend: Component tests (React Testing Library)
- Test coverage > 80%

**Acceptance Criteria**:
- [ ] Backend tests for initiatives API
- [ ] Backend tests for auth
- [ ] Frontend tests for main components
- [ ] CI/CD integration

---

### Issue #5: Add Category Filtering on Kanban Board (P1)
**Labels**: `enhancement`, `P1`

**Description**:
Allow users to filter initiatives by category on the board.

**Requirements**:
- Filter dropdown/buttons above board
- Filter by: Technology, Process, Product, Other
- Update board display based on filter
- Preserve filter state in URL

**Acceptance Criteria**:
- [ ] Filter UI component added
- [ ] Filtering logic implemented
- [ ] URL state management
- [ ] Clear filter option

---

### Issue #6: Improve Error Handling and User Feedback (P1)
**Labels**: `enhancement`, `P1`

**Description**:
Add better error messages, loading states, and user feedback throughout the app.

**Requirements**:
- Consistent error message styling
- Loading spinners for async operations
- Success toast notifications
- Form validation feedback

**Acceptance Criteria**:
- [ ] Error boundaries in React
- [ ] Loading states on all async actions
- [ ] Toast notification system
- [ ] Inline form validation

---

## How to Create Issues

### Option 1: GitHub Web UI
1. Go to https://github.com/Caffeine-Works/Innovation-LifeCycle-Manager/issues
2. Click "New Issue"
3. Copy title and description from above
4. Add labels
5. Click "Submit new issue"

### Option 2: GitHub CLI (if installed)
```bash
gh issue create --title "Implement Authentication (P0)" \
  --body "$(cat <<'EOF'
Implement simple authentication for demo with hardcoded users.

**Requirements**:
- Login page with email selection (no password for demo)
...
EOF
)" \
  --label "enhancement,P0"
```

---

*Once created, all commits should reference these issue numbers*
