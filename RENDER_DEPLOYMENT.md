# Deploy to Render (Free & Easy)

This guide will help you deploy your ExerAI application to Render for free with a shareable URL.

## Prerequisites

1. A GitHub account
2. Your code pushed to a GitHub repository

## Step 1: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

## Step 2: Deploy to Render

1. **Go to [Render.com](https://render.com)** and sign up/login
2. **Click "New +"** and select **"Blueprint"**
3. **Connect your GitHub account** if not already connected
4. **Select your repository** (exerai)
5. **Click "Connect"**

## Step 3: Configure Services

Render will automatically detect the `render.yaml` file and create 3 services:

### 1. Database (PostgreSQL)

- **Name**: exerai-db
- **Plan**: Free
- **No configuration needed** - Render handles this automatically

### 2. Backend (Django API)

- **Name**: exerai-backend
- **Plan**: Free
- **Environment**: Docker
- **Build Command**: Already configured in render.yaml
- **Start Command**: Already configured in render.yaml

### 3. Frontend (React)

- **Name**: exerai-frontend
- **Plan**: Free
- **Environment**: Static Site
- **Build Command**: Already configured in render.yaml

## Step 4: Deploy

1. **Click "Apply"** to start the deployment
2. **Wait for all services to deploy** (this takes 5-10 minutes)
3. **Your app will be available at**: `https://exerai-frontend.onrender.com`

## Step 5: Verify Deployment

1. **Check the frontend URL**: `https://exerai-frontend.onrender.com`
2. **Test the API**: `https://exerai-backend.onrender.com/api/movements/`
3. **Share the frontend URL** with your interviewer!

## Troubleshooting

### If deployment fails:

1. **Check the logs** in Render dashboard
2. **Common issues**:
   - Database connection: Wait for database to be ready
   - Build errors: Check if all dependencies are in requirements.txt
   - CORS issues: Verify CORS_ALLOWED_ORIGINS includes your frontend URL

### If the app doesn't work:

1. **Check environment variables** in Render dashboard
2. **Verify database is running**
3. **Check API endpoints** are responding

## Free Tier Limitations

- **Database**: 1GB storage, 90 days retention
- **Web Services**: Sleep after 15 minutes of inactivity
- **Static Sites**: No limitations

## Cost

**$0/month** - Everything runs on the free tier!

## Share Your App

Once deployed, share this URL with your interviewer:

```
https://exerai-frontend.onrender.com
```

The app will automatically wake up when accessed and work perfectly for demos!
