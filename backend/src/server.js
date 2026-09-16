import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import enquiryRoutes from './routes/enquiryRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import { verifyEmailConfig } from './services/emailService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup: Allow all origins
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Shubham Fabrics India API',
    recipientEmail: process.env.RECIPIENT_EMAIL || 'shubhamfabricsindia1@gmail.com',
    timestamp: new Date().toISOString()
  });
});

// Email Dispatcher Auth Status endpoint
app.get('/api/auth/status', async (req, res) => {
  try {
    const authStatus = await verifyEmailConfig();
    res.status(authStatus.authenticated ? 200 : (authStatus.configured ? 401 : 200)).json({
      dispatcher: authStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Failed to verify email dispatcher status'
    });
  }
});

// Mount Routes
app.use('/api/otp', otpRoutes);
app.use('/api/enquiry', enquiryRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start Server
app.listen(PORT, async () => {
  console.log(`=============================================`);
  console.log(`✨ Shubham Fabrics Backend API Server`);
  console.log(`📡 Running on: http://localhost:${PORT}`);
  console.log(`📧 Target Recipient: ${process.env.RECIPIENT_EMAIL || 'shubhamfabricsindia1@gmail.com'}`);

  const authStatus = await verifyEmailConfig();
  if (authStatus.provider === 'resend') {
    console.log(`⚡ [RESEND DISPATCHER] ✅ Ready & Authenticated!`);
    console.log(`   Sender: ${authStatus.sender}`);
    console.log(`   All showroom enquiries will deliver to: ${authStatus.recipient}`);
  } else if (authStatus.provider === 'gmail' && authStatus.authenticated) {
    console.log(`🔐 [GMAIL SMTP] ✅ Authenticated as ${authStatus.user}`);
  } else {
    console.log(`⚠️  [DISPATCHER] Set RESEND_API_KEY in backend/.env to enable live delivery.`);
  }
  console.log(`=============================================`);
});
