/**
 * Test utilities and helper functions
 */

import type { Courier as CourierType } from "../mod.ts";

// Get SMTP config from environment
export const smtpHost = Deno.env.get("SMTP_HOST") || "smtp.mail.me.com";
export const smtpUser = Deno.env.get("SMTP_USER");
export const smtpPass = Deno.env.get("SMTP_PASS");
export const smtpFrom = Deno.env.get("SMTP_FROM") || smtpUser;

// Get test email recipients from environment (comma-separated)
const testEmailsEnv = Deno.env.get("SMTP_TEST_TO");
export const testEmails = testEmailsEnv
  ? testEmailsEnv.split(",").map((email) => email.trim()).filter((email) => email.length > 0)
  : smtpUser
  ? [smtpUser]
  : [];

// Reusable SMTP config
export const smtpConfig = {
  service: "iCloud" as const,
  host: smtpHost,
  user: smtpUser!,
  pass: smtpPass!,
};

/**
 * Helper to safely close courier and allow cleanup
 */
export async function closeCourier(courier: CourierType) {
  courier.close();
  // Small delay to allow async cleanup
  await new Promise((resolve) => setTimeout(resolve, 100));
}

/**
 * Test configuration for unit tests (won't actually connect)
 */
export const testConfig = {
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
