/**
 * Local Development Server for Sahaja Solar
 * Handles API routes that would normally be Vercel serverless functions
 */

// Load environment variables FIRST before any other imports
import dotenv from 'dotenv';
const result = dotenv.config();

if (result.error) {
  console.error('❌ ERROR: Failed to load .env file');
  console.error(result.error);
  process.exit(1);
}

// Verify critical environment variables are loaded
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ ERROR: Missing Supabase credentials in .env file');
  console.error('Required: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log('   SUPABASE_URL: CONFIGURED');
console.log('   SUPABASE_SERVICE_ROLE_KEY: CONFIGURED');
console.log('   SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'CONFIGURED' : 'NOT CONFIGURED');

import express from 'express';
import { createServer as createViteServer } from 'vite';

const app = express();
app.use(express.json());

// Import API handlers
async function loadApiHandlers() {
  const quotesHandler = (await import('./api/quotes.ts')).default;
  const bookingsHandler = (await import('./api/bookings.ts')).default;
  const availabilityHandler = (await import('./api/bookings/availability.ts')).default;
  const chatHandler = (await import('./api/chat.ts')).default;
  
  // Admin API handlers
  const adminLoginHandler = (await import('./api/admin/login.ts')).default;
  const adminLeadsHandler = (await import('./api/admin/leads.ts')).default;
  const adminBookingsHandler = (await import('./api/admin/bookings.ts')).default;
  const adminDashboardHandler = (await import('./api/admin/dashboard.ts')).default;
  const adminAvailabilityHandler = (await import('./api/admin/availability.ts')).default;

  return {
    quotesHandler,
    bookingsHandler,
    availabilityHandler,
    chatHandler,
    adminLoginHandler,
    adminLeadsHandler,
    adminBookingsHandler,
    adminDashboardHandler,
    adminAvailabilityHandler,
  };
}

async function startServer() {
  // Load API handlers
  const handlers = await loadApiHandlers();

  // API Routes
  app.all('/api/quotes', handlers.quotesHandler);
  app.all('/api/bookings', handlers.bookingsHandler);
  app.all('/api/bookings/availability', handlers.availabilityHandler);
  app.all('/api/chat', handlers.chatHandler);
  
  // Admin API Routes
  app.all('/api/admin/login', handlers.adminLoginHandler);
  app.all('/api/admin/leads', handlers.adminLeadsHandler);
  app.all('/api/admin/bookings', handlers.adminBookingsHandler);
  app.all('/api/admin/dashboard', handlers.adminDashboardHandler);
  app.all('/api/admin/availability', handlers.adminAvailabilityHandler);

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Use Vite's connect instance as middleware
  app.use(vite.middlewares);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`\n🚀 Sahaja Solar Development Server`);
    console.log(`\n   Local:   http://localhost:${PORT}/`);
    console.log(`\n✅ API endpoints ready:`);
    console.log(`   - POST /api/quotes`);
    console.log(`   - POST /api/bookings`);
    console.log(`   - GET  /api/bookings/availability`);
    console.log(`   - POST /api/chat`);
    console.log(`   - POST /api/admin/login`);
    console.log(`   - GET  /api/admin/leads`);
    console.log(`   - GET  /api/admin/bookings`);
    console.log(`   - GET  /api/admin/dashboard`);
    console.log(`   - GET/POST /api/admin/availability\n`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start development server:', err);
  process.exit(1);
});
