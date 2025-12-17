/**
 * Integration tests for welcome email template
 *
 * Run with: deno task test:integration
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { ColorfulTheme, Courier, DarkTheme } from "../mod.ts";
import { closeCourier, hasCredentials, smtpConfig, smtpFrom, smtpUser } from "./test-utils.ts";

Deno.test({
  name: "Integration: Send welcome email template",
  ignore: !hasCredentials,
  sanitizeResources: false,
  async fn() {
    const courier = await Courier.initialize({
      smtp: smtpConfig,
      defaultFrom: smtpFrom,
      templatesDir: "./src/emails",
      theme: ColorfulTheme,
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

    if (!result.success) {
      console.error("Failed to send welcome email. Error:", result.error);
    }

    assertEquals(result.success, true, `Welcome email should send successfully. Error: ${result.error || "none"}`);
    assertExists(result.messageId, "Message ID should be present on success");

    await closeCourier(courier);
  },
});
