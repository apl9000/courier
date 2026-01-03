/**
 * Integration tests for email verification template
 *
 * Run with: deno task test:integration
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { Courier } from "../mod.ts";
import { closeCourier, smtpConfig, smtpFrom, smtpUser } from "./test-utils.ts";

Deno.test({
  name: "Integration: Send email verification template",
  sanitizeResources: false,
  async fn() {
    const courier = await Courier.initialize({
      smtp: smtpConfig,
      defaultFrom: smtpFrom,
    });

    const result = await courier.sendEmailVerification(
      {
        title: "Verify Your Email Address",
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

    await closeCourier(courier);
  },
});
