# AGENTS.md

This file provides guidance for AI coding agents (including Claude Code, GitHub Copilot, and other
AI assistants) working on the Courier email utility project.

**For detailed architecture documentation, see [ARCHITECTURE.md](ARCHITECTURE.md).**

## Project Overview

Courier is a Deno/Node.js email utility that provides:

- Multi-provider SMTP support (iCloud, Microsoft Outlook)
- Handlebars email templating system
- Runtime CSS generation with preset themes and custom theme support
- Type-safe email delivery with Nodemailer
- Published to JSR (JavaScript Registry) as @apl/courier

**Tech Stack:**

- **Runtime:** Deno (primary), Node.js (compatible)
- **Email Delivery:** Nodemailer v6.9.7
- **Templating:** Handlebars v4.7.8
- **Styling:** Runtime CSS generation from theme configuration
- **Testing:** Deno's built-in test runner
- **Package Registry:** JSR (jsr.io)

## Project Structure

```
/
├── src/
│   ├── courier.ts              # Main Courier class
│   ├── types.ts                # TypeScript type definitions
│   ├── email-styles.ts         # Theme system and runtime CSS generation
│   └── emails/
│       ├── layouts/
│       │   └── main.hbs        # Main email layout
│       ├── partials/
│       │   ├── head.hbs        # HTML head with CSS
│       │   ├── header.hbs      # Email header
│       │   └── footer.hbs      # Email footer
│       └── templates/
│           ├── welcome.hbs
│           ├── email-verification.hbs
│           ├── password-reset.hbs
│           ├── notification.hbs
│           ├── newsletter.hbs
│           └── unsubscribe.hbs
├── tests/
│   ├── test-utils.ts           # Shared test configuration
│   ├── snapshots/              # HTML snapshots for validation
│   ├── generate-snapshots.ts   # Snapshot generation script
│   └── *.integration.spec.ts   # Integration tests per template
├── mod.ts                      # Main module export
└── deno.json                   # Deno configuration
```

## Development Setup

### Environment Setup

1. **Install Deno:**

   ```bash
   curl -fsSL https://deno.land/x/install/install.sh | sh
   ```

2. **Install Dependencies:**

   ```bash
   deno install
   ```

3. **Environment Variables:** Create `.env` file for integration tests:
   ```bash
   SMTP_HOST=smtp.mail.me.com
   SMTP_USER=your-email@icloud.com
   SMTP_PASS=your-app-specific-password
   SMTP_FROM=your-email@icloud.com
   SMTP_TEST_TO=test-recipient@example.com
   ```

### Common Commands

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

# Individual template tests
deno task test:smtp        # Test SMTP connection
deno task test:welcome     # Test welcome email
deno task test:verification
deno task test:password-reset
deno task test:notification
deno task test:newsletter
deno task test:unsubscribe

# Code quality
deno task lint             # Lint code
deno task fmt              # Format code
deno task fmt:check        # Check formatting without modifying
deno task coverage         # Generate code coverage report
```

## Design System Quick Reference

Courier uses a **monospace/brutalist aesthetic** by default. See [ARCHITECTURE.md](ARCHITECTURE.md)
for complete design system documentation.

**Quick Reference:**

- **Font**: ui-monospace stack, 16px base, 1.20rem line-height
- **Colors**: Black (#000), White (#fff), Gray (#666, #eee) - no gradients/shadows
- **Borders**: 2px standard, 3px thick, 6px double
- **CSS Classes**: Semantic `email-*` prefix (`.email-button`, `.email-heading`, etc.)
- **Theme System**: Runtime CSS generation from `src/email-styles.ts` (no build step)
- **Preset Themes**: DefaultTheme, DarkTheme, ProfessionalTheme, ColorfulTheme

**Important:** Regenerate snapshots after modifying templates:

```bash
deno task snapshots
```

## Testing Guidelines

### Test Structure

Each email template has:

1. **Unit test** in `src/courier.spec.ts` - Template rendering
2. **Integration test** in `tests/*.integration.spec.ts` - Actual email sending
3. **Snapshot test** in `tests/snapshots.spec.ts` - Validate HTML output

### Writing Tests

**Unit Tests:**

```typescript
Deno.test('renders welcome email template', async () => {
  const courier = new Courier(config);
  const html = await courier.renderTemplate('welcome', {
    name: 'Test User',
    actionUrl: 'https://example.com',
  });
  assertStringIncludes(html, 'Welcome');
});
```

**Integration Tests:**

```typescript
import {hasCredentials, smtpConfig} from './test-utils.ts';

Deno.test({
  name: 'sends welcome email via SMTP',
  ignore: !hasCredentials,
  async fn() {
    const courier = new Courier(smtpConfig);
    await courier.sendWelcomeEmail({
      to: 'test@example.com',
      name: 'Test User',
    });
  },
});
```

**Snapshot Tests:**

```typescript
Deno.test('Welcome email has monospace styling', async () => {
  const html = await Deno.readTextFile('./tests/snapshots/welcome.html');
  assertStringIncludes(html, 'ui-monospace');
  assertStringIncludes(html, 'email-button');
});
```

### Snapshot Generation

Generate HTML snapshots after any template/style changes:

```bash
deno run --allow-read --allow-write --allow-env tests/generate-snapshots.ts
```

Snapshots are stored in `tests/snapshots/*.html` and can be opened in a browser for visual
inspection.

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** - All type checks enforced
- **No `any` types** - Use proper types or `unknown`
- **Explicit return types** - On public methods
- **Named exports** - No default exports except in mod.ts

### Naming Conventions

- **Files:** kebab-case (`email-styles.ts`)
- **Classes:** PascalCase (`Courier`, `SMTPProviders`)
- **Functions:** camelCase (`sendEmail`, `renderTemplate`)
- **Constants:** SCREAMING_SNAKE_CASE (`TAILWIND_CSS`, `EMAIL_CLASSES`)
- **Types/Interfaces:** PascalCase (`EmailConfig`, `TemplateData`)

### Imports

- **Use Deno standards:** Import from `jsr:` or `npm:` as defined in `deno.json`
- **Group imports:** Standard library → Third-party → Local
- **Use type imports:** `import type { X } from "Y"` for types only

### Comments

- **JSDoc for public APIs:**
  ```typescript
  /**
   * Send a welcome email to a new user
   * @param options - Email configuration
   * @returns Promise that resolves when email is sent
   */
  async sendWelcomeEmail(options: WelcomeEmailOptions): Promise<void>
  ```
- **Inline comments:** Only for complex logic
- **Template comments:** Use Handlebars `{{!-- comment --}}` syntax

## Handlebars Templates

**Template Structure:**

- Layouts: `src/emails/layouts/main.hbs` (base HTML wrapper)
- Partials: `src/emails/partials/` (header, footer, head)
- Templates: `src/emails/templates/` (welcome, email-verification, etc.)

**Handlebars Helpers:**

- `eq` - Equality comparison: `{{#if (eq layout "hero")}}`

**Template Data Types** (defined in `src/types.ts`):

- `WelcomeEmailData`, `EmailVerificationData`, `PasswordResetData`
- `NotificationData`, `NewsletterData`, `UnsubscribeData`

**Key Principles:**

- All text content from variables (no hard-coded copy in `.hbs` files)
- Optional text override properties with sensible defaults
- Newsletter supports image layouts: `left`, `right`, `hero`
- Templates loaded via `Courier.initialize()` factory method

See [ARCHITECTURE.md](ARCHITECTURE.md) for complete template documentation.

## Email Client Compatibility

**Best Practices:**

1. Table-based layouts (html → body → table → td height chain)
2. Inline CSS in `<style>` tag (no external stylesheets)
3. Explicit dimensions (`width="100%"`, explicit heights)
4. Background colors on body, table, and td
5. Test in Gmail, Outlook, Apple Mail

**Known Limitations:**

- Outlook Desktop: Limited CSS support
- Gmail Mobile: May strip margin/padding
- Dark Mode: Test with DarkTheme preset

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed compatibility strategy.

## Adding New Templates

1. **Create template file** in `src/emails/templates/`
2. **Define TypeScript type** in `src/types.ts`
3. **Add render method** to `Courier` class
4. **Add send method** to `Courier` class (optional)
5. **Create integration test** in `tests/`
6. **Update snapshot generator** in `tests/generate-snapshots.ts`
7. **Regenerate snapshots** with `deno task snapshots`
8. **Update README** with usage example

Example:

```typescript
// types.ts
export interface WelcomeBackEmailData extends BaseEmailData {
  name: string;
  lastLoginDate: string;
}

// courier.ts
async renderWelcomeBackEmail(data: WelcomeBackEmailData): Promise<string> {
  return this.renderTemplate("welcome-back", data);
}

async sendWelcomeBackEmail(options: EmailOptions & WelcomeBackEmailData): Promise<void> {
  const html = await this.renderWelcomeBackEmail(options);
  await this.sendEmail({
    to: options.to,
    subject: options.subject || "Welcome Back!",
    html,
  });
}
```

## Security Considerations

### SMTP Credentials

- **Never commit credentials** - Use environment variables
- **App-specific passwords** - For iCloud/Gmail (not account password)
- **Secure storage** - Use `.env` file (add to `.gitignore`)
- **Production secrets** - Use secret management service

### Email Content

- **Sanitize user input** - Handlebars auto-escapes by default
- **Validate email addresses** - Check format before sending
- **Rate limiting** - Implement in production
- **SPF/DKIM records** - Configure for production domain

### Dependencies

- **Keep updated** - Regularly check for security updates
- **Audit packages** - Review npm packages for vulnerabilities
- **Pin versions** - Use exact versions in `deno.json` for production

## Deployment

### Publishing to JSR

```bash
# Update version in deno.json
# Commit changes
git tag v0.1.0
git push origin v0.1.0

# Publish (requires JSR account)
deno publish
```

### CI/CD Recommendations

1. **Run tests** - Unit, integration (with test credentials)
2. **Lint and format** - Enforce code style
3. **Type check** - Ensure type safety
4. **Build CSS** - Generate production CSS
5. **Generate snapshots** - Validate template output
6. **Publish** - Only on tagged releases

## Common Tasks

### Changing Colors

1. Update theme colors in `src/email-styles.ts`
2. Regenerate snapshots with `deno task snapshots`
3. Validate in browser and email clients

### Modifying Layout

1. Edit `src/emails/layouts/main.hbs`
2. Update any affected partials
3. Regenerate snapshots with `deno task snapshots`
4. Test in multiple email clients

### Adding CSS Classes

1. Add to `styles/input.css` under `@layer components`
2. Run `deno task build:css`
3. Use in templates with semantic class names
4. Document in this file under "Email CSS Classes"

### Debugging Email Issues

1. **Check snapshots** - Open HTML files in browser
2. **Validate CSS** - Inspect `styles/output.css`
3. **Test rendering** - Use unit tests
4. **Check SMTP logs** - Enable debug in Nodemailer
5. **Email validators** - Use tools like [Litmus](https://litmus.com) or
   [Email on Acid](https://www.emailonacid.com)

## Maintenance Checklist

### Weekly

- [ ] Review PRs
- [ ] Run full test suite
- [ ] Check for dependency updates

### Monthly

- [ ] Update dependencies (security patches)
- [ ] Review and update documentation
- [ ] Test email rendering in major clients
- [ ] Review and address open issues

### Quarterly

- [ ] Major dependency updates
- [ ] Performance audit
- [ ] Security audit
- [ ] Design system review

## Git Workflow & Versioning

### Conventional Commits

Courier uses **[Conventional Commits](https://www.conventionalcommits.org/)** for automated semantic
versioning. All commits to `main` must follow this format:

```
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

### Version Bump Rules

The release workflow automatically determines version bumps based on commit messages:

- **Major version bump (x.0.0)**: Breaking changes

  - `feat!:`, `fix!:`, `chore!:`, etc. (with `!` marker)
  - `BREAKING CHANGE:` in commit body

- **Minor version bump (0.x.0)**: New features

  - `feat:` or `feat(scope):`

- **Patch version bump (0.0.x)**: Fixes and maintenance
  - `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`

### Valid Commit Types

- `feat` - New features
- `fix` - Bug fixes
- `chore` - Maintenance tasks (deps, config, etc.)
- `docs` - Documentation changes
- `style` - Code style/formatting
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Test changes
- `build` - Build system changes
- `ci` - CI/CD changes

### Examples

**Feature (minor bump):**

```
feat: add dark theme support

Implement DarkTheme preset with system background colors.
```

**Bug fix (patch bump):**

```
fix: resolve SMTP connection timeout

Increase default timeout from 5s to 30s.
```

**Breaking change (major bump):**

```
feat!: redesign theme configuration API

BREAKING CHANGE: ThemeConfig now uses nested structure.
```

### Branch Naming

While not strictly enforced, we recommend:

- Features: `feat/description`
- Bug fixes: `fix/description`
- Chores: `chore/description`
- Documentation: `docs/description`

### Release Process

1. **Automatic releases**: Push to `main` triggers release workflow
2. **Workflow analyzes** commit message for version bump type
3. **Tests run**: Unit, integration, snapshots, coverage (90% threshold)
4. **Version updated** in `deno.json`
5. **Git tag created**: `v{version}`
6. **GitHub release** published with auto-generated notes
7. **JSR publish**: Package published to JavaScript Registry

**Important**: Invalid commit format will cause the release workflow to fail.

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Resources

- [Deno Documentation](https://deno.land/manual)
- [JSR Registry](https://jsr.io)
- [Nodemailer Docs](https://nodemailer.com/)
- [Handlebars Docs](https://handlebarsjs.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Email on Acid](https://www.emailonacid.com/blog/) - Email design best practices
- [Conventional Commits](https://www.conventionalcommits.org/)

## Questions or Issues?

When encountering problems:

1. Check existing tests for examples
2. Review this AGENTS.md file
3. Consult the README.md for user-facing documentation
4. Check the GitHub issues for similar problems
5. Create a new issue with detailed reproduction steps

## Agent-Specific Notes

- **Always run tests** before committing changes
- **Regenerate snapshots** with `deno task snapshots` after template/style changes
- **Run type checking** with `deno task check` to catch errors early
- **Check type safety** with `deno task check`
- **Follow existing patterns** in the codebase
- **Update documentation** when adding features
- **Test in email clients** when changing templates
- **Preserve monospace design** aesthetic in all changes
