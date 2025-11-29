# Email Setup Guide for OTP Feature

## Problem
OTP emails are not being sent during login.

## Solution: Configure Gmail App Password

### Step 1: Enable 2-Factor Authentication on Gmail

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** (left sidebar)
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the steps to enable 2FA (if not already enabled)

### Step 2: Generate App Password

1. After enabling 2FA, go back to **Security**
2. Under "Signing in to Google", click **App passwords**
3. You might need to sign in again
4. Select app: **Mail**
5. Select device: **Other (Custom name)**
6. Enter name: **Healthcare App**
7. Click **Generate**
8. Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

### Step 3: Update Your .env File

Open `server/.env` and update these lines:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # The 16-character app password (spaces are optional)
```

**Example:**
```env
EMAIL_USER=manalipanchal2404@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

### Step 4: Restart Your Server

```bash
cd server
npm start
```

### Step 5: Test OTP

1. Go to your login page
2. Click "OTP Login"
3. Enter your email
4. Click "Send OTP"
5. Check your email inbox (and spam folder)
6. Enter the OTP and login

## Troubleshooting

### Issue: "Invalid credentials" or "Authentication failed"

**Solution:**
- Make sure you're using an **App Password**, not your regular Gmail password
- Remove any spaces from the app password in .env file
- Make sure 2FA is enabled on your Google account

### Issue: "Less secure app access"

**Solution:**
- Google no longer supports "less secure apps"
- You MUST use App Passwords (requires 2FA)

### Issue: Email not received

**Check:**
1. Spam/Junk folder
2. Server logs for errors
3. Email address is correct
4. Gmail account has sending limits (500 emails/day for free accounts)

### Issue: "Email configuration missing"

**Solution:**
- Make sure `EMAIL_USER` and `EMAIL_PASS` are set in `server/.env`
- Restart the server after updating .env

## Alternative: Use a Different Email Service

If Gmail doesn't work, you can use other services:

### Option 1: SendGrid (Recommended for production)

1. Sign up at https://sendgrid.com/
2. Get API key
3. Update `server/utils/sendEmail.js`:

```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: process.env.EMAIL_USER,
    subject,
    text,
  };
  await sgMail.send(msg);
};
```

### Option 2: Resend (Modern alternative)

1. Sign up at https://resend.com/
2. Get API key
3. Update code to use Resend API

## Testing in Development

For development, you can temporarily log the OTP to console:

The updated code now logs OTP to console if email fails, so you can still test the feature.

## Production Checklist

- [ ] 2FA enabled on Gmail
- [ ] App password generated
- [ ] EMAIL_USER and EMAIL_PASS set in Vercel environment variables
- [ ] Server redeployed after env variable changes
- [ ] Test OTP on production URL
- [ ] Remove console.log statements showing OTP

## Security Notes

- Never commit .env file to Git
- Use environment variables in production (Vercel/Netlify)
- App passwords are safer than regular passwords
- OTP expires after 5 minutes
- Consider rate limiting OTP requests to prevent abuse
