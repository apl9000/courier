# GitHub Copilot Instructions for Courier

This repository contains Courier, a Deno/Node.js email utility with Handlebars templating and
runtime CSS generation with theme support.

## Code Style

- Use TypeScript strict mode with explicit types
- Follow Deno conventions and standards
- No `any` types - use proper typing or `unknown`
- Use named exports except in mod.ts
- Files: kebab-case, Classes: PascalCase, Functions: camelCase
- Add JSDoc comments for public APIs
- Import from `jsr:` or `npm:` as configured in deno.json

## Email Template Design

- Maintain monospace/brutalist design aesthetic (DefaultTheme)
- Use only black (#000), white (#fff), and gray (#666, #eee) colors by default
- Never add gradients, shadows, or purple tones unless using custom theme
- Typography: ui-monospace font stack, 1.5 line-height
- Borders: 2px standard, 6px double for dividers
- Follow existing CSS class patterns in src/email-styles.ts
- Always use semantic email-\* class names (email-button, email-heading, etc.)
- All template copy must come from variables - no hard-coded text in .hbs files
- Newsletter images support left, right, and hero layouts

## Email Client Compatibility

- Use table-based layouts for email wrapper with proper height chain (html → body → table → td)
- Always set background colors on body, table, and td elements
- Inline all CSS in <style> tags (no external stylesheets)
- Use width="100%" and explicit dimensions
- Container uses min-height: 100vh for full viewport height
- Buttons use backgroundAlt for better contrast
- Test changes in multiple email clients (Gmail, Outlook, Apple Mail)

## Development Workflow

- Run `deno task snapshots` to regenerate snapshots after template changes
- Run tests with `deno task test` before committing
- Use `deno task check` for type checking
- Follow existing test patterns in tests/ directory
- Update src/email-styles.ts when adding new CSS classes or themes

## Testing Requirements

- Write unit tests for all template rendering
- Create integration tests for new email types
- Add snapshot tests to validate HTML output
- Ensure snapshots validate monospace styling
- Test files should import from tests/test-utils.ts for shared config

## When Adding New Features

- Create TypeScript types in src/types.ts with optional text override properties
- Add template file in src/emails/templates/ (all copy from variables)
- Add render and send methods to Courier class
- Register any new Handlebars helpers in Courier constructor
- Create integration test file in tests/ with all required fields
- Update generate-snapshots.ts script
- Regenerate snapshots to validate output
- Update README.md with usage examples
- Update ARCHITECTURE.md if architecture changes

## Security

- Never commit SMTP credentials or secrets
- Use environment variables for sensitive data
- Sanitize user input (Handlebars auto-escapes)
- Validate email addresses before sending
- Keep dependencies updated for security patches

## Documentation

- Update README.md for user-facing changes
- Update CLAUDE.md and AGENTS.md for development guidance
- Add inline comments only for complex logic
- Keep JSDoc comments up to date
- Document new CSS classes and their purpose

## Common Commands

```bash
# Run all tests
deno task test

# Generate snapshots
deno task snapshots

# Type check
deno task check

# Format code
deno task fmt

# Lint code
deno task lint
```

## Design Tokens

Available in src/email-styles.ts:

- EmailClasses: CSS class name constants
- EmailStyles: Inline style objects
- EmailColors: Color palette (black/white/gray)
- EmailTokens: Typography, spacing, border values

## File Organization

- src/courier.ts - Main class
- src/types.ts - Type definitions
- src/email-styles.ts - Theme system and runtime CSS generation
- src/emails/layouts/ - Email layouts
- src/emails/partials/ - Reusable components
- src/emails/templates/ - Email templates
- tests/ - Test files

## Remember

- Always preserve monospace aesthetic in email designs (DefaultTheme)
- All template text must come from variables with sensible defaults
- Regenerate snapshots after modifying templates
- Test integration with actual SMTP before merging
- Keep email templates simple and compatible
- Follow existing patterns for consistency
- DarkTheme uses system background colors (#0d1117) for seamless integration

## Commit Messages

All commits must follow **[Conventional Commits](https://www.conventionalcommits.org/)** format:

```
<type>[optional scope][!]: <description>
```

**Valid types**: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`

**Version bumps**:

- Major (x.0.0): `feat!:`, `fix!:`, or `BREAKING CHANGE:` in body
- Minor (0.x.0): `feat:`
- Patch (0.0.x): `fix:`, `chore:`, `docs:`, etc.

**Examples**:

- `feat: add dark theme support`
- `fix: resolve SMTP timeout issue`
- `chore: update dependencies`
- `feat!: redesign theme API` (breaking change)

See [CONTRIBUTING.md](../CONTRIBUTING.md) for full guidelines.
