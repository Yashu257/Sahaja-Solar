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
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Set up module resolution for TypeScript path aliases
process.env.NODE_PATH = resolve(__dirname, 'src');

// Import API handlers dynamically with proper paths
async function loadApiHandlers() {
  const apiPath = resolve(__dirname, 'api');
  
  const quotesHandler = (await import(`${apiPath}/quotes.ts`)).default;
  const bookingsHandler = (await import(`${apiPath}/bookings.ts`)).default;
  const availabilityHandler = (await import(`${apiPath}/bookings/availability.ts`)).default;
  const chatHandler = (await import(`${apiPath}/chat.ts`)).default;
  
  // Admin API handlers
  const adminLoginHandler = (await import(`${apiPath}/admin/login.ts`)).default;
  const adminLeadsHandler = (await import(`${apiPath}/admin/leads.ts`)).default;
  const adminBookingsHandler = (await import(`${apiPath}/admin/bookings.ts`)).default;
  const adminDashboardHandler = (await import(`${apiPath}/admin/dashboard.ts`)).default;
  const adminAvailabilityHandler = (await import(`${apiPath}/admin/availability.ts`)).default;

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
