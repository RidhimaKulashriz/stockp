# Vercel Deployment Guide

This project consists of three applications:
- **Frontend**: React landing page (port 3000)
- **Dashboard**: React dashboard app (port 3000)
- **Backend**: Express API server (port 3012)

## Pre-Deployment Checklist

### 1. Environment Variables

Create the following environment variables in Vercel:

**For Frontend & Dashboard:**
- `REACT_APP_API_URL`: Your backend API URL (e.g., `https://your-backend.vercel.app/api`)
- `REACT_APP_DASHBOARD_URL`: Your dashboard URL (e.g., `https://your-dashboard.vercel.app`)

**For Backend:**
- `MONGO_URL`: Your MongoDB connection string
- `PORT`: `3012` (or your preferred port)

### 2. MongoDB Setup

Ensure your MongoDB cluster is accessible from the internet. Update the connection string in your `.env` file.

### 3. Build Configuration

The project includes a `vercel.json` configuration file that handles:
- Building frontend and dashboard as static sites
- Deploying backend as a serverless function
- Routing API requests to the backend

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the root directory:
```bash
vercel
```

4. Set environment variables when prompted or in Vercel dashboard

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and click "New Project"
3. Import your GitHub repository
4. Configure environment variables in the project settings
5. Click "Deploy"

## Post-Deployment Configuration

### 1. Update Environment Variables

After deployment, you'll receive URLs for:
- Frontend: `https://your-project.vercel.app`
- Dashboard: `https://your-project.vercel.app/dashboard`
- Backend API: `https://your-project.vercel.app/api`

Update your environment variables accordingly:
- `REACT_APP_API_URL`: Set to your backend API URL
- `REACT_APP_DASHBOARD_URL`: Set to your dashboard URL

### 2. Redeploy

After updating environment variables, redeploy the project to apply changes.

## Local Development

To run the project locally:

1. **Frontend:**
```bash
cd frontend
npm install
npm start
```

2. **Dashboard:**
```bash
cd dashboard
npm install
npm start
```

3. **Backend:**
```bash
cd backend
npm install
npm start
```

## Troubleshooting

### Build Errors

If you encounter build errors:
1. Ensure all dependencies are installed in each directory
2. Check that Node.js version is compatible (recommend Node 18+)
3. Verify environment variables are set correctly

### API Connection Issues

If the frontend/dashboard cannot connect to the backend:
1. Check that `REACT_APP_API_URL` is set correctly
2. Verify the backend is deployed and accessible
3. Check CORS configuration in the backend

### MongoDB Connection Issues

If the backend cannot connect to MongoDB:
1. Verify `MONGO_URL` is correct
2. Check MongoDB cluster whitelist settings
3. Ensure MongoDB credentials are valid

## Project Structure

```
Zerodha-main/
├── frontend/          # React landing page
│   ├── src/
│   ├── public/
│   └── package.json
├── dashboard/         # React dashboard app
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Express API server
│   ├── api/
│   ├── model/
│   ├── index.js
│   └── package.json
├── vercel.json        # Vercel configuration
└── DEPLOYMENT.md      # This file
```

## Notes

- The backend uses serverless functions on Vercel
- MongoDB connection is established per request in serverless environment
- Static assets are served from the build directories
- API routes are prefixed with `/api`
