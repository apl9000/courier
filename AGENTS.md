# AGENTS.md

This file provides guidance for AI coding agents working on the Courier email utility project.

## Project Overview

Courier is a Deno/Node.js email utility that provides:

- Multi-provider SMTP support (iCloud, Microsoft Outlook)
- Handlebars email templating system
- Tailwind CSS-based design system with monospace/brutalist aesthetic
- Type-safe email delivery with Nodemailer
- Published to JSR (JavaScript Registry) as @rivescloud/courier

**Tech Stack:**

- **Runtime:** Deno (primary), Node.js (compatible)
- **Email Delivery:** Nodemailer v6.9.7
- **Templating:** Handlebars v4.7.8
- **Styling:** Tailwind CSS v4.1.18
- **Testing:** Deno's built-in test runner
- **Package Registry:** JSR (jsr.io)

## Project Structure

```
/
├── src/
│   ├── courier.ts              # Main Courier class
│   ├── types.ts                # TypeScript type definitions
│   ├── email-styles.ts         # Design tokens and CSS utilities
│   ├── styles.ts               # Auto-generated Tailwind CSS export
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
├── styles/
│   ├── input.css               # Tailwind source with @layer components
│   └── output.css              # Compiled Tailwind CSS
├── tests/
│   ├── test-utils.ts           # Shared test configuration
│   ├── snapshots/              # HTML snapshots for validation
│   ├── generate-snapshots.ts   # Snapshot generation script
│   └── *.integration.spec.ts   # Integration tests per template
├── build-css.ts                # CSS build script
├── mod.ts                      # Main module export
├── deno.json                   # Deno configuration
└── tailwind.config.js          # Tailwind configuration
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

3. **Environment Variables:**
   Create `.env` file for integration tests:
   ```bash
   SMTP_HOST=smtp.mail.me.com
   SMTP_PORT=587
   SMTP_USER=your-email@icloud.com
   SMTP_PASS=your-app-specific-password
   TEST_FROM_EMAIL=your-email@icloud.com
   TEST_TO_EMAIL=test-recipient@example.com
   ```

### Build Commands

```bash
# Build Tailwind CSS
deno task build:css

# Build for production (minified)
deno task build:css:prod

# Development server
deno task dev

# Type checking
deno task check
```

### Testing Commands

```bash
# Run all tests
deno task test

# Unit tests only
deno task test:unit

# Integration tests (requires SMTP credentials)
deno task test:integration

# Generate HTML snapshots
deno run --allow-read --allow-write --allow-env tests/generate-snapshots.ts

# Validate snapshots
deno test --allow-read tests/snapshots.spec.ts

# Code coverage
deno task coverage
```

### Linting & Formatting

```bash
# Lint code
deno task lint

# Format code
deno task fmt
```

## Design System

### Monospace/Brutalist Aesthetic

The email templates follow a minimalist, monospace design system inspired by brutalist web design principles:

**Typography:**

- Font Stack: `ui-monospace, SFMono-Regular, Monaco, Consolas, Liberation Mono, Courier New, monospace`
- Base Size: 16px
- Line Height: 1.20rem (consistent vertical rhythm)
- Font Weights: 500 (normal), 600 (medium), 800 (bold)

**Colors:**

- Text: `#000000` (black), `#666666` (gray)
- Background: `#ffffff` (white), `#eeeeee` (light gray)
- No gradients, no shadows, no purple tones

**Spacing:**

- Base Unit: 1.20rem (line height)
- Consistent grid-based spacing

**Borders:**

- Standard: 2px solid black
- Thick: 3px (footer borders)
- Double: 6px (dividers)

### Email CSS Classes

Located in `styles/input.css` under `@layer components`:

**Layout:**

- `.email-container` - Main container (max-width 600px, white bg, padding)

**Typography:**

- `.email-heading` - Main heading (24px, uppercase, bold 800)
- `.email-subheading` - Section headings (16px, uppercase, bold 800)
- `.email-body` - Body text (16px, line-height 1.20rem)
- `.email-text-alt` - Alternative text (14px, gray)

**Components:**

- `.email-button` - CTA buttons (bordered, uppercase, hover state)
- `.email-link` - Text links (underlined, 2px thickness)
- `.email-divider` - Section divider (6px double border)
- `.email-box` - Bordered content box (2px border, padding)
- `.email-box-alt` - Gray background box (no border)
- `.email-code` - Code display (monospace, gray bg)
- `.email-footer` - Footer section (3px double top border, gray text)

**Utilities:**

- `.email-section` - Section spacing (margin-bottom)
- `.email-section-bordered` - Bordered section
- `.email-spacing-none` - Remove top margin

### CSS Build Process

1. Source CSS: `styles/input.css` (Tailwind directives + @layer components)
2. Tailwind CLI processes input.css → `styles/output.css`
3. Build script (`build-css.ts`) reads output.css → exports to `src/styles.ts`
4. Templates import `TAILWIND_CSS` from `src/styles.ts`
5. CSS inlined in `<style>` tags in email HTML

**Important:** Always run `deno task build:css` after modifying:

- `styles/input.css`
- `tailwind.config.js`
- Any template files (to regenerate snapshots)

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

Snapshots are stored in `tests/snapshots/*.html` and can be opened in a browser for visual inspection.

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

### Template Structure

All templates inherit from `layouts/main.hbs`:

```handlebars
<!DOCTYPE html>
<html lang="{{lang}}">
  <head>{{> head }}</head>
  <body class="m-0 p-0 bg-white">
    <table role="presentation" class="w-full m-0 p-0 bg-white">
      <tr>
        <td align="center" class="p-0 bg-white">
          <div class="email-container">
            {{{ body }}}
            {{> footer }}
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
```

### Partial Usage

```handlebars
{{!-- Header partial with title --}}
{{> header title="Welcome to Courier"}}

{{!-- Footer partial with company info --}}
{{> footer companyName="Courier" year=2025 unsubscribeUrl="..."}}
```

### Template Data Types

Defined in `src/types.ts`:

- `WelcomeEmailData`
- `EmailVerificationData`
- `PasswordResetData`
- `NotificationData`
- `NewsletterData`
- `UnsubscribeData`

Always provide all required fields to ensure proper rendering.

## Email Client Compatibility

### Best Practices

1. **Inline CSS** - Always inline styles (handled automatically)
2. **Table-based layouts** - Wrapper tables for client compatibility
3. **Explicit dimensions** - Use `width="100%"` on tables
4. **Background colors** - Set on body, table, and td for consistency
5. **No external resources** - Embed all CSS in `<style>` tag
6. **Test in multiple clients** - Gmail, Outlook, Apple Mail, etc.

### Known Issues

- **Outlook Desktop** - Limited CSS support, test thoroughly
- **Gmail Mobile** - May strip some margin/padding
- **Dark Mode** - Uses system colors, test both themes

## Adding New Templates

1. **Create template file** in `src/emails/templates/`
2. **Define TypeScript type** in `src/types.ts`
3. **Add render method** to `Courier` class
4. **Add send method** to `Courier` class (optional)
5. **Create integration test** in `tests/`
6. **Update snapshot generator** in `tests/generate-snapshots.ts`
7. **Run CSS build** and generate snapshots
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

1. Update `tailwind.config.js` colors
2. Update `src/email-styles.ts` EmailColors
3. Run `deno task build:css`
4. Regenerate snapshots
5. Validate in browser

### Modifying Layout

1. Edit `src/emails/layouts/main.hbs`
2. Update any affected partials
3. Run `deno task build:css`
4. Regenerate snapshots
5. Test in multiple email clients

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
5. **Email validators** - Use tools like [Litmus](https://litmus.com) or [Email on Acid](https://www.emailonacid.com)

## Maintenance Checklist

### Weekly

- [ ] Review and merge PRs
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

## Resources

- [Deno Documentation](https://deno.land/manual)
- [JSR Registry](https://jsr.io)
- [Nodemailer Docs](https://nodemailer.com/)
- [Handlebars Docs](https://handlebarsjs.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Email on Acid](https://www.emailonacid.com/blog/) - Email design best practices

## Questions or Issues?

When encountering problems:

1. Check existing tests for examples
2. Review this AGENTS.md file
3. Consult the README.md for user-facing documentation
4. Check the GitHub issues for similar problems
5. Create a new issue with detailed reproduction steps

## Agent-Specific Notes

- **Always run tests** before committing changes
- **Rebuild CSS** after any style/template modifications
- **Regenerate snapshots** to validate changes
- **Check type safety** with `deno task check`
- **Follow existing patterns** in the codebase
- **Update documentation** when adding features
- **Test in email clients** when changing templates
- **Preserve monospace design** aesthetic in all changes
