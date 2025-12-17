# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Project Overview

Courier is a Deno email utility that integrates SMTP (iCloud and Microsoft Outlook), Nodemailer, and
Handlebars templating. It's published to JSR as `@rivescloud/courier` and also available via npm.

## Common Commands

```bash
# Development
deno task dev              # Run with required permissions
deno task check            # Type check all files

# Testing
deno task test             # All tests (unit + theme + snapshot tests)
deno task test:unit        # Unit tests only
deno task test:themes      # Theme-specific tests
deno task test:snapshots   # Snapshot validation tests
deno task test:integration # Integration tests (requires SMTP env vars)
deno task snapshots        # Generate HTML snapshots for templates

# Linting and formatting
deno task lint
deno task fmt
deno task fmt:check        # Check formatting without modifying
```

## Architecture

### Entry Point and Exports

- `mod.ts` - Main entry point, exports `Courier` class, types, `SMTPProviders`, and theme utilities
- All public types are defined in `src/types.ts`
- Named exports throughout (except mod.ts)

### Core Components

- `src/courier.ts` - Main `Courier` class with SMTP transport (Nodemailer), template rendering
  (Handlebars), and Handlebars helper registration
- `src/types.ts` - TypeScript interfaces for config, email messages, and template data types with
  optional text override properties
- `src/email-styles.ts` - Design tokens, theme system, and runtime CSS generation (no build step)

### Email Templates (src/emails/)

- `layouts/main.hbs` - Base HTML layout wrapper
- `partials/` - Reusable components (header, footer, head with styles)
- `templates/` - Email templates: welcome, email-verification, password-reset, notification,
  newsletter, unsubscribe

### Template Loading

Templates must be loaded before use, either via `templatesDir` config or `loadTemplate()`. The
`Courier.initialize()` factory method handles automatic loading from a directory including partials
and layouts.

### Handlebars Helpers

Registered in Courier constructor:

- `eq` - Equality comparison for conditional layouts (e.g., `{{#if (eq image.layout "hero")}}`)

All template text comes from variables with optional overrides and sensible defaults.

## Code Style

- TypeScript strict mode, no `any` types
- Files: kebab-case, Classes: PascalCase, Functions: camelCase
- JSDoc comments for public APIs
- Import from `jsr:` or `npm:` as configured in deno.json

## Email Design Guidelines

- **Monospace/brutalist aesthetic**: ui-monospace font stack, 1.5 line-height
- **Color palette**: Black (#000), white (#fff), and gray (#666, #eee) only
- **No gradients, shadows, or purple tones**
- **Borders**: 2px standard, 6px double for dividers
- **Email-safe patterns**: Table-based layouts with height chain (html → body → table → td), inline
  CSS, explicit dimensions
- **Container**: Full viewport height (100vh), centered, left-aligned text
- **Buttons**: Use backgroundAlt for better contrast
- **Images**: Newsletter supports left, right, and hero layouts
- Use semantic `email-*` class names (email-button, email-heading, etc.)
- **All template text must come from variables** - no hard-coded copy in .hbs files
- **DarkTheme**: Uses system colors (#0d1117) for seamless integration

## Adding New Features

1. Create TypeScript types in `src/types.ts` with optional text override properties
2. Add template file in `src/emails/templates/` (all copy from variables with defaults)
3. Add render and send methods to Courier class
4. Register any new Handlebars helpers in Courier constructor (e.g., `eq` for conditionals)
5. Create integration test in `tests/` with all required fields
6. Update `tests/generate-snapshots.ts`
7. Run `deno task snapshots` to generate HTML snapshots
8. Update README.md with usage examples

## Environment Variables for Testing

Set in `.env` file (git-ignored) or shell:

- `SMTP_HOST` - SMTP server host (default: smtp.mail.me.com)
- `SMTP_USER` - Your SMTP username
- `SMTP_PASS` - App-specific password
- `SMTP_FROM` - Default from address (falls back to SMTP_USER)
- `SMTP_TEST_TO` - Comma-separated list of test recipients (falls back to SMTP_USER)

Integration tests require `--allow-env` permission (Nodemailer reads env vars during import).
