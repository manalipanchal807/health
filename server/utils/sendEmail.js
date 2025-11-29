import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ EMAIL_USER or EMAIL_PASS not configured in .env");
      throw new Error("Email configuration missing. Please set EMAIL_USER and EMAIL_PASS in .env file");
    }

    console.log("📧 Attempting to send email to:", to);
    console.log("📧 Using email account:", process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      service: "gmail", // or use SMTP config
      auth: {
        user: process.env.EMAIL_USER, // your Gmail/SMTP email
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    // Verify transporter configuration
    await transporter.verify();
    console.log("✅ Email transporter verified");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to", to);
    console.log("📧 Message ID:", info.messageId);
    
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    console.error("❌ Full error:", error);
    throw new Error(`Email could not be sent: ${error.message}`);
  }
};
