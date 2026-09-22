# Shubham Fabrics India Pvt Ltd — Web Application

Official digital showroom and web platform for **SHUBHAM FABRICS INDIA PRIVATE LIMITED**.

---

## Architecture Overview

The repository is structured into two clean, self-contained directories:

```
d:\Shubham_Fabrics\
├── frontend/                     # React 18 + Vite SPA client
│   ├── public/                   # Media assets, swatches, videos, logos
│   ├── src/                      # UI components, pages, context, data, styles
│   ├── index.html                # Main entry HTML
│   ├── vite.config.js            # Vite bundler configuration
│   ├── tailwind.config.js        # Design tokens & color system
│   └── package.json              # Frontend dependencies
│
├── backend/                      # Node.js + Express API server
│   ├── src/
│   │   ├── routes/
│   │   │   └── enquiryRoutes.js  # POST /api/enquiry, GET /api/health
│   │   ├── services/
│   │   │   └── emailService.js   # Nodemailer email dispatcher
│   │   └── server.js             # Express app setup & CORS configuration
│   ├── .env.example              # Environment variables template
│   └── package.json              # Backend dependencies
│
├── package.json                  # Root workspace runner
└── README.md
```

---

## Quick Start Guide

### 1. Run Both Frontend & Backend (Recommended)
From the project root:
```bash
npm run dev
```
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

### 2. Run Independently

#### Frontend Only
```bash
cd frontend
npm install
npm run dev
```
Build for production:
```bash
npm run build
```

#### Backend Only
```bash
cd backend
npm install
npm run dev
```

---

## Direct Enquiry System

- **Official Recipient Inbox**: `shubhamfabricsindia1@gmail.com`
- **Customer Enquiry Flow**:
  1. A customer enters their Name, Phone, Email, and requirements (or clicks "Enquire Now" on any product, fabric, or showroom button).
  2. With normal clicking on **"Submit Enquiry"** (no OTP verification code required), the inquiry is dispatched directly to `shubhamfabricsindia1@gmail.com`.
  3. The enquiry is also stored locally in `backend/data/enquiries.json` and session storage for persistent backup.
  4. The customer can also click **"Open in Gmail / Mail App"** to send a direct copy from their personal email client.
