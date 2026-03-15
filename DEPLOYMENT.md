# Vercel Deployment Guide

## Environment Variables

Add the following environment variable in your Vercel project settings:

### Required
- **MONGODB_URI**: Your MongoDB connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
  - Environment: Production, Preview, Development

### Optional (for email functionality)
- **SMTP_HOST**: SMTP server hostname
- **SMTP_PORT**: SMTP server port
- **SMTP_USER**: SMTP username
- **SMTP_PASS**: SMTP password
- **ADMIN_EMAIL**: Email address to receive lead notifications
- **NEXT_PUBLIC_SITE_URL**: Your production URL (e.g., https://yourdomain.com)

## Deployment Steps

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add MONGODB_URI with your connection string
   - Select all environments (Production, Preview, Development)
4. Deploy or redeploy your project

## Build Configuration

The project is configured to:
- Only connect to MongoDB during request handling (not at build time)
- Use cached global mongoose connections for optimal performance
- Handle missing environment variables gracefully in development

## Troubleshooting

If you encounter build errors:
- Ensure MONGODB_URI is set in Vercel environment variables
- Verify the connection string format is correct
- Check that the MongoDB cluster allows connections from Vercel IPs (0.0.0.0/0)
- Redeploy after adding environment variables
