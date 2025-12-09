# Courier

Courier is a Deno email utility that integrates SMTP (iCloud and Microsoft Outlook), Nodemailer, and
Handlebars templating into a clean, modular workflow. Use it to send branded transactional emails,
notifications, and automated messages with minimal setup.

**Written in Deno and published to JSR (JavaScript Registry)**

## Features

- **Multi-Provider SMTP Support** - Built-in support for iCloud and Microsoft Outlook SMTP
- **Nodemailer Powered** - Reliable email delivery with the popular Nodemailer library
- **Handlebars Templates** - Create beautiful, branded emails with Handlebars templating
- **TypeScript Support** - Full TypeScript definitions included
- **Easy to Use** - Simple, intuitive API for sending emails
- **Secure** - Uses secure SMTP connections with STARTTLS
- **Type-Safe** - Complete type safety with TypeScript interfaces
- **Dedicated Template Functions** - Type-safe functions for common email templates

## Installation

```bash
# Using Deno
deno add @rivescloud/courier

# Or import directly from JSR
import { Courier } from "jsr:@rivescloud/courier";
```

## Quick Start

### Basic Usage with iCloud

```typescript
import { Courier, SMTPProviders } from "@rivescloud/courier";

// Initialize with iCloud SMTP
const courier = await Courier.initialize({
  smtp: {
    ...SMTPProviders.iCloud,
    user: "your-email@icloud.com",
    pass: "your-app-specific-password", // Get this from iCloud settings
  },
  defaultFrom: "your-email@icloud.com",
});

// Send a simple email
await courier.send({
  to: "recipient@example.com",
  subject: "Hello from Courier!",
  text: "This is a test email",
  html: "<p>This is a <strong>test</strong> email</p>",
});

courier.close();
```

### Using Microsoft Outlook SMTP

```typescript
import { Courier, SMTPProviders } from "@rivescloud/courier";

const courier = await Courier.initialize({
  smtp: {
    ...SMTPProviders.Microsoft,
    user: "your-email@outlook.com",
    pass: "your-password",
  },
  defaultFrom: "your-email@outlook.com",
});
```

### Using Default Email Templates

Courier includes dedicated functions for common email templates with type-safe parameters:

```typescript
// Send a welcome email
await courier.sendWelcomeEmail(
  {
    name: "Alice",
    actionUrl: "https://example.com/getting-started",
    year: new Date().getFullYear(),
    companyName: "Acme Inc.",
  },
  {
    to: "alice@example.com",
    subject: "Welcome to Acme Inc.!",
  },
);

// Send a password reset email
await courier.sendPasswordReset(
  {
    name: "Bob",
    resetUrl: "https://example.com/reset?token=abc123",
    resetCode: "ABC123",
    expiryHours: 24,
    companyName: "Acme Inc.",
  },
  {
    to: "bob@example.com",
    subject: "Password Reset Request",
  },
);

// Send a notification
await courier.sendNotification(
  {
    type: "success",
    title: "Deployment Complete",
    message: "Your application has been deployed successfully.",
    details: "Build #1234 completed in 3m 45s",
    timestamp: new Date().toISOString(),
  },
  {
    to: "developer@example.com",
    subject: "Deployment Notification",
  },
);
```

## Configuration

### SMTP Setup

#### iCloud SMTP

1. Go to [appleid.apple.com](https://appleid.apple.com)
2. Sign in with your Apple ID
3. Go to "Security" section
4. Under "App-Specific Passwords", generate a new password
5. Use this password in your Courier configuration

#### Microsoft Outlook SMTP

Use your regular Outlook/Hotmail account credentials.

### Configuration Options

```typescript
interface CourierConfig {
  smtp: {
    user: string; // Your email address
    pass: string; // App-specific password or account password
    host?: string; // SMTP host (defaults to smtp.mail.me.com for iCloud)
    port?: number; // SMTP port (defaults to 587)
    secure?: boolean; // Enable SSL (defaults to false for STARTTLS)
  };
  defaultFrom?: string | { email: string; name?: string };
  templatesDir?: string; // Optional template directory
}
```

## Email Functions

### Core Functions

**`send(message: EmailMessage): Promise<SendResult>`**\
Send a basic email message.

**`sendWithTemplate(templateName: string, data: TemplateData, message: EmailMessage): Promise<SendResult>`**\
Send an email using a registered template.

**`registerTemplate(name: string, template: string): void`**\
Register a Handlebars template from a string.

**`loadTemplate(name: string, filepath: string): Promise<void>`**\
Load and register a template from a file.

**`verify(): Promise<boolean>`**\
Verify the SMTP connection is valid.

**`close(): void`**\
Close the SMTP connection.

### Template-Specific Functions

**`sendWelcomeEmail(data: WelcomeEmailData, message): Promise<SendResult>`**\
Send a welcome email with name, action URL, year, and company name.

**`sendEmailVerification(data: EmailVerificationData, message): Promise<SendResult>`**\
Send an email verification with verification URL/code and expiry time.

**`sendPasswordReset(data: PasswordResetData, message): Promise<SendResult>`**\
Send a password reset email with reset URL/code and expiry time.

**`sendNotification(data: NotificationData, message): Promise<SendResult>`**\
Send a notification email with type (info/warning/error/success), title, message, and details.

**`sendNewsletter(data: NewsletterData, message): Promise<SendResult>`**\
Send a newsletter with title, sections, and unsubscribe link.

**`sendUnsubscribeConfirmation(data: UnsubscribeData, message): Promise<SendResult>`**\
Send an unsubscribe confirmation with resubscribe link.

## Sending Emails

### Simple Email

```typescript
await courier.send({
  to: "recipient@example.com",
  subject: "Hello!",
  text: "Plain text content",
  html: "<p>HTML content</p>",
});
```

### Multiple Recipients

```typescript
await courier.send({
  to: ["user1@example.com", "user2@example.com"],
  cc: "manager@example.com",
  bcc: "archive@example.com",
  subject: "Team Update",
  html: "<p>Update for the team</p>",
});
```

### Named Email Addresses

```typescript
await courier.send({
  from: { email: "noreply@example.com", name: "Acme Inc." },
  to: { email: "user@example.com", name: "John Doe" },
  replyTo: { email: "support@example.com", name: "Support Team" },
  subject: "Welcome!",
  html: "<p>Welcome to our service!</p>",
});
```

## Templates

Courier includes five pre-built templates:

- **welcome** - Professional welcome email with call-to-action button
- **email-verification** - Email verification with code and link
- **password-reset** - Secure password reset email with token and code
- **notification** - System notification with severity levels (info, warning, error, success)
- **newsletter** - Newsletter template with sections and unsubscribe link
- **unsubscribe** - Unsubscribe confirmation with resubscribe option

### Custom Templates

You can create your own templates or load custom ones:

```typescript
// Register inline template
courier.registerTemplate(
  "custom",
  "<h1>Hello {{name}}</h1><p>{{message}}</p>",
);

// Load from file
await courier.loadTemplate("custom", "./my-templates/custom.hbs");

// Use the template
await courier.sendWithTemplate(
  "custom",
  { name: "Alice", message: "Welcome!" },
  {
    to: "alice@example.com",
    subject: "Custom Email",
  },
);
```

## API Reference

### Types

```typescript
import type {
  Courier,
  CourierConfig,
  EmailAddress,
  EmailMessage,
  EmailVerificationData,
  NewsletterData,
  NotificationData,
  PasswordResetData,
  SendResult,
  SMTPConfig,
  TemplateData,
  UnsubscribeData,
  // Template-specific types
  WelcomeEmailData,
} from "@rivescloud/courier";
```

### SMTP Providers

```typescript
import { SMTPProviders } from "@rivescloud/courier";

// Available providers:
SMTPProviders.iCloud = {
  host: "smtp.mail.me.com",
  port: 587,
  secure: false,
};

SMTPProviders.Microsoft = {
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
};
```

## Security

- Always use app-specific passwords for iCloud (never your main password)
- Store credentials in environment variables, not in code
- Use HTTPS/TLS for secure email transmission
- Validate and sanitize template data to prevent injection attacks

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please see CONTRIBUTING.md for guidelines.

## Issues

If you encounter any problems, please file an issue on the GitHub repository.

## Learn More

- [Nodemailer Documentation](https://nodemailer.com/)
- [Handlebars Documentation](https://handlebarsjs.com/)
- [iCloud Mail Setup](https://support.apple.com/en-us/HT202304)
- [JSR Registry](https://jsr.io/)
