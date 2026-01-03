# Contributing to Courier

Thank you for your interest in contributing to Courier! This document provides guidelines for
contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Git Workflow](#git-workflow)
- [Branch Naming](#branch-naming)
- [Commit Message Conventions](#commit-message-conventions)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [Code Style Guidelines](#code-style-guidelines)

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/courier.git
   cd courier
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/apl9000/courier.git
   ```
4. **Install Deno** (if not already installed):
   ```bash
   curl -fsSL https://deno.land/x/install/install.sh | sh
   ```

## Development Setup

1. **Install dependencies**:

   ```bash
   deno install
   ```

2. **Set up environment variables** for testing (create a `.env` file):

   ```bash
   SMTP_HOST=smtp.mail.me.com
   SMTP_USER=your-email@icloud.com
   SMTP_PASS=your-app-specific-password
   SMTP_FROM=your-email@icloud.com
   SMTP_TEST_TO=test-recipient@example.com
   ```

3. **Run tests** to verify setup:

   ```bash
   deno task test
   ```

4. **Check code quality**:
   ```bash
   deno task fmt        # Format code
   deno task lint       # Lint code
   deno task check      # Type check
   ```

## Git Workflow

1. **Keep your fork in sync** with upstream:

   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Make your changes** and commit using [conventional commits](#commit-message-conventions)

4. **Push to your fork**:

   ```bash
   git push origin feat/your-feature-name
   ```

5. **Open a Pull Request** on GitHub

## Branch Naming

While we don't enforce strict branch naming rules, we recommend following these conventions for
clarity:

### Recommended Patterns

- **Features**: `feat/description` or `feature/description`
  - Example: `feat/add-custom-theme-support`
- **Bug Fixes**: `fix/description`
  - Example: `fix/smtp-connection-timeout`
- **Chores**: `chore/description`
  - Example: `chore/update-dependencies`
- **Documentation**: `docs/description`
  - Example: `docs/improve-readme`
- **Refactoring**: `refactor/description`
  - Example: `refactor/template-rendering`

### Branch Naming Tips

- Use lowercase and hyphens (kebab-case)
- Keep branch names concise but descriptive
- Avoid special characters except hyphens
- Don't include issue numbers in branch names (reference them in commits/PRs instead)

## Commit Message Conventions

**Courier uses [Conventional Commits](https://www.conventionalcommits.org/)** to automate semantic
versioning and release notes generation.

### Format

```
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

| Type       | Description                            | Version Bump      |
| ---------- | -------------------------------------- | ----------------- |
| `feat`     | New feature                            | **Minor** (0.x.0) |
| `fix`      | Bug fix                                | **Patch** (0.0.x) |
| `chore`    | Maintenance tasks (deps, config, etc.) | **Patch** (0.0.x) |
| `docs`     | Documentation changes                  | **Patch** (0.0.x) |
| `style`    | Code style/formatting changes          | **Patch** (0.0.x) |
| `refactor` | Code refactoring (no behavior change)  | **Patch** (0.0.x) |
| `perf`     | Performance improvements               | **Patch** (0.0.x) |
| `test`     | Test changes                           | **Patch** (0.0.x) |
| `build`    | Build system changes                   | **Patch** (0.0.x) |
| `ci`       | CI/CD changes                          | **Patch** (0.0.x) |

### Breaking Changes

To indicate a **breaking change** and trigger a **major version bump** (x.0.0):

**Option 1:** Add `!` after the type/scope:

```
feat!: redesign email template API
fix(smtp)!: change SMTP configuration format
```

**Option 2:** Include `BREAKING CHANGE:` in the commit body:

```
feat: redesign email template API

BREAKING CHANGE: Template API now requires ThemeConfig instead of CSS string
```

### Examples

**Feature (Minor Version Bump):**

```
feat: add dark theme support

Implement DarkTheme preset with system background colors for
seamless email client integration.
```

**Bug Fix (Patch Version Bump):**

```
fix: resolve SMTP connection timeout issue

Increase default connection timeout from 5s to 30s to handle
slower SMTP servers.

Closes #42
```

**Breaking Change (Major Version Bump):**

```
feat!: redesign theme configuration API

BREAKING CHANGE: ThemeConfig now uses nested structure instead
of flat properties. Update your theme configurations:

Before:
  theme: { textColor: '#000', bgColor: '#fff' }

After:
  theme: { colors: { text: '#000', background: '#fff' } }
```

**Documentation Update (Patch Version Bump):**

```
docs: add examples for custom theme usage

Add code examples showing how to create and use custom themes
in the Quick Start section.
```

### Commit Message Rules

- **First line** (header):
  - 72 characters max
  - Lowercase type and description
  - No period at the end
  - Imperative mood ("add" not "added" or "adds")
- **Body** (optional):
  - Separate from header with blank line
  - Wrap at 72 characters
  - Explain what and why, not how
- **Footer** (optional):
  - Reference issues: `Closes #123`, `Fixes #456`
  - Breaking changes: `BREAKING CHANGE: description`

### Important Notes

- **All commits to `main` must follow this format** - the release workflow will fail otherwise
- **PRs are squashed** on merge, so the final commit message must be conventional
- **Automated releases** analyze the commit message to determine version bumps
- **Invalid format** will cause the release workflow to fail with a clear error message

## Pull Request Process

1. **Ensure all tests pass**:

   ```bash
   deno task test           # All tests
   deno task test:unit      # Unit tests only
   deno task snapshots      # Generate snapshots
   deno task test:snapshots # Validate snapshots
   ```

2. **Check code quality**:

   ```bash
   deno task fmt:check      # Check formatting
   deno task lint           # Lint code
   deno task check          # Type check
   ```

3. **Update documentation** if needed:

   - README.md for user-facing changes
   - AGENTS.md for architecture/development changes
   - JSDoc comments for API changes
   - Inline comments for complex logic

4. **Regenerate snapshots** if templates or styles changed:

   ```bash
   deno task snapshots
   ```

5. **Write a clear PR description**:

   - What changes were made
   - Why the changes are needed
   - How to test the changes
   - Any breaking changes or migrations required
   - Screenshots/examples if applicable

6. **Use conventional commit format** in PR title (PRs are squashed on merge)

7. **Request review** from maintainers

8. **Address review feedback** by pushing new commits to your branch

9. **Squash and merge** - Maintainers will squash commits on merge, ensuring the final commit
   follows conventional commits

### PR Checklist

- [ ] Tests pass locally (`deno task test`)
- [ ] Code is formatted (`deno task fmt`)
- [ ] Code is linted (`deno task lint`)
- [ ] Types are valid (`deno task check`)
- [ ] Snapshots regenerated if needed (`deno task snapshots`)
- [ ] Documentation updated
- [ ] PR title follows conventional commits format
- [ ] Changes tested in multiple email clients (for template changes)

## Testing Requirements

### Unit Tests

- Write unit tests for all new template rendering logic
- Test files: `src/**/*.spec.ts`
- Run: `deno task test:unit`

### Integration Tests

- Add integration tests for new email templates
- Test files: `tests/**/*.integration.spec.ts`
- Run: `deno task test:integration` (requires SMTP credentials)

### Snapshot Tests

- Generate snapshots for template changes
- Run: `deno task snapshots`
- Validate: `deno task test:snapshots`
- Snapshots stored in: `tests/snapshots/*.html`

### Coverage Threshold

- Maintain **90% code coverage** minimum
- Run coverage: `deno task coverage`
- Coverage is checked automatically in CI/CD

### Email Client Testing

For template or style changes, test in:

- Gmail (web and mobile)
- Outlook (desktop and web)
- Apple Mail
- Other major email clients

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** - All type checks enforced
- **No `any` types** - Use proper types or `unknown`
- **Explicit return types** - On public methods
- **Named exports** - No default exports except in `mod.ts`

### Naming Conventions

- **Files**: kebab-case (`email-styles.ts`)
- **Classes**: PascalCase (`Courier`, `SMTPProviders`)
- **Functions**: camelCase (`sendEmail`, `renderTemplate`)
- **Constants**: SCREAMING_SNAKE_CASE (`DEFAULT_THEME`, `EMAIL_CLASSES`)
- **Types/Interfaces**: PascalCase (`EmailConfig`, `TemplateData`)

### Email Design Principles

- Maintain monospace/brutalist design aesthetic (DefaultTheme)
- Use only black (#000), white (#fff), and gray (#666, #eee) colors by default
- Never add gradients, shadows, or purple tones unless using custom theme
- Typography: ui-monospace font stack, 1.5 line-height
- Borders: 2px standard, 6px double for dividers
- All template copy must come from variables - no hard-coded text in `.hbs` files
- Use semantic email-\* class names (`email-button`, `email-heading`, etc.)

### Comments

- **JSDoc for public APIs**:
  ```typescript
  /**
   * Send a welcome email to a new user
   * @param options - Email configuration
   * @returns Promise that resolves when email is sent
   */
  async sendWelcomeEmail(options: WelcomeEmailOptions): Promise<void>
  ```
- **Inline comments**: Only for complex logic
- **Template comments**: Use Handlebars `{{!-- comment --}}` syntax

## Questions?

- Check [README.md](README.md) for setup and usage documentation
- Check [AGENTS.md](AGENTS.md) for detailed development guidance
- Open an issue on GitHub for questions or discussions

## License

By contributing to Courier, you agree that your contributions will be licensed under the
[MIT License](LICENSE).

---

**Thank you for contributing to Courier!** 🎉
