# 📬 Courier

Courier is a Node.js email utility that integrates iCloud SMTP, Nodemailer, and Handlebars
templating into a clean, modular workflow. Use it to send branded transactional emails,
notifications, and automated messages with minimal setup.

**Written in Deno and published to JSR (JavaScript Registry)**

## ✨ Features

- 🍎 **iCloud SMTP Integration** - Built-in support for iCloud email with app-specific passwords
- 📧 **Nodemailer Powered** - Reliable email delivery with the popular Nodemailer library
- 🎨 **Handlebars Templates** - Create beautiful, branded emails with Handlebars templating
- 📝 **TypeScript Support** - Full TypeScript definitions included
- 🚀 **Easy to Use** - Simple, intuitive API for sending emails
- 🔒 **Secure** - Uses secure SMTP connections with STARTTLS
- 📎 **Attachments** - Support for email attachments
- 🎯 **Type-Safe** - Complete type safety with TypeScript interfaces

## 📦 Installation

```bash
# Using Deno
deno add @rivescloud/courier

# Or import directly from JSR
import { Courier } from "jsr:@rivescloud/courier";
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { Courier } from "@rivescloud/courier";

// Create a Courier instance
const courier = new Courier({
  smtp: {
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

// Close the connection when done
courier.close();
```

### Using Templates

```typescript
import { Courier } from "@rivescloud/courier";

const courier = new Courier({
  smtp: {
    user: "your-email@icloud.com",
    pass: "your-app-specific-password",
  },
  defaultFrom: "your-email@icloud.com",
});

// Register a template
courier.registerTemplate(
  "welcome",
  "<h1>Welcome {{name}}!</h1><p>Thanks for joining us.</p>",
);

// Send email using the template
await courier.sendWithTemplate(
  "welcome",
  { name: "Alice" },
  {
    to: "alice@example.com",
    subject: "Welcome!",
  },
);

courier.close();
```

### Loading Templates from Files

```typescript
// Load a template from a file
await courier.loadTemplate("welcome", "./templates/welcome.hbs");

// Use the loaded template
await courier.sendWithTemplate(
  "welcome",
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
```

## 🔧 Configuration

### iCloud SMTP Setup

1. Go to [appleid.apple.com](https://appleid.apple.com)
2. Sign in with your Apple ID
3. Go to "Security" section
4. Under "App-Specific Passwords", generate a new password
5. Use this password in your Courier configuration

### Configuration Options

```typescript
interface CourierConfig {
  smtp: {
    user: string; // Your iCloud email
    pass: string; // App-specific password
    host?: string; // Default: "smtp.mail.me.com"
    port?: number; // Default: 587
    secure?: boolean; // Default: false (uses STARTTLS)
  };
  defaultFrom?: string | { email: string; name?: string };
  templatesDir?: string; // Optional template directory
}
```

## 📧 Sending Emails

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

### With Attachments

```typescript
await courier.send({
  to: "recipient@example.com",
  subject: "Document Attached",
  html: "<p>Please find the attached document.</p>",
  attachments: [
    {
      filename: "report.pdf",
      path: "/path/to/report.pdf",
    },
    {
      filename: "data.txt",
      content: "Some text content",
      contentType: "text/plain",
    },
  ],
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

## 🎨 Templates

Courier includes three pre-built templates:

### Welcome Email

Professional welcome email with call-to-action button

```typescript
await courier.loadTemplate("welcome", "./templates/welcome.hbs");
```

### Notification

System notification with severity levels (info, warning, error, success)

```typescript
await courier.loadTemplate("notification", "./templates/notification.hbs");
```

### Password Reset

Secure password reset email with token and code

```typescript
await courier.loadTemplate("password-reset", "./templates/password-reset.hbs");
```

## 🔍 API Reference

### `new Courier(config: CourierConfig)`

Create a new Courier instance with the specified configuration.

### `send(message: EmailMessage): Promise<SendResult>`

Send an email message.

### `sendWithTemplate(templateName: string, data: TemplateData, message: EmailMessage): Promise<SendResult>`

Send an email using a registered template.

### `registerTemplate(name: string, template: string): void`

Register a Handlebars template from a string.

### `loadTemplate(name: string, filepath: string): Promise<void>`

Load and register a template from a file.

### `renderTemplate(templateName: string, data: TemplateData): string`

Render a registered template with data.

### `verify(): Promise<boolean>`

Verify the SMTP connection is valid.

### `close(): void`

Close the SMTP connection.

## 🧪 Examples

See the [example.ts](./example.ts) file for comprehensive examples including:

- Basic email sending
- Template usage
- Notifications
- Password reset emails
- Attachments
- Connection verification

Run examples:

```bash
deno run --allow-net --allow-read --allow-env example.ts
```

## 🛡️ Security

- Always use app-specific passwords for iCloud (never your main password)
- Store credentials in environment variables, not in code
- Use HTTPS/TLS for secure email transmission
- Validate and sanitize template data to prevent injection attacks

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

If you encounter any problems, please file an issue on the GitHub repository.

## 📚 Learn More

- [Nodemailer Documentation](https://nodemailer.com/)
- [Handlebars Documentation](https://handlebarsjs.com/)
- [iCloud Mail Setup](https://support.apple.com/en-us/HT202304)
- [JSR Registry](https://jsr.io/)

---

Made with ❤️ by the Rives Cloud team
