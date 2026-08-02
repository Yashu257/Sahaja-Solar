/**
 * Production Server for Sahaja Solar Backend API
 * Handles API routes without Vite dependency
 */

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Verify critical environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ ERROR: Missing Supabase credentials in environment variables');
  console.error('Required: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log('   SUPABASE_URL: CONFIGURED');
console.log('   SUPABASE_SERVICE_ROLE_KEY: CONFIGURED');
console.log('   SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'CONFIGURED' : 'NOT CONFIGURED');

import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS for all origins (adjust for production if needed)
app.use(cors());
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

  // Health check endpoint
  app.get('/', (req, res) => {
    res.json({ 
      status: 'ok', 
      message: 'Sahaja Solar Backend API',
      timestamp: new Date().toISOString()
    });
  });

  app.get('/health', (req, res) => {
    res.json({ 
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

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

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Sahaja Solar Backend API`);
    console.log(`\n   Server:  http://0.0.0.0:${PORT}/`);
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
  console.error('Failed to start server:', err);
  process.exit(1);
});
