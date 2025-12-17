/**
 * Generate HTML snapshots for all email templates
 * Run: deno run --allow-read --allow-write --allow-env generate-snapshots.ts
 */

import { Courier } from "../mod.ts";

// Mock SMTP config (won't actually send emails)
const courier = await Courier.initialize({
  smtp: {
    service: "iCloud",
    host: "smtp.mail.me.com",
    user: "test@example.com",
    pass: "fake-password",
  },
  defaultFrom: "test@example.com",
  templatesDir: "./src/emails",
});

console.log("📸 Generating email template snapshots...\n");

// Welcome Email
const welcomeHtml = await courier.renderTemplate("welcome", {
  name: "Alex Rivera",
  actionUrl: "https://example.com/start",
  companyName: "Courier",
  year: 2025,
  title: "Welcome to Courier",
});
await Deno.writeTextFile("./tests/snapshots/welcome.html", welcomeHtml);
console.log("✅ Generated: tests/snapshots/welcome.html");

// Email Verification
const verificationHtml = await courier.renderTemplate("email-verification", {
  title: "Verify Your Email Address",
  name: "Alex Rivera",
  verificationUrl: "https://example.com/verify?token=abc123xyz",
  verificationCode: "ABC123",
  expiryHours: 24,
  companyName: "Courier",
  year: 2025,
});
await Deno.writeTextFile("./tests/snapshots/email-verification.html", verificationHtml);
console.log("✅ Generated: tests/snapshots/email-verification.html");

// Password Reset
const passwordResetHtml = await courier.renderTemplate("password-reset", {
  title: "Reset Your Password",
  name: "Alex Rivera",
  resetUrl: "https://example.com/reset?token=xyz789",
  resetCode: "XYZ789",
  expiryHours: 2,
  companyName: "Courier",
  year: 2025,
});
await Deno.writeTextFile("./tests/snapshots/password-reset.html", passwordResetHtml);
console.log("✅ Generated: tests/snapshots/password-reset.html");

// Notification
const notificationHtml = await courier.renderTemplate("notification", {
  type: "success",
  title: "Deployment Successful",
  message: "Your application has been deployed successfully to production.",
  details: "Build #1234 completed in 5 minutes 32 seconds.",
  timestamp: new Date("2025-12-12T10:30:00Z").toISOString(),
  companyName: "Courier",
  year: 2025,
});
await Deno.writeTextFile("./tests/snapshots/notification.html", notificationHtml);
console.log("✅ Generated: tests/snapshots/notification.html");

// Newsletter
const newsletterHtml = await courier.renderTemplate("newsletter", {
  title: "Monthly Update - December 2025",
  sections: [
    {
      heading: "New Features",
      content:
        "We've added support for monospace email templates with a minimalist design system inspired by brutalist web design.",
      link: "https://example.com/blog/new-features",
      image: {
        src: "https://via.placeholder.com/600x200/000000/ffffff?text=New+Features",
        alt: "New Features Hero Image",
        layout: "hero",
      },
    },
    {
      heading: "Bug Fixes",
      content:
        "Fixed several important bugs related to email rendering and SMTP connection handling.",
      link: "https://example.com/changelog",
      image: {
        src: "https://via.placeholder.com/150/666666/ffffff?text=Bugs",
        alt: "Bug Fixes",
        layout: "left",
      },
    },
    {
      heading: "Documentation",
      content:
        "Updated documentation with new examples and best practices for creating accessible email templates.",
      link: "https://example.com/docs",
      image: {
        src: "https://via.placeholder.com/150/000000/ffffff?text=Docs",
        alt: "Documentation",
        layout: "right",
      },
    },
  ],
  companyName: "Courier",
  unsubscribeUrl: "https://example.com/unsubscribe?token=abc123",
  year: 2025,
});
await Deno.writeTextFile("./tests/snapshots/newsletter.html", newsletterHtml);
console.log("✅ Generated: tests/snapshots/newsletter.html");

// Unsubscribe Confirmation
const unsubscribeHtml = await courier.renderTemplate("unsubscribe", {
  title: "You've Been Unsubscribed",
  name: "Alex Rivera",
  reason: "Too many emails",
  resubscribeUrl: "https://example.com/resubscribe?token=def456",
  companyName: "Courier",
  year: 2025,
});
await Deno.writeTextFile("./tests/snapshots/unsubscribe.html", unsubscribeHtml);
console.log("✅ Generated: tests/snapshots/unsubscribe.html");

courier.close();

console.log("\n🎉 All snapshots generated successfully!");
console.log("📁 Location: tests/snapshots/");
console.log("💡 Open any HTML file in a browser to preview the template");
