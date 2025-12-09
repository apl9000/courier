/**
 * SMTP Provider configuration
 * Supports iCloud (smtp.mail.me.com) and Microsoft Outlook (smtp-mail.outlook.com)
 */
export interface SMTPConfig {
  /** Email address */
  user: string;
  /** App-specific password or account password */
  pass: string;
  /** SMTP host (defaults to smtp.mail.me.com for iCloud) */
  host?: string;
  /** SMTP port (defaults to 587) */
  port?: number;
  /** Enable secure connection (defaults to false for STARTTLS) */
  secure?: boolean;
}

/**
 * Predefined SMTP providers
 */
export const SMTPProviders = {
  iCloud: {
    host: "smtp.mail.me.com",
    port: 587,
    secure: false,
  },
  Microsoft: {
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
  },
} as const;

/**
 * Email address with optional name
 */
export interface EmailAddress {
  /** Email address */
  email: string;
  /** Optional display name */
  name?: string;
}

/**
 * Template data for Handlebars rendering
 */
export interface TemplateData {
  [key: string]: unknown;
}

/**
 * Email message configuration
 */
export interface EmailMessage {
  /** Sender email address (optional, uses defaultFrom or SMTP user if not provided) */
  from?: string | EmailAddress;
  /** Recipient email address(es) */
  to: string | EmailAddress | Array<string | EmailAddress>;
  /** Optional CC recipients */
  cc?: string | EmailAddress | Array<string | EmailAddress>;
  /** Optional BCC recipients */
  bcc?: string | EmailAddress | Array<string | EmailAddress>;
  /** Email subject line */
  subject: string;
  /** Plain text version of email */
  text?: string;
  /** HTML version of email */
  html?: string;
  /** Optional reply-to address */
  replyTo?: string | EmailAddress;
}

/**
 * Courier configuration
 */
export interface CourierConfig {
  /** SMTP configuration */
  smtp: SMTPConfig;
  /** Optional default sender address */
  defaultFrom?: string | EmailAddress;
  /** Optional template directory path */
  templatesDir?: string;
}

/**
 * Email send result
 */
export interface SendResult {
  /** Whether the email was sent successfully */
  success: boolean;
  /** Message ID from the SMTP server */
  messageId?: string;
  /** Error message if send failed */
  error?: string;
}
