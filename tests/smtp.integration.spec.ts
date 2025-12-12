/**
 * Integration tests for basic SMTP functionality
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
import { closeCourier, hasCredentials, smtpConfig, smtpFrom, smtpUser } from "./test-utils.ts";

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
  name: "Integration: Multiple recipients",
  ignore: !hasCredentials,
  sanitizeResources: false,
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

    await closeCourier(courier);
  },
});
