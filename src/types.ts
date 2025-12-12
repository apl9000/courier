/**
 * SMTP Provider configuration
 * Supports iCloud (smtp.mail.me.com) and Microsoft Outlook (smtp-mail.outlook.com)
 */
export interface SMTPConfig {
  service: "iCloud" | "Microsoft";
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
    service: "iCloud",
    host: "smtp.mail.me.com",
    port: 587,
    secure: false,
  },
  Microsoft: {
    service: "Microsoft",
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
  },
};

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

/**
 * Data required for the welcome email template
 */
export interface WelcomeEmailData extends TemplateData {
  /** Recipient's name */
  name: string;
  /** Optional call-to-action URL */
  actionUrl?: string;
  /** Current year for copyright */
  year: number;
  /** Company name */
  companyName: string;
}

/**
 * Data required for the email verification template
 */
export interface EmailVerificationData extends TemplateData {
  /** Recipient's name */
  name: string;
  /** Verification URL or link */
  verificationUrl: string;
  /** Optional verification code */
  verificationCode?: string;
  /** Expiry time in hours */
  expiryHours: number;
  /** Company name */
  companyName: string;
}

/**
 * Data required for the password reset template
 */
export interface PasswordResetData extends TemplateData {
  /** Recipient's name */
  name: string;
  /** Password reset URL */
  resetUrl: string;
  /** Optional reset code */
  resetCode?: string;
  /** Expiry time in hours */
  expiryHours: number;
  /** Company name */
  companyName: string;
}

/**
 * Data required for the notification template
 */
export interface NotificationData extends TemplateData {
  /** Notification type (info, warning, error, success) */
  type: "info" | "warning" | "error" | "success";
  /** Notification title */
  title: string;
  /** Notification message */
  message: string;
  /** Optional additional details */
  details?: string;
  /** Timestamp of the notification */
  timestamp: string;
}

/**
 * Data required for the newsletter template
 */
export interface NewsletterData extends TemplateData {
  /** Newsletter title */
  title: string;
  /** Newsletter content sections */
  sections: Array<{
    heading: string;
    content: string;
    link?: string;
  }>;
  /** Company name */
  companyName: string;
  /** Unsubscribe URL */
  unsubscribeUrl: string;
}

/**
 * Data required for the unsubscribe template
 */
export interface UnsubscribeData extends TemplateData {
  /** Recipient's name */
  name: string;
  /** Reason for unsubscribe (optional) */
  reason?: string;
  /** Resubscribe URL */
  resubscribeUrl: string;
  /** Company name */
  companyName: string;
}
