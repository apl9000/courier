/**
 * Integration tests for Courier
 * 
 * These tests require real SMTP credentials and send actual emails.
 * Set environment variables before running:
 *   - SMTP_HOST (optional, defaults to smtp.mail.me.com)
 *   - SMTP_USER (required)
 *   - SMTP_PASS (required)
 *   - SMTP_FROM (optional, falls back to SMTP_USER)
 * 
 * Run with: deno task test:integration
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { Courier } from "../mod.ts";
import type { Courier as CourierType } from "../mod.ts";

// Get SMTP config from environment
const smtpHost = Deno.env.get("SMTP_HOST") || "smtp.mail.me.com";
const smtpUser = Deno.env.get("SMTP_USER");
const smtpPass = Deno.env.get("SMTP_PASS");
const smtpFrom = Deno.env.get("SMTP_FROM") || smtpUser;

// Reusable SMTP config
const smtpConfig = {
  service: "iCloud" as const,
  host: smtpHost,
  user: smtpUser!,
  pass: smtpPass!,
};

// Skip tests if credentials not provided
const hasCredentials = smtpUser && smtpPass;

// Helper to safely close courier and allow cleanup
async function closeCourier(courier: CourierType) {
  courier.close();
  // Small delay to allow async cleanup
  await new Promise((resolve) => setTimeout(resolve, 100));
}

Deno.test({
  name: "Integration: SMTP connection verification",
  ignore: !hasCredentials,
  sanitizeResources: false,
  async fn() {
    const courier = await Courier.initialize({
      smtp: smtpConfig,

      defaultFrom: smtpFrom,
    });
    const isValid = await courier.verify();
    assertEquals(isValid, true, "SMTP connection should be valid");
    await closeCourier(courier);
  },
});

Deno.test({
  name: "Integration: Send basic email",
  ignore: !hasCredentials,
  sanitizeResources: false,
  async fn() {
    const courier = await Courier.initialize({
      smtp: smtpConfig,
      defaultFrom: smtpFrom,
    });
    const result = await courier.send({
      to: smtpUser!,
      from: smtpFrom,
      subject: "[Test] Basic Email from Courier",
      text: "This is a test email sent by Courier integration test.",
      html: "<p>This is a <strong>test email</strong> sent by Courier integration test.</p>",
    });
    assertEquals(result.success, true, "Email should send successfully");
    assertExists(result.messageId, "Message ID should be present on success");
    await closeCourier(courier);
  },
});

Deno.test({
  name: "Integration: Send welcome email template",
  ignore: !hasCredentials,
  async fn() {
    const courier = await Courier.initialize({
      smtp: smtpConfig,
      defaultFrom: smtpFrom,
      templatesDir: "./src/emails",
    });

    const result = await courier.sendWelcomeEmail(
      {
        name: "Test User",
        actionUrl: "https://example.com/start",
        year: new Date().getFullYear(),
        companyName: "Courier Test",
      },
      {
        to: smtpUser!,
        subject: "[Test] Welcome Email from Courier",
      },
    );

    assertEquals(result.success, true, "Welcome email should send successfully");
    assertExists(result.messageId, "Message ID should be present on success");

    courier.close();
  },
});

Deno.test({
  name: "Integration: Send email verification template",
  ignore: !hasCredentials,
  async fn() {
    const courier = await Courier.initialize({
      smtp: smtpConfig,
      defaultFrom: smtpFrom,
      templatesDir: "./src/emails",
    });

    const result = await courier.sendEmailVerification(
      {
        name: "Test User",
        verificationUrl: "https://example.com/verify?token=abc123xyz",
        verificationCode: "ABC123",
        expiryHours: 24,
        companyName: "Courier Test",
      },
      {
        to: smtpUser!,
        subject: "[Test] Email Verification from Courier",
      },
    );

    assertEquals(result.success, true, "Verification email should send successfully");
    assertExists(result.messageId, "Message ID should be present on success");

    courier.close();
  },
});

Deno.test({
  name: "Integration: Send password reset template",
  ignore: !hasCredentials,
  async fn() {
    const courier = await Courier.initialize({
      smtp: smtpConfig,
      defaultFrom: smtpFrom,
      templatesDir: "./src/emails",
    });

    const result = await courier.sendPasswordReset(
      {
        name: "Test User",
        resetUrl: "https://example.com/reset?token=xyz789",
        resetCode: "XYZ789",
        expiryHours: 2,
        companyName: "Courier Test",
      },
      {
        to: smtpUser!,
        subject: "[Test] Password Reset from Courier",
      },
    );

    assertEquals(result.success, true, "Password reset email should send successfully");
    assertExists(result.messageId, "Message ID should be present on success");

    courier.close();
  },
});

Deno.test({
  name: "Integration: Send notification template",
  ignore: !hasCredentials,
  async fn() {
    const courier = await Courier.initialize({
      smtp: smtpConfig,
      defaultFrom: smtpFrom,
      templatesDir: "./src/emails",
    });

    const result = await courier.sendNotification(
      {
        type: "success",
        title: "Test Deployment",
        message: "Your deployment has completed successfully.",
        details: "Build #1234 finished in 5 minutes.",
        timestamp: new Date().toISOString(),
      },
      {
        to: smtpUser!,
        subject: "[Test] Deployment Notification from Courier",
      },
    );

    assertEquals(result.success, true, "Notification should send successfully");
    assertExists(result.messageId, "Message ID should be present on success");

    courier.close();
  },
});

Deno.test({
  name: "Integration: Send newsletter template",
  ignore: !hasCredentials,
  async fn() {
    const courier = await Courier.initialize({
      smtp: smtpConfig,
      defaultFrom: smtpFrom,
      templatesDir: "./src/emails",
    });

    const result = await courier.sendNewsletter(
      {
        title: "Monthly Update - December 2025",
        sections: [
          {
            heading: "New Features",
            content: "Check out the latest features added this month.",
            link: "https://example.com/blog/new-features",
          },
          {
            heading: "Bug Fixes",
            content: "We've fixed several important bugs.",
            link: "https://example.com/changelog",
          },
        ],
        companyName: "Courier Test",
        unsubscribeUrl: "https://example.com/unsubscribe?token=abc123",
      },
      {
        to: smtpUser!,
        subject: "[Test] Newsletter from Courier",
      },
    );

    assertEquals(result.success, true, "Newsletter should send successfully");
    assertExists(result.messageId, "Message ID should be present on success");

    courier.close();
  },
});

Deno.test({
  name: "Integration: Send unsubscribe confirmation template",
  ignore: !hasCredentials,
  async fn() {
    const courier = await Courier.initialize({
      smtp: smtpConfig,
      defaultFrom: smtpFrom,
      templatesDir: "./src/emails",
    });

    const result = await courier.sendUnsubscribeConfirmation(
      {
        name: "Test User",
        reason: "Too many emails",
        resubscribeUrl: "https://example.com/resubscribe?token=def456",
        companyName: "Courier Test",
      },
      {
        to: smtpUser!,
        subject: "[Test] Unsubscribe Confirmation from Courier",
      },
    );

    assertEquals(result.success, true, "Unsubscribe confirmation should send successfully");
    assertExists(result.messageId, "Message ID should be present on success");

    courier.close();
  },
});

Deno.test({
  name: "Integration: Multiple recipients",
  ignore: !hasCredentials,
  async fn() {
    const courier = await Courier.initialize({
      smtp: smtpConfig,
      defaultFrom: smtpFrom,
    });

    const result = await courier.send({
      to: [smtpUser!, `test2@example.com`],
      subject: "[Test] Multi-recipient email",
      text: "This email is sent to multiple recipients.",
    });

    assertEquals(result.success, true, "Multi-recipient email should send successfully");

    courier.close();
  },
});
