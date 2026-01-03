# Architecture

This document provides a detailed overview of Courier's architecture, components, and design
decisions.

## Overview

Courier is a Deno/Node.js email utility built with a focus on:

- **Simplicity**: Clean, minimal API surface
- **Type Safety**: Full TypeScript support with strict mode
- **Email Client Compatibility**: Table-based layouts, inline CSS, tested across clients
- **Runtime Flexibility**: Dynamic theme system without build steps
- **Developer Experience**: Semantic CSS classes, template customization, comprehensive testing

## Tech Stack

- **Runtime**: Deno (primary), Node.js (compatible via JSR)
- **Email Delivery**: Nodemailer v6.9.7 (SMTP transport)
- **Templating**: Handlebars v4.7.8 (layouts, partials, helpers)
- **Styling**: Runtime CSS generation from theme configuration
- **Testing**: Deno's built-in test runner with snapshot testing
- **Package Registry**: JSR (JavaScript Registry)

## Project Structure

```
/
├── mod.ts                      # Main entry point (exports Courier, types, utilities)
├── src/
│   ├── courier.ts              # Courier class (SMTP, template rendering)
│   ├── types.ts                # TypeScript type definitions
│   ├── email-styles.ts         # Theme system and CSS generation
│   └── emails/
│       ├── layouts/
│       │   └── main.hbs        # Base HTML wrapper
│       ├── partials/
│       │   ├── head.hbs        # <head> with inline CSS
│       │   ├── header.hbs      # Email header component
│       │   └── footer.hbs      # Email footer component
│       └── templates/
│           ├── welcome.hbs
│           ├── email-verification.hbs
│           ├── password-reset.hbs
│           ├── notification.hbs
│           ├── newsletter.hbs
│           └── unsubscribe.hbs
├── tests/
│   ├── test-utils.ts           # Shared test configuration
│   ├── generate-snapshots.ts   # Snapshot generation script
│   ├── snapshots/              # HTML snapshots for validation
│   ├── *.spec.ts               # Unit tests (theme, snapshot)
│   └── *.integration.spec.ts   # Integration tests (per template)
└── deno.json                   # Deno configuration
```

## Core Components

### Entry Point (`mod.ts`)

Main module exports:

- `Courier` class
- `SMTPProviders` configuration
- All TypeScript types (interfaces, types)
- Theme utilities: `DefaultTheme`, `DarkTheme`, `ProfessionalTheme`, `ColorfulTheme`, `createTheme`,
  `mergeTheme`

Uses **named exports** throughout (no default exports) for better tree-shaking and IDE support.

### Courier Class (`src/courier.ts`)

Central orchestrator for email operations:

**Responsibilities:**

- SMTP transport management (Nodemailer)
- Handlebars template rendering
- Theme-based CSS generation
- Template and partial registration
- Email sending with retry logic

**Key Methods:**

- `initialize()` - Factory method for async setup (loads templates)
- `send()` - Core email sending
- `sendWithTemplate()` - Render and send templated email
- Template-specific methods: `sendWelcomeEmail()`, `sendPasswordReset()`, etc.
- `registerTemplate()`, `loadTemplate()` - Template management
- `verify()` - SMTP connection validation
- `close()` - Cleanup and disconnect

**Design Decisions:**

- Factory pattern (`initialize()`) for async template loading
- Handlebars helpers registered in constructor (`eq` for conditionals)
- Template directory auto-discovery for layouts and partials
- Graceful error handling with descriptive messages

### Type System (`src/types.ts`)

Complete TypeScript definitions for:

**Configuration Types:**

- `CourierConfig` - Main configuration interface
- `SMTPConfig` - SMTP connection settings
- `ThemeConfig` - Runtime theme customization

**Email Types:**

- `EmailAddress` - String or `{email, name}` object
- `EmailMessage` - Core email fields (to, subject, html, etc.)
- `EmailOptions` - Combined message + template data
- `SendResult` - Nodemailer response wrapper

**Template Data Types:**

- `BaseEmailData` - Shared fields (companyName, companyAddress, year, lang)
- `WelcomeEmailData`, `EmailVerificationData`, `PasswordResetData`, etc.

**Design Decisions:**

- All template data interfaces extend `BaseEmailData`
- Optional text override properties with sensible defaults
- Flexible `EmailAddress` type (string or object)
- Strict typing with no `any` types

### Theme System (`src/email-styles.ts`)

Runtime CSS generation without build steps:

**Components:**

- `ThemeConfig` interface - Define colors, typography, spacing, borders, container
- `DefaultTheme` - Monospace/brutalist preset (black/white/gray)
- `DarkTheme` - System dark mode preset (#0d1117 background)
- `ProfessionalTheme` - Clean sans-serif preset
- `ColorfulTheme` - Vibrant accent colors
- `mergeTheme()` - Deep merge custom with defaults
- `generateThemedCSS()` - Generate CSS from theme config

**CSS Class System:**

- Layout: `.email-container`
- Typography: `.email-heading`, `.email-subheading`, `.email-body`, `.email-text-alt`
- Components: `.email-button`, `.email-link`, `.email-divider`, `.email-box`, `.email-code`
- Images: `.email-image-hero`, `.email-image-inline`, `.email-section-image-left/right`
- Utilities: `.email-section`, `.email-spacing-none`, `.email-text-center`

**Design Decisions:**

- Semantic class names (`email-*` prefix)
- Runtime generation for flexibility
- Preset themes for common use cases
- Deep merge strategy (custom overrides defaults)
- No build step required

### Handlebars Templates

**Layout System:**

- `layouts/main.hbs` - Base HTML wrapper with table-based layout
- Table structure for email client compatibility (html → body → table → td)
- Full viewport height (100vh) for proper rendering
- Inline CSS in `<style>` tag via `{{{emailStyles}}}`

**Partials:**

- `head.hbs` - HTML head with meta tags and inline CSS
- `header.hbs` - Email header with title/logo support
- `footer.hbs` - Email footer with company info and unsubscribe

**Templates:**

- Six built-in templates: welcome, email-verification, password-reset, notification, newsletter,
  unsubscribe
- All text content from variables (no hard-coded copy)
- Optional text override properties in data interfaces
- Image support with layout options (left, right, hero)

**Handlebars Helpers:**

- `eq(a, b)` - Equality comparison for conditionals (e.g., `{{#if (eq layout "hero")}}`)

**Design Decisions:**

- Layouts + partials + templates for modularity
- Table-based layout for Outlook compatibility
- All styles inline for email client support
- Helpers registered in Courier constructor
- Template loading via factory pattern

## Email Client Compatibility

### Strategy

1. **Table-based layouts** - Wrapper table with height chain (html → body → table → td)
2. **Inline CSS** - All styles in `<style>` tag (no external stylesheets)
3. **Explicit dimensions** - `width="100%"` on tables, explicit heights
4. **Background colors** - Set on body, table, and td for consistency
5. **No external resources** - Embed all CSS, no CDN links
6. **Monospace-safe fonts** - ui-monospace stack with fallbacks

### Known Limitations

- **Outlook Desktop** - Limited CSS support (tested with tables)
- **Gmail Mobile** - May strip margin/padding (use padding on td)
- **Dark Mode** - DarkTheme uses system colors for seamless integration

### Testing Approach

- HTML snapshots for visual inspection
- Integration tests for actual SMTP delivery
- Manual testing in Gmail, Outlook, Apple Mail
- Dark mode testing with DarkTheme preset

## Testing Architecture

### Test Layers

1. **Unit Tests** (`src/*.spec.ts`)
   - Template rendering
   - Theme generation
   - Type validation
   - No SMTP required

2. **Integration Tests** (`tests/*.integration.spec.ts`)
   - Actual SMTP delivery
   - Multi-recipient testing
   - Error handling
   - Requires SMTP credentials (optional via env vars)

3. **Snapshot Tests** (`tests/snapshots.spec.ts`)
   - HTML output validation
   - Monospace styling verification
   - CSS class presence checks
   - Generated via `deno task snapshots`

### Test Utilities (`tests/test-utils.ts`)

Shared configuration:

- SMTP config from environment variables
- Credential detection (`hasCredentials`)
- Multi-recipient support (`SMTP_TEST_TO`)
- Common test data factories

### Coverage Requirements

- **90% minimum coverage** (enforced in CI/CD)
- Unit tests for all template rendering
- Integration tests for each email template
- Snapshot validation after template changes

## Security Considerations

### SMTP Credentials

- Environment variables only (never committed)
- App-specific passwords for iCloud/Gmail
- `.env` file git-ignored
- Production secrets in secret management service

### Email Content

- Handlebars auto-escapes by default
- Email address validation before sending
- Rate limiting recommended for production
- SPF/DKIM records for production domains

### Dependencies

- Regular security updates
- Pinned versions in `deno.json`
- Audit npm packages for vulnerabilities

## Design Principles

### Monospace/Brutalist Aesthetic

**Typography:**

- Font stack:
  `ui-monospace, SFMono-Regular, Monaco, Consolas, Liberation Mono, Courier New, monospace`
- Base size: 16px
- Line height: 1.20rem (consistent vertical rhythm)
- Font weights: 500 (normal), 600 (medium), 800 (bold)

**Colors:**

- Text: #000000 (black), #666666 (gray)
- Background: #ffffff (white), #eeeeee (light gray)
- No gradients, no shadows, no purple tones

**Spacing:**

- Base unit: 1.20rem (line height)
- Consistent grid-based spacing

**Borders:**

- Standard: 2px solid black
- Thick: 3px (footer borders)
- Double: 6px (dividers)

### Email Design Guidelines

1. **Maintain monospace aesthetic** (DefaultTheme)
2. **Use semantic class names** (`email-button`, `email-heading`)
3. **All text from variables** (no hard-coded copy in .hbs files)
4. **Table-based layouts** for client compatibility
5. **Inline CSS only** (no external stylesheets)
6. **Full viewport height** (100vh) for proper rendering
7. **Test in multiple clients** (Gmail, Outlook, Apple Mail)

## Deployment

### Publishing to JSR

1. Update version in `deno.json`
2. Commit changes following conventional commits
3. Push to `main` (triggers release workflow)
4. Automated workflow:
   - Runs tests (unit, integration, snapshots)
   - Checks coverage (90% threshold)
   - Updates version
   - Creates git tag
   - Publishes GitHub release
   - Publishes to JSR

### CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/release.yml`):

1. **Quality checks**: lint, format, type check
2. **Snapshot generation**: `deno task snapshots`
3. **Test execution**: unit, theme, snapshot, integration
4. **Coverage validation**: 90% threshold
5. **Version bump**: Conventional commits analysis
6. **Git operations**: commit, tag, push
7. **Release creation**: GitHub release with notes
8. **JSR publish**: Package publication

## Extension Points

### Adding New Templates

1. Create `.hbs` file in `src/emails/templates/`
2. Define TypeScript interface in `src/types.ts`
3. Add render method to `Courier` class
4. Add send method (optional convenience)
5. Create integration test in `tests/`
6. Update snapshot generator
7. Regenerate snapshots
8. Update README with usage example

### Custom Themes

1. Define `ThemeConfig` object
2. Pass to `Courier.initialize()` config
3. Or use `createTheme()` to extend preset
4. CSS generated at runtime (no build step)

### Custom Handlebars Helpers

1. Register in `Courier` constructor
2. Use in templates: `{{#if (myHelper arg)}}`
3. Document in AGENTS.md

## Performance Considerations

### Template Loading

- Templates loaded once at initialization
- Cached in Handlebars instance
- No disk I/O after setup

### CSS Generation

- Generated once per Courier instance
- Merged theme cached in memory
- No runtime overhead after initialization

### SMTP Connection

- Single connection per Courier instance
- Connection pooling handled by Nodemailer
- `close()` for cleanup

## Future Enhancements

Potential areas for expansion:

- **More preset themes** (e.g., MinimalTheme, BoldTheme)
- **Attachment support** (already supported via Nodemailer, needs wrapper)
- **Template preview server** (local dev server for template testing)
- **Email scheduling** (queue system for delayed sending)
- **Analytics integration** (tracking pixels, link tracking)
- **Multi-language support** (i18n for template text)
- **Additional SMTP providers** (SendGrid, Mailgun, SES)

---

For development guidance, see [AGENTS.md](AGENTS.md).\
For contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).\
For user documentation, see [README.md](README.md).
