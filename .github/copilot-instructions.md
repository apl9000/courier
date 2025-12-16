# GitHub Copilot Instructions for Courier

This repository contains Courier, a Deno/Node.js email utility with Handlebars templating and Tailwind CSS styling.

## Code Style

- Use TypeScript strict mode with explicit types
- Follow Deno conventions and standards
- No `any` types - use proper typing or `unknown`
- Use named exports except in mod.ts
- Files: kebab-case, Classes: PascalCase, Functions: camelCase
- Add JSDoc comments for public APIs
- Import from `jsr:` or `npm:` as configured in deno.json

## Email Template Design

- Maintain monospace/brutalist design aesthetic
- Use only black (#000), white (#fff), and gray (#666, #eee) colors
- Never add gradients, shadows, or purple tones
- Typography: ui-monospace font stack, 1.20rem line-height
- Borders: 2px standard, 6px double for dividers
- Follow existing CSS class patterns in styles/input.css
- Always use semantic email-\* class names (email-button, email-heading, etc.)

## Email Client Compatibility

- Use table-based layouts for email wrapper
- Always set background colors on body, table, and td elements
- Inline all CSS in <style> tags (no external stylesheets)
- Use width="100%" and explicit dimensions
- Test changes in multiple email clients (Gmail, Outlook, Apple Mail)

## Development Workflow

- Run `deno task build:css` after changing styles or tailwind.config.js
- Run `deno run --allow-read --allow-write --allow-env tests/generate-snapshots.ts` to regenerate snapshots
- Run tests with `deno task test` before committing
- Use `deno task check` for type checking
- Follow existing test patterns in tests/ directory

## Testing Requirements

- Write unit tests for all template rendering
- Create integration tests for new email types
- Add snapshot tests to validate HTML output
- Ensure snapshots validate monospace styling
- Test files should import from tests/test-utils.ts for shared config

## When Adding New Features

- Create TypeScript types in src/types.ts
- Add template file in src/emails/templates/
- Add render and send methods to Courier class
- Create integration test file in tests/
- Update generate-snapshots.ts script
- Rebuild CSS and generate snapshots
- Update README.md with usage examples
- Document new classes in AGENTS.md

## Security

- Never commit SMTP credentials or secrets
- Use environment variables for sensitive data
- Sanitize user input (Handlebars auto-escapes)
- Validate email addresses before sending
- Keep dependencies updated for security patches

## Documentation

- Update README.md for user-facing changes
- Update AGENTS.md for development guidance
- Add inline comments only for complex logic
- Keep JSDoc comments up to date
- Document new CSS classes and their purpose

## Common Commands

```bash
# Build CSS
deno task build:css

# Run all tests
deno task test

# Generate snapshots
deno run --allow-read --allow-write --allow-env tests/generate-snapshots.ts

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
- src/email-styles.ts - Design tokens
- src/emails/layouts/ - Email layouts
- src/emails/partials/ - Reusable components
- src/emails/templates/ - Email templates
- tests/ - Test files
- styles/ - Tailwind CSS source and output

## Remember

- Always preserve monospace aesthetic in email designs
- Run CSS build before generating snapshots
- Test integration with actual SMTP before merging
- Keep email templates simple and compatible
- Follow existing patterns for consistency
