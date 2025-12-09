/**
 * Template-specific data types for default email templates
 */

/**
 * Data required for the welcome email template
 */
export interface WelcomeEmailData {
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
export interface EmailVerificationData {
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
export interface PasswordResetData {
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
export interface NotificationData {
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
export interface NewsletterData {
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
export interface UnsubscribeData {
  /** Recipient's name */
  name: string;
  /** Reason for unsubscribe (optional) */
  reason?: string;
  /** Resubscribe URL */
  resubscribeUrl: string;
  /** Company name */
  companyName: string;
}
