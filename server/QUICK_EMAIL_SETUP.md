# Quick Email Setup for OTP

## Step 1: Check if .env file exists

Open `server/.env` file. If it doesn't exist, create it by copying from `server/env.example`:

```bash
cd server
copy env.example .env
```

## Step 2: Get Gmail App Password

1. Go to: https://myaccount.google.com/security
2. Click "2-Step Verification" → Enable it if not already
3. Go back to Security page
4. Click "App passwords" (under "Signing in to Google")
5. Select:
   - App: **Mail**
   - Device: **Other** → Type "Healthcare App"
6. Click **Generate**
7. **Copy the 16-character password** (example: `abcd efgh ijkl mnop`)

## Step 3: Update server/.env file

Open `server/.env` and add/update these lines:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

**Example:**
```env
EMAIL_USER=manalipanchal2404@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

⚠️ **Important:**
- Use your actual Gmail address
- Use the App Password (16 characters), NOT your regular Gmail password
- Remove spaces from the app password or keep them (both work)

## Step 4: Test Email Configuration

Run this test script:

```bash
cd server
node test-email.js
```

This will:
- Check if EMAIL_USER and EMAIL_PASS are set
- Try to send a test email to yourself
- Show detailed error messages if it fails

## Step 5: Restart Your Server

```bash
cd server
npm start
```

## Step 6: Test OTP Login

1. Go to your app login page
2. Click "OTP Login"
3. Enter your email
4. Click "Send OTP"
5. Check server console for logs
6. Check your email (and spam folder)

## Common Errors & Solutions

### Error: "Email configuration missing"
**Solution:** Make sure EMAIL_USER and EMAIL_PASS are in server/.env file

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"
**Solution:** 
- You're using regular password instead of App Password
- Generate App Password from Google Account settings
- Make sure 2FA is enabled

### Error: "Less secure app access"
**Solution:** 
- Google no longer supports this
- You MUST use App Password (requires 2FA)

### OTP shows in response but email not received
**Solution:**
- This means email sending failed
- Check server console for detailed error
- Verify EMAIL_USER and EMAIL_PASS are correct
- Check spam folder

## Alternative: Use Console OTP (Development Only)

If email setup is too complicated for now, the current code will show the OTP in the API response when email fails (in development mode).

You can use that OTP to test the login flow.

## Need Help?

Check the server console logs - they show detailed information about what's happening with the email sending process.
