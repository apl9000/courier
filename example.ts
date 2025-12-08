/**
 * Example usage of Courier email utility
 *
 * To run this example:
 * 1. Set up environment variables:
 *    - SMTP_HOST: Optional SMTP host (default smtp.mail.me.com)
 *    - SMTP_FROM: Optional default from address (falls back to SMTP_USER)
 *    - SMTP_USER: Your iCloud email address
 *    - SMTP_PASS: App-specific password from iCloud
 * 2. Run: deno run --allow-net --allow-read --allow-env example.ts
 */

import { Courier } from "./mod.ts";

const smtpHost = Deno.env.get("SMTP_HOST") || "smtp.mail.me.com";
const smtpUser = Deno.env.get("SMTP_USER") || "your-email@icloud.com";
const smtpPass = Deno.env.get("SMTP_PASS") || "your-app-specific-password";
const smtpFrom = Deno.env.get("SMTP_FROM") || smtpUser;

// Example 1: Basic email sending
async function sendBasicEmail() {
  console.log("Example 1: Sending a basic email...");

  const courier = await Courier.initialize({
    smtp: { host: smtpHost, user: smtpUser, pass: smtpPass },
    defaultFrom: smtpFrom,
  });

  const result = await courier.send({
    to: "recipient@example.com",
    from: smtpFrom,
    subject: "Hello from Courier!",
    text: "This is a plain text email",
    html: "<p>This is an <strong>HTML</strong> email</p>",
  });

  console.log("Result:", result);
  courier.close();
}

// Example 2: Using templates with automatic loading
async function sendTemplatedEmail() {
  console.log("\nExample 2: Sending an email with a template...");

  const courier = await Courier.initialize({
    smtp: { host: smtpHost, user: smtpUser, pass: smtpPass },
    defaultFrom: smtpFrom,
    templatesDir: "./templates",
  });

  const result = await courier.sendWithTemplate(
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
      from: smtpFrom,
    },
  );

  console.log("Result:", result);
  courier.close();
}

// Example 3: Using notification template
async function sendNotification() {
  console.log("\nExample 3: Sending a notification...");

  const courier = await Courier.initialize({
    smtp: { host: smtpHost, user: smtpUser, pass: smtpPass },
    defaultFrom: smtpFrom,
    templatesDir: "./templates",
  });

  const result = await courier.sendWithTemplate(
    "notification",
    {
      type: "success",
      title: "Deployment Successful",
      message: "Your application has been deployed to production.",
      details: "Build #1234 completed in 3m 45s",
      timestamp: new Date().toLocaleString(),
    },
    {
      to: "developer@example.com",
      subject: "Deployment Notification",
      from: smtpFrom,
    },
  );

  console.log("Result:", result);
  courier.close();
}

// Example 4: Password reset email
async function sendPasswordReset() {
  console.log("\nExample 4: Sending a password reset email...");

  const courier = await Courier.initialize({
    smtp: { host: smtpHost, user: smtpUser, pass: smtpPass },
    defaultFrom: smtpFrom,
    templatesDir: "./templates",
  });

  const result = await courier.sendWithTemplate(
    "password-reset",
    {
      name: "Bob",
      resetUrl: "https://example.com/reset-password?token=abc123xyz",
      resetCode: "ABC123",
      expiryHours: 24,
      companyName: "Acme Inc.",
    },
    {
      from: smtpFrom,
      to: "bob@example.com",
      subject: "Password Reset Request",
    },
  );

  console.log("Result:", result);
  courier.close();
}

// Example 5: Email with attachments
async function sendEmailWithAttachments() {
  console.log("\nExample 5: Sending an email with attachments...");

  const courier = await Courier.initialize({
    smtp: { host: smtpHost, user: smtpUser, pass: smtpPass },
    defaultFrom: smtpFrom,
  });

  const result = await courier.send({
    to: "recipient@example.com",
    from: smtpFrom,
    subject: "Document Attached",
    text: "Please find the attached document.",
    html: "<p>Please find the attached <strong>document</strong>.</p>",
    attachments: [
      {
        filename: "example.txt",
        content: "This is an example attachment",
        contentType: "text/plain",
      },
    ],
  });

  console.log("Result:", result);
  courier.close();
}

// Example 6: Verify SMTP connection
async function verifyConnection() {
  console.log("\nExample 6: Verifying SMTP connection...");

  const courier = await Courier.initialize({
    smtp: { host: smtpHost, user: smtpUser, pass: smtpPass },
  });

  const isValid = await courier.verify();
  console.log("SMTP Connection Valid:", isValid);
  courier.close();
}

// Run examples (comment out to skip)
if (import.meta.main) {
  console.log("Courier Email Utility - Examples\n");
  console.log("=====================================\n");

  // Uncomment the examples you want to run:
  // await sendBasicEmail();
  // await sendTemplatedEmail();
  // await sendNotification();
  // await sendPasswordReset();
  // await sendEmailWithAttachments();
  await verifyConnection();

  console.log("\n=====================================");
  console.log("Examples completed!");
}
