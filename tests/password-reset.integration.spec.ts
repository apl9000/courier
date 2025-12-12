/**
 * Integration tests for password reset template
 *
 * Run with: deno task test:integration
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { Courier } from "../mod.ts";
import { closeCourier, hasCredentials, smtpConfig, smtpFrom, smtpUser } from "./test-utils.ts";

Deno.test({
  name: "Integration: Send password reset template",
  ignore: !hasCredentials,
  sanitizeResources: false,
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

    await closeCourier(courier);
  },
});
