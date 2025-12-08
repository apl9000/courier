/**
 * Configuration for iCloud SMTP
 */
export interface ICloudSMTPConfig {
  /** iCloud email address */
  user: string;
  /** App-specific password for iCloud */
  pass: string;
  /** Optional custom SMTP host (defaults to smtp.mail.me.com) */
  host?: string;
  /** Optional custom SMTP port (defaults to 587) */
  port?: number;
  /** Enable secure connection (defaults to false for STARTTLS) */
  secure?: boolean;
}

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
 * Email attachment configuration
 */
export interface EmailAttachment {
  /** Filename for the attachment */
  filename: string;
  /** Content of the attachment (string, buffer, or stream) */
  content?: string | Uint8Array;
  /** Path to file to attach */
  path?: string;
  /** Content type (MIME type) */
  contentType?: string;
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
  /** Optional email attachments */
  attachments?: EmailAttachment[];
  /** Optional reply-to address */
  replyTo?: string | EmailAddress;
}

/**
 * Courier configuration
 */
export interface CourierConfig {
  /** iCloud SMTP configuration */
  smtp: ICloudSMTPConfig;
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
