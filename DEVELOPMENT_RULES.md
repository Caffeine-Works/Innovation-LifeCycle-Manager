# Development Rules

## Required Process for Every Development Step

### #1 Write the Code
- Include **inline documentation** (JSDoc for functions, clear comments)
- Write **unit tests** for new functionality
- Follow existing code style and patterns
- Use TypeScript types where applicable

### #2 Test Before Commit
- Developer must test the implementation
- Verify all acceptance criteria are met
- Run existing tests to ensure no regressions
- Get explicit approval: "this works" or "commit this"

### #3 Commit to Git
- Only commit after explicit approval
- Every commit **MUST update GitHub Issues**
- Use commit message format that references issues
- Follow co-authorship attribution

---

## GitHub Issues Integration

GitHub Issues are the **single source of truth** for project tasks. The TodoWrite tool (session todo list) must stay synchronized with GitHub Issues.

### TodoWrite ↔ GitHub Issues Synchronization

**At Session Start**:
1. Fetch current open issues from GitHub:
   ```bash
   gh issue list --state open --json number,title,state
   ```
2. Load these issues into TodoWrite to track work during the session
3. Match TodoWrite items to issue numbers (e.g., "Implement Authentication - Issue #4")

**During Development**:
1. Update TodoWrite status as you work (pending → in_progress → completed)
2. Keep issue references in TodoWrite items (e.g., "Issue #4", "Issue #5")
3. One TodoWrite item per GitHub Issue for major features

**After Completing Work**:
1. Use `gh` commands to update GitHub Issues directly:
   ```bash
   # Add progress comment to issue
   gh issue comment 4 --body "Login page completed with email dropdown"

   # Close completed issue
   gh issue close 4 --comment "Authentication fully implemented and tested"
   ```
2. Commit messages automatically update issues via keywords (see below)

**Important**:
- Do NOT use GITHUB_ISSUES_INIT.md as an intermediary
- GitHub Issues are updated via `gh` CLI commands or commit message keywords
- TodoWrite is session-only and helps track immediate work

### Commit Message Format
```
<type>: <description>

Closes #<issue-number>
Updates #<issue-number>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Julien <32256332+Gouliath1@users.noreply.github.com>
```

### Required Actions Per Commit
1. Reference the GitHub Issue being worked on
2. Update issue status/comments via commit message keywords:
   - `Closes #123` - Closes the issue
   - `Fixes #123` - Closes the issue (bug fix)
   - `Updates #123` - Adds comment to issue
   - `Relates to #123` - Links without closing

### GitHub Issue Workflow
1. **Before starting work**: Check open issues
   ```bash
   gh issue list --state open
   ```

2. **During development**: Reference issue in commits
   ```bash
   git commit -m "feat: Add authentication

   Updates #4 - Implemented login flow

   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   Co-Authored-By: Julien <32256332+Gouliath1@users.noreply.github.com>"
   ```

3. **After commit**: Verify issue was updated
   ```bash
   gh issue view 4
   ```

---

## Code Quality Standards

### Documentation
- All public functions must have JSDoc comments
- Complex logic must have inline comments explaining "why"
- README.md updates for new features

### Testing
- Unit tests for all business logic
- Integration tests for API endpoints
- Test coverage target: 80%+

### Style
- Follow existing patterns in codebase
- Use Prettier/ESLint configuration
- No console.log in production code

---

## Git Commit Guidelines

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style/formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Commit Requirements
- Clear, descriptive messages
- Reference GitHub Issues
- Include co-authorship for AI-assisted work
- One logical change per commit

---

## Never Commit Without
1. ✅ Testing completed
2. ✅ Developer approval received
3. ✅ GitHub Issue referenced
4. ✅ Documentation updated
5. ✅ Tests passing

---

*Last Updated: 2025-11-07*
*TodoWrite/GitHub Issues sync workflow added*
