# Sahaja Solar Deployment Guide

## 🚀 Deployment Options

You have two deployment options:

### Option 1: Vercel (Frontend) + Render (Backend) - RECOMMENDED for split architecture
### Option 2: Vercel Full-Stack - Single platform deployment

---

## 📋 Option 1: Split Deployment (Vercel + Render)

This separates frontend and backend for better scalability.

### Step 1: Deploy Backend on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `https://github.com/Yashu257/Sahaja-Solar`
4. Configure:
   - **Name:** `sahaja-solar-backend`
   - **Region:** Choose closest to your users
   - **Branch:** `master`
   - **Root Directory:** Leave empty
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node dev-server.mjs`
   - **Plan:** Free (or paid for better performance)

5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV=production
   SUPABASE_URL=https://jhmbmxbetjtcfgyegltu.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
   SUPABASE_ANON_KEY=<your_anon_key>
   RESEND_API_KEY=<your_resend_key>
   EMAIL_FROM=Sahaja Solar <notifications@sahajasolar.com>
   BUSINESS_NOTIFICATION_EMAIL=sahajasolar@gmail.com,yashwanthk0705@gmail.com
   OPENAI_API_KEY=<your_openai_key>
   OPENAI_MODEL=gpt-4o-mini
   ```

6. Click "Create Web Service"
7. Wait for deployment (3-5 minutes)
8. Copy your Render URL (e.g., `https://sahaja-solar-backend.onrender.com`)

### Step 2: Deploy Frontend on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import `Yashu257/Sahaja-Solar` from GitHub
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Add Environment Variables:
   ```
   VITE_API_BASE_URL=https://sahaja-solar-backend.onrender.com
   ```

6. Click "Deploy"
7. Wait for deployment (2-3 minutes)
8. Your site will be live at: `https://sahaja-solar.vercel.app`

---

## 📋 Option 2: Vercel Full-Stack

Deploy everything on Vercel (frontend + backend API routes).

### Step 1: Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import `Yashu257/Sahaja-Solar` from GitHub
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Add ALL Environment Variables:
   ```
   SUPABASE_URL=https://jhmbmxbetjtcfgyegltu.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
   SUPABASE_ANON_KEY=<your_anon_key>
   RESEND_API_KEY=<your_resend_key>
   EMAIL_FROM=Sahaja Solar <notifications@sahajasolar.com>
   BUSINESS_NOTIFICATION_EMAIL=sahajasolar@gmail.com,yashwanthk0705@gmail.com
   OPENAI_API_KEY=<your_openai_key>
   OPENAI_MODEL=gpt-4o-mini
   ```

6. Click "Deploy"
7. Your site will be live at: `https://sahaja-solar.vercel.app`

---

## 🔧 Post-Deployment Steps

### 1. Test the Website
- Visit your deployed URL
- Test solar calculator
- Submit a test quote (use real email to verify email notifications)
- Submit a test booking
- Test Ask Sahaja chatbot

### 2. Test Admin Dashboard
- Go to `/admin`
- Login with admin credentials:
  - Email: `sahajasolar@gmail.com` or `yashwanthkothapalli454@gmail.com`
  - Password: (your Supabase Auth password)
- Verify you can see quotes and bookings

### 3. Verify Email Notifications
- Submit a quote from the website
- Check if business emails received notifications
- Check if customer received confirmation email

### 4. Monitor Logs
- **Vercel:** Dashboard → Project → Deployments → Logs
- **Render:** Dashboard → Service → Logs

---

## 🔒 Security Checklist

✅ All secret keys are set as environment variables
✅ `.env` file is in `.gitignore` and NOT committed
✅ `SUPABASE_SERVICE_ROLE_KEY` is server-side only
✅ `RESEND_API_KEY` is server-side only
✅ `OPENAI_API_KEY` is server-side only
✅ Admin authentication uses Supabase Auth

---

## 🐛 Troubleshooting

### Issue: API calls failing (404 errors)

**Solution for Split Deployment:**
- Verify `VITE_API_BASE_URL` in Vercel contains correct Render backend URL
- Check Render backend is running (not sleeping)
- Render free tier sleeps after inactivity - first request takes 30s

**Solution for Full-Stack:**
- Check Vercel function logs
- Verify environment variables are set

### Issue: Database not connecting

- Verify Supabase credentials in environment variables
- Check Supabase project is active
- Run the SQL migration in Supabase if not done

### Issue: Email not sending

- Verify RESEND_API_KEY is correct
- Check Resend dashboard for API usage
- Verify EMAIL_FROM domain is verified in Resend

### Issue: Admin login not working

- Verify admin users exist in Supabase Auth
- Check Supabase URL and ANON_KEY are correct
- Clear browser cache and try again

### Issue: Chatbot not responding

- Verify OPENAI_API_KEY is set correctly
- Check OpenAI API key has credits
- Check server logs for API errors

---

## 📊 Custom Domain Setup (Optional)

### On Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `sahajasolar.com`)
3. Update DNS records as instructed by Vercel

### On Render (if using split deployment):
1. Go to Service Settings → Custom Domain
2. Add backend subdomain (e.g., `api.sahajasolar.com`)
3. Update DNS records
4. Update `VITE_API_BASE_URL` in Vercel to new domain

---

## 🎯 Next Steps

1. **Set up Resend domain verification** for production emails
2. **Configure Google Analytics** (optional)
3. **Set up monitoring** (Sentry, LogRocket, etc.)
4. **Regular backups** of Supabase database
5. **Monitor API usage** (OpenAI, Resend quotas)

---

## 📞 Support

For deployment issues, contact:
- Email: sahajasolar@gmail.com
- GitHub: https://github.com/Yashu257/Sahaja-Solar

---

## ✅ Deployment Complete!

Your Sahaja Solar website is now live! 🎉
