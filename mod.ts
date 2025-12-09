/**
 * Courier - Deno email utility for SMTP with Handlebars templating
 *
 * Supports iCloud SMTP and Microsoft Outlook SMTP providers.
 *
 * @module
 *
 * @example
 * ```ts
 * import { Courier, SMTPProviders } from "@rivescloud/courier";
 *
 * // Using iCloud SMTP
 * const courier = await Courier.initialize({
 *   smtp: {
 *     ...SMTPProviders.iCloud,
 *     user: "your-email@icloud.com",
 *     pass: "your-app-specific-password",
 *   },
 *   defaultFrom: "your-email@icloud.com",
 * });
 *
 * // Send a simple email
 * await courier.send({
 *   to: "recipient@example.com",
 *   subject: "Hello from Courier!",
 *   text: "This is a test email",
 *   html: "<p>This is a <strong>test</strong> email</p>",
 * });
 *
 * // Use dedicated template functions
 * await courier.sendWelcomeEmail(
 *   { name: "Alice", year: 2025, companyName: "Acme Inc" },
 *   { to: "alice@example.com", subject: "Welcome!" }
 * );
 *
 * courier.close();
 * ```
 */

export { Courier } from "./src/courier.ts";
export type {
  CourierConfig,
  EmailAddress,
  EmailMessage,
  SendResult,
  SMTPConfig,
  TemplateData,
} from "./src/types.ts";
export { SMTPProviders } from "./src/types.ts";
export type {
  EmailVerificationData,
  NewsletterData,
  NotificationData,
  PasswordResetData,
  UnsubscribeData,
  WelcomeEmailData,
} from "./src/template-types.ts";
