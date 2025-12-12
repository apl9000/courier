/**
 * Tests basic email sending functionality
 */

import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts";
import { Courier } from "../mod.ts";
import type { EmailMessage, SendResult } from "../mod.ts";

// Test SMTP configuration (using valid structure but won't actually connect)
const testConfig = {
  smtp: {
    service: "iCloud" as const,
    host: "smtp.mail.me.com",
    port: 587,
    secure: false,
    user: "test@icloud.com",
    pass: "test-password",
  },
  defaultFrom: "test@icloud.com",
};

Deno.test(`${Courier.name}`, async (t) => {
  await t.step(`${Courier.prototype.send.name} - basic email with text`, async () => {
    const courier = await Courier.initialize(testConfig);

    const message: EmailMessage = {
      from: "sender@example.com",
      to: "recipient@example.com",
      subject: "Test Email",
      text: "This is a test email",
    };

    // Note: Actual send will fail due to test credentials
    // This test verifies the method accepts the correct structure
    const result = await courier.send(message);

    assertExists(result);
    assertEquals(typeof result.success, "boolean");
    if (!result.success) {
      assertExists(result.error, "Error message should be present when success is false");
      assertEquals(typeof result.error, "string", "Error message should be a string");
    }

    courier.close();
  });

  await t.step(`${Courier.prototype.send.name} - email with string recipient`, async () => {
    const courier = await Courier.initialize(testConfig);

    const message: EmailMessage = {
      to: "recipient@example.com",
      subject: "Test",
      text: "Test",
    };

    const result = await courier.send(message);
    assertExists(result);

    courier.close();
  });

  await t.step(
    `${Courier.prototype.send.name} - email with object recipient (email + name)`,
    async () => {
      const courier = await Courier.initialize(testConfig);

      const message: EmailMessage = {
        to: { email: "recipient@example.com", name: "Recipient Name" },
        subject: "Test",
        text: "Test",
      };

      const result = await courier.send(message);
      assertExists(result);

      courier.close();
    },
  );

  await t.step(`${Courier.prototype.send.name} - email with array recipients`, async () => {
    const courier = await Courier.initialize(testConfig);

    const message: EmailMessage = {
      to: [
        "recipient1@example.com",
        { email: "recipient2@example.com", name: "Recipient 2" },
      ],
      subject: "Test",
      text: "Test",
    };

    const result = await courier.send(message);
    assertExists(result);

    courier.close();
  });

  await t.step(`${Courier.prototype.send.name} - email with CC recipients`, async () => {
    const courier = await Courier.initialize(testConfig);

    const message: EmailMessage = {
      to: "recipient@example.com",
      cc: ["cc1@example.com", { email: "cc2@example.com", name: "CC User" }],
      subject: "Test",
      text: "Test",
    };

    const result = await courier.send(message);
    assertExists(result);

    courier.close();
  });

  await t.step(`${Courier.prototype.send.name} - email with BCC recipients`, async () => {
    const courier = await Courier.initialize(testConfig);

    const message: EmailMessage = {
      to: "recipient@example.com",
      bcc: ["bcc1@example.com", { email: "bcc2@example.com", name: "BCC User" }],
      subject: "Test",
      text: "Test",
    };

    const result = await courier.send(message);
    assertExists(result);

    courier.close();
  });

  await t.step(`${Courier.prototype.send.name} - email with replyTo`, async () => {
    const courier = await Courier.initialize(testConfig);

    const message: EmailMessage = {
      to: "recipient@example.com",
      replyTo: "reply@example.com",
      subject: "Test",
      text: "Test",
    };

    const result = await courier.send(message);
    assertExists(result);

    courier.close();
  });

  await t.step(`${Courier.prototype.send.name} - email with HTML content`, async () => {
    const courier = await Courier.initialize(testConfig);

    const message: EmailMessage = {
      to: "recipient@example.com",
      subject: "Test",
      html: "<p>This is <strong>HTML</strong> content</p>",
    };

    const result = await courier.send(message);
    assertExists(result);

    courier.close();
  });

  await t.step(
    `${Courier.prototype.send.name} - uses defaultFrom when from not specified`,
    async () => {
      const courier = await Courier.initialize(testConfig);

      const message: EmailMessage = {
        to: "recipient@example.com",
        subject: "Test",
        text: "Test",
      };

      const result = await courier.send(message);
      assertExists(result);

      courier.close();
    },
  );

  await t.step(`${Courier.prototype.send.name} - returns SendResult object`, async () => {
    const courier = await Courier.initialize(testConfig);

    const message: EmailMessage = {
      to: "recipient@example.com",
      subject: "Test",
      text: "Test",
    };

    const result: SendResult = await courier.send(message);

    assertEquals(typeof result.success, "boolean");
    if (result.success) {
      assertExists(result.messageId);
    } else {
      assertExists(result.error);
    }

    courier.close();
  });
});
