import dotenv from "dotenv";
import { sendEmail } from "./utils/sendEmail.js";

dotenv.config();

// Test email configuration
console.log("=== Email Configuration Test ===");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "✅ Set" : "❌ Not set");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Set" : "❌ Not set");
console.log("Email account:", process.env.EMAIL_USER);

// Test sending email
const testEmail = async () => {
  try {
    console.log("\n📧 Attempting to send test email...");
    await sendEmail(
      process.env.EMAIL_USER, // Send to yourself for testing
      "Test Email - Healthcare App",
      "This is a test email. If you receive this, your email configuration is working!"
    );
    console.log("✅ Test email sent successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test email failed:", error.message);
    console.error("\n🔧 Troubleshooting steps:");
    console.error("1. Make sure EMAIL_USER and EMAIL_PASS are set in server/.env");
    console.error("2. Use Gmail App Password (not regular password)");
    console.error("3. Enable 2FA on your Google account");
    console.error("4. Generate App Password: https://myaccount.google.com/apppasswords");
    process.exit(1);
  }
};

testEmail();
