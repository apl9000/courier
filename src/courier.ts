// @deno-types="npm:@types/nodemailer@^6.4.14"
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import Handlebars from "handlebars";
import type {
  CourierConfig,
  EmailAddress,
  EmailMessage,
  SendResult,
  SMTPConfig,
  TemplateData,
} from "./types.ts";
import type {
  EmailVerificationData,
  NewsletterData,
  NotificationData,
  PasswordResetData,
  UnsubscribeData,
  WelcomeEmailData,
} from "./template-types.ts";

/**
 * Courier - Email utility for sending branded transactional emails
 * Supports iCloud SMTP and Microsoft Outlook SMTP with Handlebars templating
 */
export class Courier {
  private transporter: Transporter;
  private config: CourierConfig;
  private templates: Map<string, HandlebarsTemplateDelegate>;

  /**
   * Create a new Courier instance
   * @param config - Courier configuration including SMTP settings
   */
  private constructor(config: CourierConfig) {
    this.config = config;
    this.templates = new Map();
    this.transporter = this.createTransporter(config.smtp);
  }

  /**
   * Initialize Courier with automatic template loading
   * @param config - Courier configuration including optional templatesDir
   * @returns Promise resolving to initialized Courier instance
   */
  static async initialize(config: CourierConfig): Promise<Courier> {
    const courier = new Courier(config);
    if (config.templatesDir) {
      await courier.loadTemplatesFromDirectory(config.templatesDir);
    }
    return courier;
  }

  /**
   * Create Nodemailer transporter with SMTP configuration
   */
  private createTransporter(smtp: SMTPConfig): Transporter {
    const transportConfig = {
      host: smtp.host || "smtp.mail.me.com",
      port: smtp.port || 587,
      secure: smtp.secure || false, // Use STARTTLS
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    };

    return nodemailer.createTransport(transportConfig);
  }

  /**
   * Format email address for Nodemailer
   */
  private formatAddress(address: string | EmailAddress): string {
    if (typeof address === "string") {
      return address;
    }
    return address.name ? `${address.name} <${address.email}>` : address.email;
  }

  /**
   * Format email addresses array for Nodemailer
   */
  private formatAddresses(
    addresses: string | EmailAddress | Array<string | EmailAddress>,
  ): string | string[] {
    if (Array.isArray(addresses)) {
      return addresses.map((addr) => this.formatAddress(addr));
    }
    return this.formatAddress(addresses);
  }

  /**
   * Register a Handlebars template
   * @param name - Template name/identifier
   * @param template - Handlebars template string
   */
  registerTemplate(name: string, template: string): void {
    const compiled = Handlebars.compile(template);
    this.templates.set(name, compiled);
  }

  /**
   * Load a template from a file
   * @param name - Template name/identifier
   * @param filepath - Path to template file
   */
  async loadTemplate(name: string, filepath: string): Promise<void> {
    const template = await Deno.readTextFile(filepath);
    this.registerTemplate(name, template);
  }

  /**
   * Load partials from a directory and register them with Handlebars
   * @param dirPath - Path to directory containing partial files
   */
  private async loadPartials(dirPath: string): Promise<void> {
    try {
      for await (const entry of Deno.readDir(dirPath)) {
        if (entry.isFile) {
          const partialName = entry.name.split(".").slice(0, -1).join(".");
          const partialPath = `${dirPath}/${entry.name}`;
          const partialContent = await Deno.readTextFile(partialPath);
          Handlebars.registerPartial(partialName, partialContent);
        }
      }
    } catch (error) {
      // Silently ignore if partials directory doesn't exist
      if (error instanceof Deno.errors.NotFound) {
        return;
      }
      throw new Error(
        `Failed to load partials from directory "${dirPath}": ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  /**
   * Load layouts from a directory and register them with Handlebars
   * @param dirPath - Path to directory containing layout files
   */
  private async loadLayouts(dirPath: string): Promise<void> {
    try {
      for await (const entry of Deno.readDir(dirPath)) {
        if (entry.isFile) {
          const layoutName = entry.name.split(".").slice(0, -1).join(".");
          const layoutPath = `${dirPath}/${entry.name}`;
          const layoutContent = await Deno.readTextFile(layoutPath);
          Handlebars.registerPartial(`layout-${layoutName}`, layoutContent);
        }
      }
    } catch (error) {
      // Silently ignore if layouts directory doesn't exist
      if (error instanceof Deno.errors.NotFound) {
        return;
      }
      throw new Error(
        `Failed to load layouts from directory "${dirPath}": ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  /**
   * Load all templates from a directory
   * Templates in the custom directory take precedence over built-in templates
   * Also registers partials and layouts with Handlebars
   * @param dirPath - Path to directory containing template files
   */
  async loadTemplatesFromDirectory(dirPath: string): Promise<void> {
    try {
      // Load partials first
      const partialsPath = `${dirPath}/partials`;
      await this.loadPartials(partialsPath);

      // Load layouts
      const layoutsPath = `${dirPath}/layouts`;
      await this.loadLayouts(layoutsPath);

      // Load template files (typically in templates subdirectory or root)
      for await (const entry of Deno.readDir(dirPath)) {
        if (entry.isFile) {
          // Extract template name from filename (remove extension)
          const templateName = entry.name.split(".").slice(0, -1).join(".");
          const templatePath = `${dirPath}/${entry.name}`;

          // Load template, overwriting any defaults
          await this.loadTemplate(templateName, templatePath);
        } else if (entry.isDirectory && entry.name === "templates") {
          // Load templates from templates subdirectory
          const templatesSubPath = `${dirPath}/templates`;
          for await (const templateEntry of Deno.readDir(templatesSubPath)) {
            if (templateEntry.isFile) {
              const templateName = templateEntry.name
                .split(".")
                .slice(0, -1)
                .join(".");
              const templatePath = `${templatesSubPath}/${templateEntry.name}`;
              await this.loadTemplate(templateName, templatePath);
            }
          }
        }
      }
    } catch (error) {
      throw new Error(
        `Failed to load templates from directory "${dirPath}": ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  /**
   * Render a template with data
   * @param templateName - Name of registered template
   * @param data - Data to pass to template
   * @returns Rendered template string
   */
  renderTemplate(templateName: string, data: TemplateData): string {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`Template "${templateName}" not found`);
    }
    return template(data);
  }

  /**
   * Send an email
   * @param message - Email message configuration
   * @returns Send result with success status and message ID
   */
  async send(message: EmailMessage): Promise<SendResult> {
    try {
      // Prepare mail options
      const mailOptions: Record<string, unknown> = {
        from: this.formatAddress(
          message.from || this.config.defaultFrom || this.config.smtp.user,
        ),
        to: this.formatAddresses(message.to),
        subject: message.subject,
      };

      // Add optional fields
      if (message.cc) {
        mailOptions.cc = this.formatAddresses(message.cc);
      }
      if (message.bcc) {
        mailOptions.bcc = this.formatAddresses(message.bcc);
      }
      if (message.replyTo) {
        mailOptions.replyTo = this.formatAddress(message.replyTo);
      }
      if (message.text) {
        mailOptions.text = message.text;
      }
      if (message.html) {
        mailOptions.html = message.html;
      }

      // Send email
      const info = await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Send an email using a template
   * @param templateName - Name of registered template
   * @param data - Data to pass to template
   * @param message - Email message configuration (without html)
   * @returns Send result with success status and message ID
   */
  sendWithTemplate(
    templateName: string,
    data: TemplateData,
    message: Omit<EmailMessage, "html">,
  ): Promise<SendResult> {
    const html = this.renderTemplate(templateName, data);
    return this.send({
      ...message,
      html,
    });
  }

  /**
   * Verify SMTP connection
   * @returns Promise that resolves to true if connection is successful
   */
  async verify(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (_error) {
      return false;
    }
  }

  /**
   * Send a welcome email using the default welcome template
   *
   * @example
   * ```ts
   * await courier.sendWelcomeEmail(
   *   { name: "Alice", actionUrl: "https://example.com/start", year: 2025, companyName: "Acme Inc" },
   *   { to: "alice@example.com", subject: "Welcome to Acme!" }
   * );
   * ```
   *
   * @param data - Welcome email template data
   * @param message - Email message configuration (to, subject, from, etc.)
   * @returns Send result with success status and message ID
   */
  sendWelcomeEmail(
    data: WelcomeEmailData,
    message: Omit<EmailMessage, "html">,
  ): Promise<SendResult> {
    return this.sendWithTemplate("welcome", data, message);
  }

  /**
   * Send an email verification email using the default email-verification template
   *
   * @example
   * ```ts
   * await courier.sendEmailVerification(
   *   {
   *     name: "Bob",
   *     verificationUrl: "https://example.com/verify?token=abc123",
   *     verificationCode: "ABC123",
   *     expiryHours: 24,
   *     companyName: "Acme Inc"
   *   },
   *   { to: "bob@example.com", subject: "Verify Your Email" }
   * );
   * ```
   *
   * @param data - Email verification template data
   * @param message - Email message configuration (to, subject, from, etc.)
   * @returns Send result with success status and message ID
   */
  sendEmailVerification(
    data: EmailVerificationData,
    message: Omit<EmailMessage, "html">,
  ): Promise<SendResult> {
    return this.sendWithTemplate("email-verification", data, message);
  }

  /**
   * Send a password reset email using the default password-reset template
   *
   * @example
   * ```ts
   * await courier.sendPasswordReset(
   *   {
   *     name: "Charlie",
   *     resetUrl: "https://example.com/reset?token=xyz789",
   *     resetCode: "XYZ789",
   *     expiryHours: 2,
   *     companyName: "Acme Inc"
   *   },
   *   { to: "charlie@example.com", subject: "Reset Your Password" }
   * );
   * ```
   *
   * @param data - Password reset template data
   * @param message - Email message configuration (to, subject, from, etc.)
   * @returns Send result with success status and message ID
   */
  sendPasswordReset(
    data: PasswordResetData,
    message: Omit<EmailMessage, "html">,
  ): Promise<SendResult> {
    return this.sendWithTemplate("password-reset", data, message);
  }

  /**
   * Send a notification email using the default notification template
   *
   * @example
   * ```ts
   * await courier.sendNotification(
   *   {
   *     type: "success",
   *     title: "Deployment Complete",
   *     message: "Your application has been deployed successfully.",
   *     details: "Build #1234 completed in 3m 45s",
   *     timestamp: new Date().toISOString()
   *   },
   *   { to: "dev@example.com", subject: "Deployment Notification" }
   * );
   * ```
   *
   * @param data - Notification template data
   * @param message - Email message configuration (to, subject, from, etc.)
   * @returns Send result with success status and message ID
   */
  sendNotification(
    data: NotificationData,
    message: Omit<EmailMessage, "html">,
  ): Promise<SendResult> {
    return this.sendWithTemplate("notification", data, message);
  }

  /**
   * Send a newsletter email using the default newsletter template
   *
   * @example
   * ```ts
   * await courier.sendNewsletter(
   *   {
   *     title: "Monthly Newsletter",
   *     sections: [
   *       { heading: "New Features", content: "Check out our latest updates...", link: "https://example.com/blog" }
   *     ],
   *     companyName: "Acme Inc",
   *     unsubscribeUrl: "https://example.com/unsubscribe"
   *   },
   *   { to: "subscriber@example.com", subject: "Monthly Newsletter - December 2025" }
   * );
   * ```
   *
   * @param data - Newsletter template data
   * @param message - Email message configuration (to, subject, from, etc.)
   * @returns Send result with success status and message ID
   */
  sendNewsletter(
    data: NewsletterData,
    message: Omit<EmailMessage, "html">,
  ): Promise<SendResult> {
    return this.sendWithTemplate("newsletter", data, message);
  }

  /**
   * Send an unsubscribe confirmation email using the default unsubscribe template
   *
   * @example
   * ```ts
   * await courier.sendUnsubscribeConfirmation(
   *   {
   *     name: "Dana",
   *     reason: "Too many emails",
   *     resubscribeUrl: "https://example.com/resubscribe?token=def456",
   *     companyName: "Acme Inc"
   *   },
   *   { to: "dana@example.com", subject: "You've been unsubscribed" }
   * );
   * ```
   *
   * @param data - Unsubscribe template data
   * @param message - Email message configuration (to, subject, from, etc.)
   * @returns Send result with success status and message ID
   */
  sendUnsubscribeConfirmation(
    data: UnsubscribeData,
    message: Omit<EmailMessage, "html">,
  ): Promise<SendResult> {
    return this.sendWithTemplate("unsubscribe", data, message);
  }

  /**
   * Close the transporter connection
   */
  close(): void {
    this.transporter.close();
  }
}
