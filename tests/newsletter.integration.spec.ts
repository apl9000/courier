/**
 * Integration tests for newsletter template
 *
 * Run with: deno task test:integration
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { Courier } from "../mod.ts";
import { closeCourier, smtpConfig, smtpFrom, smtpUser } from "./test-utils.ts";

Deno.test({
  name: "Integration: Send newsletter template",
  sanitizeResources: false,
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
            heading: "Bug Fixes",
            content: "We've fixed several important bugs.",
            link: "https://example.com/changelog",
            image: {
              src: "https://via.placeholder.com/600x200",
              alt: "Bug Fixes",
              layout: "hero",
            },
          },
          {
            heading: "New Features",
            content: "Check out the latest features added this month.",
            link: "https://example.com/blog/new-features",
            image: {
              src: "https://via.placeholder.com/150",
              alt: "New Features",
              layout: "left",
            },
          },
          {
            heading: "No Image Section",
            content: "We've fixed several important bugs.",
            link: "https://example.com/changelog",
          },
          {
            heading: "Bug Fixes",
            content: "We've fixed several important bugs.",
            link: "https://example.com/changelog",
            image: {
              src: "https://via.placeholder.com/600x200",
              alt: "Bug Fixes",
              layout: "right",
            },
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

    await closeCourier(courier);
  },
});
