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

## Enquiry & Email Dispatch System

- **Recipient Inbox**: `shubhamfabricsindia1@gmail.com`
- When a customer submits an inquiry on the website:
  1. The frontend attempts `http://localhost:5000/api/enquiry`.
  2. The backend records and dispatches the inquiry notification to `shubhamfabricsindia1@gmail.com`.
  3. If the backend is ever offline, the frontend automatically falls back to `formsubmit.co` and direct `mailto:` client opening.
