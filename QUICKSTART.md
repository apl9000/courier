# Quick Start Guide

Get started with Courier in 5 minutes!

## Installation

```bash
# Using Deno
deno add @rivescloud/courier
```

## Get iCloud App Password

1. Visit [appleid.apple.com](https://appleid.apple.com)
2. Sign in with your Apple ID
3. Navigate to **Security** → **App-Specific Passwords**
4. Generate a new password for Courier
5. Copy the password (you won't be able to see it again!)

## Basic Setup

```typescript
import { Courier } from "@rivescloud/courier";

const courier = new Courier({
  smtp: {
    user: "your-email@icloud.com",
    pass: "xxxx-xxxx-xxxx-xxxx", // Your app-specific password
  },
  defaultFrom: "your-email@icloud.com",
});
```

## Send Your First Email

```typescript
// Simple text email
await courier.send({
  to: "friend@example.com",
  subject: "Hello!",
  text: "My first email with Courier!",
});

// HTML email
await courier.send({
  to: "friend@example.com",
  subject: "Hello!",
  html: "<h1>Hello!</h1><p>My first <strong>HTML</strong> email!</p>",
});

// Don't forget to close the connection
courier.close();
```

## Use a Template

```typescript
// Register a simple template
courier.registerTemplate(
  "greeting",
  "<h1>Hello {{name}}!</h1><p>Welcome to {{service}}.</p>",
);

// Send email using the template
await courier.sendWithTemplate(
  "greeting",
  { name: "Alice", service: "Courier" },
  {
    to: "alice@example.com",
    subject: "Welcome!",
  },
);

courier.close();
```

## Load Template from File

```typescript
// Load pre-built welcome template
await courier.loadTemplate("welcome", "./templates/welcome.hbs");

// Send welcome email
await courier.sendWithTemplate(
  "welcome",
  {
    name: "Bob",
    actionUrl: "https://myapp.com/get-started",
    year: 2025,
    companyName: "My Company",
  },
  {
    to: "bob@example.com",
    subject: "Welcome to My Company!",
  },
);

courier.close();
```

## Common Use Cases

### Send Notification

```typescript
await courier.loadTemplate("notification", "./templates/notification.hbs");

await courier.sendWithTemplate(
  "notification",
  {
    type: "success", // info, warning, error, success
    title: "Task Completed",
    message: "Your export is ready to download.",
    timestamp: new Date().toLocaleString(),
  },
  {
    to: "user@example.com",
    subject: "Task Completed",
  },
);
```

### Password Reset Email

```typescript
await courier.loadTemplate("password-reset", "./templates/password-reset.hbs");

await courier.sendWithTemplate(
  "password-reset",
  {
    name: "User",
    resetUrl: "https://myapp.com/reset?token=abc123",
    resetCode: "ABC123",
    expiryHours: 24,
    companyName: "My Company",
  },
  {
    to: "user@example.com",
    subject: "Password Reset Request",
  },
);
```

### Email with Attachments

```typescript
await courier.send({
  to: "user@example.com",
  subject: "Your Report",
  html: "<p>Please find your report attached.</p>",
  attachments: [
    {
      filename: "report.pdf",
      path: "/path/to/report.pdf",
    },
  ],
});
```

## Environment Variables

Store your credentials securely:

```bash
# .env file
ICLOUD_EMAIL=your-email@icloud.com
ICLOUD_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

```typescript
const courier = new Courier({
  smtp: {
    user: Deno.env.get("ICLOUD_EMAIL")!,
    pass: Deno.env.get("ICLOUD_APP_PASSWORD")!,
  },
});
```

## Next Steps

- Check out [example.ts](./example.ts) for more examples
- Read the full [README.md](./README.md) for complete API documentation
- Customize the included templates or create your own
- Join our community and contribute!

## Troubleshooting

**Authentication Error?**
- Make sure you're using an app-specific password, not your main Apple ID password
- Verify your iCloud email address is correct
- Check that you have enabled two-factor authentication for your Apple ID

**Connection Timeout?**
- Verify your internet connection
- Check if port 587 is accessible
- Try setting `secure: false` in SMTP config (STARTTLS)

**Template Not Found?**
- Ensure the template file path is correct
- Check that you've registered the template before using it
- Verify file permissions

Need help? [Open an issue](https://github.com/rivescloud/courier/issues) on GitHub!
