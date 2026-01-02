/**
 * Courier - Deno email utility for SMTP with Handlebars templating
 *
 * Supports iCloud SMTP and Microsoft Outlook SMTP providers.
 *
 * @module
 *
 * @example
 * ```ts
 * import { Courier, SMTPProviders } from "@apl/courier";
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
  EmailVerificationData,
  NewsletterData,
  NotificationData,
  PasswordResetData,
  SendResult,
  SMTPConfig,
  TemplateData,
  ThemeConfig,
  UnsubscribeData,
  WelcomeEmailData,
} from "./src/types.ts";
export { SMTPProviders } from "./src/types.ts";
export {
  ColorfulTheme,
  createTheme,
  DarkTheme,
  DefaultTheme,
  EmailClasses,
  EmailColors,
  EmailStyles,
  EmailTokens,
  generateThemedCSS,
  mergeTheme,
  ModernBrutalistTheme,
  ProfessionalTheme,
} from "./src/email-styles.ts";
