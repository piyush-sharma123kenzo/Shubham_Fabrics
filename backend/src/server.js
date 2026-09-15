import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import enquiryRoutes from './routes/enquiryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173,http://localhost:3000').split(',');

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin.startsWith(allowed.trim()))) {
      return callback(null, true);
    }
    // In development, allow localhost on any port
    if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
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
