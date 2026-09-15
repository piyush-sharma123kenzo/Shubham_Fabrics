import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import enquiryRoutes from './routes/enquiryRoutes.js';
import otpRoutes from './routes/otpRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup: Allow localhost, Vercel deployments, and production domains
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

// Mount Routes
app.use('/api/otp', otpRoutes);
app.use('/api/enquiry', enquiryRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`✨ Shubham Fabrics Backend API Server`);
  console.log(`📡 Running on: http://localhost:${PORT}`);
  console.log(`📧 Target Recipient: ${process.env.RECIPIENT_EMAIL || 'shubhamfabricsindia1@gmail.com'}`);
  console.log(`=============================================`);
});
