# Vercel Deployment Guide

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- Vercel CLI installed: `npm i -g vercel`

## Project Structure
Your project has two separate apps:
- **Client** (React + Vite) - Frontend
- **Server** (Node.js + Express) - Backend API

## Deployment Steps

### 1. Deploy Backend (Server)

```bash
cd server
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **health-care-server** (or your choice)
- Directory? **./server**
- Override settings? **N**

After deployment, you'll get a URL like: `https://health-care-server.vercel.app`

**Important:** Add environment variables in Vercel Dashboard:
1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add all variables from your `.env` file:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `STRIPE_SECRET_KEY`
   - etc.

### 2. Deploy Frontend (Client)

```bash
cd client
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **health-care-client** (or your choice)
- Directory? **./client**
- Override settings? **N**

After deployment, you'll get a URL like: `https://health-care-client.vercel.app`

**Important:** Update the API URL:
1. Create a `.env` file in client folder (if not exists)
2. Add: `VITE_API_URL=https://your-server-url.vercel.app`
3. Update your code to use `import.meta.env.VITE_API_URL` instead of hardcoded URL

### 3. Update CORS Settings

In your `server/index.js`, update CORS to allow your frontend domain:

```javascript
app.use(cors({
  origin: ['https://health-care-client.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### 4. Redeploy

After making changes, redeploy:

```bash
# In server folder
vercel --prod

# In client folder  
vercel --prod
```

## Alternative: Deploy via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your Git repository
4. Configure:
   - **For Server:**
     - Root Directory: `server`
     - Build Command: (leave empty)
     - Output Directory: (leave empty)
   - **For Client:**
     - Root Directory: `client`
     - Build Command: `npm run build`
     - Output Directory: `dist`
5. Add environment variables
6. Click "Deploy"

## Important Notes

- Deploy server first, then update client with server URL
- Make sure all environment variables are set in Vercel dashboard
- MongoDB Atlas should allow connections from anywhere (0.0.0.0/0) for Vercel
- Test all API endpoints after deployment
- Check Vercel logs if something doesn't work

## Useful Commands

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]
```

## Troubleshooting

1. **API not connecting:** Check CORS settings and API URL in client
2. **Database connection failed:** Verify MongoDB Atlas allows Vercel IPs
3. **Environment variables missing:** Add them in Vercel dashboard
4. **Build failed:** Check build logs in Vercel dashboard
