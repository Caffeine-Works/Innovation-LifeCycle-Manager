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

### Commit Message Format
```
<type>: <description>

Closes #<issue-number>
Updates #<issue-number>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
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

   Updates #5 - Implemented login flow

   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   Co-Authored-By: Claude <noreply@anthropic.com>"
   ```

3. **After commit**: Verify issue was updated
   ```bash
   gh issue view 5
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
