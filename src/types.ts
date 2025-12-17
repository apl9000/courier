/**
 * Theme configuration for customizing email styles at runtime
 */
export interface ThemeConfig {
  /** Color palette */
  colors?: {
    text?: string;
    textSecondary?: string;
    textAlt?: string;
    background?: string;
    backgroundSubtle?: string;
    backgroundAlt?: string;
    border?: string;
    borderSoft?: string;
    accent?: string;
    accentHover?: string;
    accentMuted?: string;
  };
  /** Typography settings */
  typography?: {
    fontFamily?: string;
    fontSize?: {
      xs?: string;
      sm?: string;
      base?: string;
      lg?: string;
      xl?: string;
      "2xl"?: string;
      "3xl"?: string;
    };
    fontWeight?: {
      normal?: string;
      medium?: string;
      semibold?: string;
      bold?: string;
      black?: string;
    };
    lineHeight?: string;
  };
  /** Spacing and layout */
  spacing?: {
    xs?: string;
    sm?: string;
    base?: string;
    md?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
    line?: string;
    containerPadding?: string;
  };
  /** Border styles */
  borders?: {
    widthThin?: string;
    width?: string;
    widthThick?: string;
    widthDouble?: string;
  };
  /** Container settings */
  container?: {
    maxWidth?: string;
  };
}

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
  /** Optional theme configuration for runtime customization */
  theme?: ThemeConfig;
  /** Enable debug logging (console.error for errors) */
  debug?: boolean;
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
  /** Optional list of features to highlight */
  features?: string[];
  /** Welcome message text (defaults to 'Welcome to {companyName}! We're excited to have you on board.') */
  welcomeMessage?: string;
  /** Features heading (defaults to 'What you can do:') */
  featuresHeading?: string;
  /** CTA instruction text (defaults to 'To get started, click the button below:') */
  ctaText?: string;
  /** CTA button label (defaults to 'GET STARTED') */
  ctaLabel?: string;
  /** Support text (defaults to 'If you have any questions, feel free to reach out to our support team.') */
  supportText?: string;
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
  /** Email title (defaults to 'Verify Your Email Address') */
  title?: string;
  /** Instruction text (defaults to 'Please verify your email address by clicking the button below:') */
  instructionText?: string;
  /** Verify button label (defaults to 'VERIFY EMAIL') */
  verifyLabel?: string;
  /** Code instruction text (defaults to 'Or use this verification code:') */
  codeInstructionText?: string;
  /** Expiry notice text (defaults to 'This link will expire in {expiryHours} hours.') */
  expiryNoticeText?: string;
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
  /** Email title (defaults to 'Reset Your Password') */
  title?: string;
  /** Instruction text (defaults to 'We received a request to reset your password. Click the button below to create a new password:') */
  instructionText?: string;
  /** Reset button label (defaults to 'RESET PASSWORD') */
  resetLabel?: string;
  /** Code instruction text (defaults to 'Or use this reset code:') */
  codeInstructionText?: string;
  /** Expiry notice text (defaults to 'This link will expire in {expiryHours} hours.') */
  expiryNoticeText?: string;
  /** Security notice text (defaults to "If you didn't request a password reset, please ignore this email or contact support if you have concerns.") */
  securityNoticeText?: string;
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
  timestamp?: string;
  /** Optional action URL */
  actionUrl?: string;
  /** Optional action button text */
  actionText?: string;
}

/**
 * Data required for the newsletter template
 */
export interface NewsletterData extends TemplateData {
  /** Newsletter title */
  title: string;
  /** Optional subtitle displayed below title */
  subtitle?: string;
  /** Optional featured content section */
  featured?: {
    heading: string;
    content: string;
    link?: string;
  };
  /** Newsletter content sections */
  sections: Array<{
    heading?: string;
    content: string;
    link?: string;
    linkText?: string;
    image?: {
      src: string;
      alt: string;
      layout?: "left" | "right" | "hero";
    };
  }>;
  /** Company name */
  companyName: string;
  /** Unsubscribe URL */
  unsubscribeUrl: string;
  /** Featured section button label (defaults to 'READ MORE') */
  featuredButtonLabel?: string;
  /** Section link text (defaults to 'Read more →') */
  sectionLinkText?: string;
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
  companyName: string;  /** Email title (defaults to "You've Been Unsubscribed") */
  title?: string;
  /** Confirmation message (defaults to 'You have been successfully unsubscribed from our mailing list.') */
  confirmationMessage?: string;
  /** Reason label (defaults to 'Reason:') */
  reasonLabel?: string;
  /** Resubscribe heading (defaults to 'Changed your mind?') */
  resubscribeHeading?: string;
  /** Resubscribe link text (defaults to 'Resubscribe to our newsletter') */
  resubscribeLinkText?: string;
}
