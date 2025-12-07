/**
 * Example usage of Courier email utility
 *
 * To run this example:
 * 1. Set up environment variables:
 *    - ICLOUD_EMAIL: Your iCloud email address
 *    - ICLOUD_APP_PASSWORD: App-specific password from iCloud
 * 2. Run: deno run --allow-net --allow-read --allow-env example.ts
 */

import { Courier } from "./mod.ts";

// Example 1: Basic email sending
async function _sendBasicEmail() {
  console.log("Example 1: Sending a basic email...");

  const courier = new Courier({
    smtp: {
      user: Deno.env.get("ICLOUD_EMAIL") || "your-email@icloud.com",
      pass: Deno.env.get("ICLOUD_APP_PASSWORD") || "your-app-specific-password",
    },
    defaultFrom: Deno.env.get("ICLOUD_EMAIL") || "your-email@icloud.com",
  });

  const result = await courier.send({
    to: "recipient@example.com",
    subject: "Hello from Courier!",
    text: "This is a plain text email",
    html: "<p>This is an <strong>HTML</strong> email</p>",
  });

  console.log("Result:", result);
  courier.close();
}

// Example 2: Using templates
async function _sendTemplatedEmail() {
  console.log("\nExample 2: Sending an email with a template...");

  const courier = new Courier({
    smtp: {
      user: Deno.env.get("ICLOUD_EMAIL") || "your-email@icloud.com",
      pass: Deno.env.get("ICLOUD_APP_PASSWORD") || "your-app-specific-password",
    },
    defaultFrom: Deno.env.get("ICLOUD_EMAIL") || "your-email@icloud.com",
  });

  // Load and use the welcome template
  await courier.loadTemplate("welcome", "./templates/welcome.hbs");

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
    },
  );

  console.log("Result:", result);
  courier.close();
}

// Example 3: Using notification template
async function _sendNotification() {
  console.log("\nExample 3: Sending a notification...");

  const courier = new Courier({
    smtp: {
      user: Deno.env.get("ICLOUD_EMAIL") || "your-email@icloud.com",
      pass: Deno.env.get("ICLOUD_APP_PASSWORD") || "your-app-specific-password",
    },
    defaultFrom: Deno.env.get("ICLOUD_EMAIL") || "your-email@icloud.com",
  });

  await courier.loadTemplate("notification", "./templates/notification.hbs");

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
    },
  );

  console.log("Result:", result);
  courier.close();
}

// Example 4: Password reset email
async function _sendPasswordReset() {
  console.log("\nExample 4: Sending a password reset email...");

  const courier = new Courier({
    smtp: {
      user: Deno.env.get("ICLOUD_EMAIL") || "your-email@icloud.com",
      pass: Deno.env.get("ICLOUD_APP_PASSWORD") || "your-app-specific-password",
    },
    defaultFrom: Deno.env.get("ICLOUD_EMAIL") || "your-email@icloud.com",
  });

  await courier.loadTemplate("password-reset", "./templates/password-reset.hbs");

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
      to: "bob@example.com",
      subject: "Password Reset Request",
    },
  );

  console.log("Result:", result);
  courier.close();
}

// Example 5: Email with attachments
async function _sendEmailWithAttachments() {
  console.log("\nExample 5: Sending an email with attachments...");

  const courier = new Courier({
    smtp: {
      user: Deno.env.get("ICLOUD_EMAIL") || "your-email@icloud.com",
      pass: Deno.env.get("ICLOUD_APP_PASSWORD") || "your-app-specific-password",
    },
    defaultFrom: Deno.env.get("ICLOUD_EMAIL") || "your-email@icloud.com",
  });

  const result = await courier.send({
    to: "recipient@example.com",
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

  const courier = new Courier({
    smtp: {
      user: Deno.env.get("ICLOUD_EMAIL") || "your-email@icloud.com",
      pass: Deno.env.get("ICLOUD_APP_PASSWORD") || "your-app-specific-password",
    },
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
  // Note: Make sure to set ICLOUD_EMAIL and ICLOUD_APP_PASSWORD environment variables

  // await sendBasicEmail();
  // await sendTemplatedEmail();
  // await sendNotification();
  // await sendPasswordReset();
  // await sendEmailWithAttachments();
  await verifyConnection();

  console.log("\n=====================================");
  console.log("Examples completed!");
}
