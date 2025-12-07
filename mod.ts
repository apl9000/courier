/**
 * Courier - Node.js email utility for iCloud SMTP with Handlebars templating
 *
 * @module
 *
 * @example
 * ```ts
 * import { Courier } from "@rivescloud/courier";
 *
 * const courier = new Courier({
 *   smtp: {
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
 * // Use a template
 * courier.registerTemplate("welcome", "<h1>Welcome {{name}}!</h1>");
 * await courier.sendWithTemplate("welcome", { name: "Alice" }, {
 *   to: "alice@example.com",
 *   subject: "Welcome to our service",
 * });
 * ```
 */

export { Courier } from "./src/courier.ts";
export type {
  CourierConfig,
  EmailAddress,
  EmailAttachment,
  EmailMessage,
  ICloudSMTPConfig,
  SendResult,
  TemplateData,
} from "./src/types.ts";
