/**
 * Integration tests for unsubscribe confirmation template
 *
 * Run with: deno task test:integration
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { Courier } from "../mod.ts";
import { closeCourier, hasCredentials, smtpConfig, smtpFrom, smtpUser } from "./test-utils.ts";

Deno.test({
  name: "Integration: Send unsubscribe confirmation template",
  ignore: !hasCredentials,
  sanitizeResources: false,
  async fn() {
    const courier = await Courier.initialize({
      smtp: smtpConfig,
      defaultFrom: smtpFrom,
      templatesDir: "./src/emails",
    });

    const result = await courier.sendUnsubscribeConfirmation(
      {
        title: "You've Been Unsubscribed",
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

    await closeCourier(courier);
  },
});
