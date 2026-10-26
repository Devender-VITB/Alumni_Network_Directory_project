# 🎓 AlumniConnect: Professional Alumni Network Directory

> **"Your Alumni. Your Network. Your Future."**  
> A modern, full-stack MERN application connecting university graduates across decades to foster lifelong collaboration, career mentorship, and intellectual growth.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB / Mongoose](https://img.shields.io/badge/MongoDB-Mongoose_8.9-47A248?logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Tests Passing](https://img.shields.io/badge/Tests-22_Passed-success)](https://vitest.dev/)

---

## 🌟 Key Platform Features

### 1. 🏛️ Public Institutional Landing Page (`/`)
- **Editorial Design System**: Refined university typography, navy brand palette (`#142B4A`), soft backgrounds (`#F6F8FC`), and WCAG AAA compliant text contrast.
- **Hero & Value Proposition**: Engaging typography, call-to-actions, trust indicators, and interactive live card showcase.
- **Network Statistics Counter**: Fictional demonstration statistics (2,500+ Alumni, 45+ Graduating Batches, 30+ Industries, 18+ Countries).
- **Core Capability Cards**: Direct access to Find Alumni, Career Mentorship, Exclusive Events, and Global Regional Chapters.
- **Featured Alumni Spotlight**: 4 featured leader cards showcasing batch years, titles, employers, and verified badges.
- **Graduate Success Testimonials**: Testimonial carousels from senior alumni in research, fintech, and startups.

### 2. 🔍 Multi-Criteria Alumni Directory (`/directory`)
- **Comprehensive Search**: Debounced search by Name, Current Employer, Job Title, Academic Department, Skills, or Location.
- **Dynamic Multi-Filters**:
  - Academic Department (CS, IT, EEE, Mechanical, Biotech, Math, Management)
  - Graduating Batch (Class of 2012 through 2024)
  - Industry Sector (AI, FinTech, Cloud Computing, Clean Energy, Healthcare, etc.)
  - Degree Program (B.Tech, M.Tech, MBA, Ph.D.)
  - Available for 1-on-1 Mentorship toggle
  - Top 10 Popular Skill pills
- **Flexible Sorting**: Name (A→Z, Z→A), Batch Year (Newest First, Oldest First).
- **Active Filter Chips**: Live chips with individual remove buttons and a single-click "Clear All Filters" button.
- **Responsive UX**: Filter modal drawer on mobile/tablet viewports, loading skeletons, and empty state fallbacks.

### 3. 👤 Alumni Profiles & Self-Editing (`/alumni/:id`)
- **Comprehensive Career View**: Bio, Current Role, Employer, Location, Academic Degree, and verified badge.
- **Structured Experience & Education**: Chronological timeline of roles and university education.
- **Mentorship Availability**: Highlighted focus areas (e.g. AI Research, VC Pitching, Big Tech Interviews).
- **Privacy-Governed Contact Sharing**: Contact details (email, phone) masked unless explicit sharing is enabled by the alumnus.
- **Self-Profile Editing**: Authenticated profile owners can modify their bio, headline, skills, and contact preferences through an interactive modal.

### 4. 🔐 Robust Authentication & Role-Based Access Control
- **Dual Authentication Modes**:
  - Works with high-fidelity Demo Mode out of the box (with convenient "Fill Demo Credentials" buttons for Admin & Alumni).
  - Production-ready JWT authentication stored in HTTP headers or HttpOnly cookies.
- **Registration**: Form validation, minimum 8-character password enforcement, and duplicate email prevention.
- **Password Security**: Passwords hashed with `bcryptjs` (10 rounds); password hashes explicitly excluded from API output.
- **Role Permissions**: Strict boundary separation between regular alumni (`user`) and administrators (`admin`).

### 5. 📊 Personalized Member Dashboard (`/dashboard`)
- **Welcome Banner**: Dynamic greeting tailored to member's first name with quick navigation shortcuts.
- **Profile Strength Meter**: Interactive 85% completion progress bar with actionable checklist.
- **Recommended Peer Connections**: Suggested graduates based on shared department and industry focus.
- **Upcoming RSVP Quick Access**: Direct links to registered reunions and seminars.

### 6. 📅 Alumni Events Hub & RSVP System (`/events` & `/events/:id`)
- **Category Filtering**: All, Networking, Career guidance, Workshops, Reunions, Guest lectures, Alumni meetups.
- **Event Detail Breakdown**: Full schedule agenda, keynote speaker bios, venue/virtual stream links.
- **Capacity Tracking**: Live counter showing reserved seats vs total capacity with progress indicator.
- **RSVP Management**: Authenticated users can RSVP or cancel registration; duplicate registrations are prevented on the server.

### 7. 🛡️ Administrator Management Console (`/admin`)
- **Protected Route**: Server-enforced verification (`authorize('admin')`); non-admins receive a 403 Forbidden alert.
- **Metrics Overview**: Real-time totals for directory records, scheduled events, and attendance.
- **Alumni Management CRUD**: Search, create, edit, and delete alumni entries with confirmation dialogs.
- **Verification Toggling**: One-click toggle of verified alumni status.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router DOM v6, Tailwind CSS, Lucide React, Axios, React Hook Form, Recharts, Framer Motion |
| **Backend** | Node.js (v24), Express.js (ES Modules), Mongoose, JSON Web Tokens (JWT), bcryptjs, express-validator, Helmet, CORS, express-rate-limit, cookie-parser |
| **Database** | MongoDB & MongoDB Atlas (with in-memory fallback repository for instant demo mode) |
| **Testing** | Vitest, React Testing Library, @testing-library/jest-dom, jsdom, Supertest |

---

## 📂 Project Directory Structure

```
alumni-network-directory/
├── package.json               # Root monorepo orchestration & scripts
├── .gitignore                 # Excludes node_modules, dist, .env files
├── .env.example               # Root configuration template
├── README.md                  # Comprehensive platform documentation
│
├── client/                    # Vite + React Frontend
│   ├── index.html             # HTML entry with Inter font
│   ├── vite.config.js         # Vite configuration with API proxy and Vitest setup
│   ├── tailwind.config.js     # Design tokens (Navy #142B4A, Blue #356AE6, Neutral #F6F8FC)
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx           # React DOM root with BrowserRouter & Providers
│       ├── App.jsx            # Route hierarchy & protected route wrappers
│       ├── index.css          # Tailwind base, utilities, custom scrollbar
│       ├── components/
│       │   ├── common/        # Button, Input, Select, Card, Badge, Avatar, Modal, Toast, Skeleton, EmptyState, ErrorState
│       │   ├── layout/        # Navbar, Footer, MainLayout, ProtectedRoute
│       │   └── directory/     # AlumniCard, FilterSidebar
│       ├── pages/             # HomePage, DirectoryPage, ProfilePage, EventsPage, EventDetailPage, LoginPage, RegisterPage, ForgotPasswordPage, DashboardPage, AdminPage, NotFoundPage
│       ├── context/           # AuthContext, ToastContext
│       ├── services/          # api.js, alumniService.js, authService.js, eventService.js
│       ├── data/              # mockAlumniData.js (25+ profiles), mockEventsData.js
│       └── tests/             # Vitest & React Testing Library test suites
│
└── server/                    # Node.js + Express REST API Backend
    ├── package.json
    ├── .env                   # Local environment variables
    ├── .env.example           # Environment variables template
    └── src/
        ├── server.js          # HTTP server startup & graceful shutdown
        ├── app.js             # Express application & middleware stack
        ├── config/            # db.js (MongoDB connection & fallback), env.js
        ├── models/            # User.js, AlumniProfile.js, Event.js, EventRegistration.js, Connection.js, Notification.js
        ├── controllers/       # authController.js, alumniController.js, eventController.js, adminController.js
        ├── routes/            # authRoutes.js, alumniRoutes.js, eventRoutes.js, adminRoutes.js, healthRoutes.js
        ├── middleware/        # authMiddleware.js, errorHandler.js, rateLimiter.js, validationMiddleware.js
        ├── services/          # dataRepository.js (Dual-mode: MongoDB or In-Memory store)
        ├── validators/        # authValidator.js
        ├── data/              # seedData.js, seedDatabase.js
        └── tests/             # Supertest API integration tests
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js**: v18.0.0 or later (Tested on Node v24.19.0)
- **npm**: v9.0.0 or later (Tested on npm 11.17.0)

### 1. Install Dependencies
Run from the root directory:
```bash
npm install
```
*(On Windows PowerShell where script execution may be restricted, run `npm.cmd install`)*

---

### 2. Start Development Servers

You can launch both the React client and Express backend concurrently with one command:
```bash
npm run dev
```

Alternatively, run each service in separate terminal windows:
- **Client (Frontend)**:
  ```bash
  npm run dev:client
  ```
  *Accessible at [http://localhost:5173](http://localhost:5173)*

- **Server (Backend API)**:
  ```bash
  npm run dev:server
  ```
  *Accessible at [http://localhost:5000](http://localhost:5000)*

---

## 🔑 Pre-Seeded Demonstration Accounts

For instant evaluation in Demonstration Mode, use the quick-fill buttons on the login screen or enter:

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin@alumniconnect.edu` | `Admin@12345` | Full access to `/admin` and all records |
| **Alumni Member** | `sarah.chen@alumniconnect.edu` | `Alumni@12345` | Profile editing, RSVP, member dashboard |

---

## 🍃 Connecting MongoDB Atlas Later

The backend is built with a **Zero-Configuration Dual-Mode Repository**:
1. When `MONGODB_URI` is blank, the server operates in Demonstration Mode with 25+ realistic records.
2. When you are ready to connect your live MongoDB Atlas cloud database:

### Step 1: Add your Atlas URI to `server/.env`
Open `server/.env` and insert your MongoDB Atlas connection string:
```ini
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/alumniconnect?retryWrites=true&w=majority
```
*(Note: Never commit your `.env` file to Git. `server/.env` is already included in `.gitignore`)*

### Step 2: Seed the Database
Populate your MongoDB Atlas cluster with initial alumni, events, and user collections:
```bash
npm run seed
```

### Step 3: Restart the Backend
```bash
npm run dev:server
```
The console will display:
```
✅ MongoDB Connected successfully to host: cluster0...
```
All searches, registrations, profile edits, and authentication will automatically persist to MongoDB Atlas.

---

## 🧪 Automated Testing

Run the automated test suite across the monorepo:
```bash
npm run test
```

### Test Coverage Summary:
- **Frontend Tests (`npm run test:client`)**:
  - `LandingPage.test.jsx`: Verifies hero branding, CTAs, statistics counter, and spotlight sections.
  - `Directory.test.jsx`: Tests search bar, filter integration, and alumni card rendering.
  - `AuthValidation.test.jsx`: Validates required fields, password length constraints, and demo shortcuts.
- **Backend Tests (`npm run test:server`)**:
  - `api.test.js`: 17 comprehensive Supertest endpoints verifying health checks, user registration, duplicate email rejection, password hashing, login token generation, directory filtering, event RSVPs, duplicate RSVP prevention, and stats aggregation.

---

## 📡 REST API Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Server uptime and database mode |
| `POST` | `/api/auth/register` | Public | Register new alumni member |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `POST` | `/api/auth/logout` | Public | Clear authentication session |
| `GET` | `/api/auth/me` | Protected | Retrieve current authenticated user |
| `GET` | `/api/alumni` | Public | Search, filter, and paginate alumni |
| `GET` | `/api/alumni/:id` | Public | Retrieve single alumni profile |
| `PATCH` | `/api/alumni/:id` | Owner / Admin | Update own alumni profile details |
| `DELETE` | `/api/alumni/:id` | Admin Only | Delete alumni record from directory |
| `GET` | `/api/events` | Public | List upcoming alumni events |
| `GET` | `/api/events/:id` | Public | Retrieve detailed event info |
| `POST` | `/api/events/:id/register` | Protected | RSVP for an upcoming event |
| `DELETE` | `/api/events/:id/register` | Protected | Cancel RSVP for an event |
| `GET` | `/api/admin/stats` | Public / Admin | Aggregate directory & event statistics |

---

## 🏗️ Production Build

To produce optimized production bundles:
```bash
npm run build
```
Output assets will be generated in `client/dist/`.

---

## 🛡️ Security Implementation
- **Data Protection**: Sensitive contact information (phone, personal email) masked by default.
- **Header Hardening**: `helmet` enforces Content-Security-Policy, anti-clickjacking (`X-Frame-Options`), and MIME-type sniffing prevention.
- **CORS Configuration**: Restricts API consumption to the frontend client origin with credentials support.
- **Rate Limiting**: Protects authentication endpoints against brute-force attacks via `express-rate-limit`.
- **Injection Protection**: Parameter sanitization and Mongoose schema typing prevent query injection.
