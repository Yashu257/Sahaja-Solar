# Sahaja Solar - Rooftop Solar Solutions Website

Complete solar energy website with quote system, booking system, AI chatbot, and admin dashboard.

## 🚀 Tech Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express (serverless-compatible)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Email:** Resend API
- **AI:** OpenAI (gpt-4o-mini)

## 📦 Features

- Solar calculator with PM Surya Ghar subsidy estimation
- Quote request system with email notifications
- Consultation booking system with availability management
- AI chatbot (Ask Sahaja) for solar queries
- Admin dashboard for managing leads and bookings
- Responsive design with scroll animations

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Resend account
- OpenAI API key

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your credentials
# Run development server
npm run dev
```

Visit http://localhost:3000

### Database Setup

Run the migration in your Supabase SQL Editor:
```sql
-- See: supabase/migrations/20260731000000_sahaja_solar_schema.sql
```

### Admin User Setup

Create admin users in Supabase Dashboard > Authentication > Users

## 🌐 Deployment

### Option 1: Vercel (Full-Stack)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Option 2: Split Deployment (Vercel Frontend + Render Backend)

#### Frontend on Vercel:
1. Import GitHub repository in Vercel
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variable: `VITE_API_BASE_URL=https://your-backend.onrender.com`
5. Deploy

#### Backend on Render:
1. Create Web Service on Render
2. Build command: `npm install`
3. Start command: `node dev-server.mjs`
4. Add all server environment variables
5. Deploy

## 🔐 Environment Variables

### Frontend (Client-side)
```
VITE_API_BASE_URL=           # Backend URL (empty for same-origin)
```

### Backend (Server-side only)
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
RESEND_API_KEY=
EMAIL_FROM=
BUSINESS_NOTIFICATION_EMAIL=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

## 📝 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
```

## 🔒 Security

- All secret keys are server-side only
- Admin authentication via Supabase Auth
- Rate limiting on chat API (20 req/min)
- Input validation on all endpoints

## 📧 Contact

- Email: sahajasolar@gmail.com
- Phone: +91 80196 04025

## 📄 License

Proprietary - Sahaja Solar Energy Solutions Pvt. Ltd.
