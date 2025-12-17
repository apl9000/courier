/**
 * Snapshot tests for email templates
 * Validates that templates render with proper monospace styling
 */

import { assertEquals, assertStringIncludes } from "https://deno.land/std@0.208.0/assert/mod.ts";

const snapshotsDir = "./tests/snapshots";

Deno.test("Snapshot: Welcome email has monospace styling", async () => {
  const html = await Deno.readTextFile(`${snapshotsDir}/welcome.html`);

  // Check for monospace font family
  assertStringIncludes(html, "ui-monospace", "Should include monospace font");

  // Check for email-container class
  assertStringIncludes(html, "email-container", "Should include email-container class");

  // Check for email-heading (uppercase title)
  assertStringIncludes(html, "email-heading", "Should include email-heading class");

  // Check for email-button (bordered button)
  assertStringIncludes(html, "email-button", "Should include email-button class");
  assertStringIncludes(html, "GET STARTED", "Button should be uppercase");

  // Check for proper colors (black text, white bg)
  assertStringIncludes(html, "color: #000000", "Should use black text");
  assertStringIncludes(html, "background-color: #ffffff", "Should use white background");

  // Should NOT contain purple colors
  assertEquals(html.includes("#7c3aed"), false, "Should not contain purple colors");
});

Deno.test("Snapshot: Email verification has bordered code box", async () => {
  const html = await Deno.readTextFile(`${snapshotsDir}/email-verification.html`);

  assertStringIncludes(html, "email-box", "Should include email-box class for code");
  assertStringIncludes(html, "email-code", "Should include email-code class");
  assertStringIncludes(html, "ABC123", "Should include verification code");
  assertStringIncludes(html, "VERIFY EMAIL", "Button should be uppercase");
  assertStringIncludes(html, "border: 2px solid", "Should have 2px borders");
});

Deno.test("Snapshot: Password reset has monospace layout", async () => {
  const html = await Deno.readTextFile(`${snapshotsDir}/password-reset.html`);

  assertStringIncludes(html, "email-box", "Should include email-box class");
  assertStringIncludes(html, "XYZ789", "Should include reset code");
  assertStringIncludes(html, "RESET PASSWORD", "Button should be uppercase");
  assertStringIncludes(html, "font-weight: 700", "Headings should be bold (700)");
});

Deno.test("Snapshot: Notification has bordered section", async () => {
  const html = await Deno.readTextFile(`${snapshotsDir}/notification.html`);

  assertStringIncludes(html, "email-section-bordered", "Should include bordered section");
  assertStringIncludes(html, "Deployment Successful", "Should include title");
  assertStringIncludes(html, "text-transform: uppercase", "Title should be uppercase");
});

Deno.test("Snapshot: Newsletter has dividers between sections", async () => {
  const html = await Deno.readTextFile(`${snapshotsDir}/newsletter.html`);

  assertStringIncludes(html, "email-divider", "Should include dividers");
  assertStringIncludes(html, "email-subheading", "Should include subheadings");
  assertStringIncludes(html, "border-top: 6px double", "Dividers should use 6px double border");
  assertStringIncludes(html, "New Features", "Should include section heading");
});

Deno.test("Snapshot: Unsubscribe has alt-styled box", async () => {
  const html = await Deno.readTextFile(`${snapshotsDir}/unsubscribe.html`);

  assertStringIncludes(html, "email-box-alt", "Should include alt box style");
  assertStringIncludes(html, "background-color: #f5f5f5", "Alt box should have gray background");
  assertStringIncludes(html, "Been Unsubscribed", "Should include title");
});

Deno.test("Snapshot: All templates have consistent footer styling", async () => {
  const templates = [
    "welcome",
    "email-verification",
    "password-reset",
    "notification",
    "newsletter",
    "unsubscribe",
  ];

  for (const template of templates) {
    const html = await Deno.readTextFile(`${snapshotsDir}/${template}.html`);
    assertStringIncludes(html, "email-footer", `${template} should have email-footer class`);
    assertStringIncludes(
      html,
      "border-top: 3px double",
      `${template} footer should have 3px double border`,
    );
  }
});

Deno.test("Snapshot: All templates use monospace fonts", async () => {
  const templates = [
    "welcome",
    "email-verification",
    "password-reset",
    "notification",
    "newsletter",
    "unsubscribe",
  ];

  for (const template of templates) {
    const html = await Deno.readTextFile(`${snapshotsDir}/${template}.html`);
    assertStringIncludes(html, "ui-monospace", `${template} should use monospace font`);
    assertStringIncludes(
      html,
      "line-height: 1.5",
      `${template} should use 1.5 line-height`,
    );
  }
});
