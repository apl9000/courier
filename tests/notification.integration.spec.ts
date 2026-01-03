/**
 * Integration tests for notification template
 *
 * Run with: deno task test:integration
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { Courier } from "../mod.ts";
import { closeCourier, smtpConfig, smtpFrom, smtpUser } from "./test-utils.ts";

Deno.test({
  name: "Integration: Send notification template",
  sanitizeResources: false,
  async fn() {
    const courier = await Courier.initialize({
      smtp: smtpConfig,
      defaultFrom: smtpFrom,
    });

    const result = await courier.sendNotification(
      {
        type: "success",
        title: "Test Deployment",
        message: "Your deployment has completed successfully.",
        details: "Build #1234 finished in 5 minutes.",
        timestamp: new Date().toISOString(),
        actionUrl: "https://example.com/deployments/1234",
        actionText: "View Deployment",
      },
      {
        to: smtpUser!,
        subject: "[Test] Deployment Notification from Courier",
      },
    );

    assertEquals(result.success, true, "Notification should send successfully");
    assertExists(result.messageId, "Message ID should be present on success");

    await closeCourier(courier);
  },
});
