# 🛒 Marketplace Platform

A full-stack peer-to-peer marketplace web application where users can create listings, browse products, chat with buyers/sellers, manage orders, and process payments — with a dedicated admin dashboard for platform management.

---

## ✨ Features

### User-Facing
- **Marketplace** — Browse and filter listings with a sidebar filter
- **Listing Details** — View full listing info and place orders
- **My Listings** — Create, edit, and manage your own listings
- **My Orders** — Track orders placed as a buyer
- **Messaging** — Real-time chat between buyers and sellers
- **Plans** — Subscription plans for sellers
- **Credential Submission** — Submit and verify credentials to unlock features

### Admin Dashboard
- **Overview Dashboard** — Platform-wide stats at a glance
- **All Listings** — View, approve, or remove any listing
- **Credential Management** — Review and verify user credential requests
- **Transactions** — Monitor all payment activity
- **Withdrawal Management** — Approve and process seller withdrawal requests

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Global state management (chat, listings) |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [Axios](https://axios-http.com/) | HTTP requests |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) | REST API server |
| [Prisma](https://www.prisma.io/) | ORM & database schema |
| [Stripe](https://stripe.com/) | Payment processing & webhooks |
| [Inngest](https://www.inngest.com/) | Background jobs & event-driven workflows |
| [ImageKit](https://imagekit.io/) | Image upload & optimization |
| [Multer](https://github.com/expressjs/multer) | File upload middleware |
| [Nodemailer](https://nodemailer.com/) | Transactional emails |

### Infrastructure
| Technology | Purpose |
|---|---|
| [Vercel](https://vercel.com/) | Frontend & backend deployment |
| [Prisma Schema](https://www.prisma.io/docs/orm/prisma-schema) | Database modelling |

---

## 📁 Project Structure

```
├── client/                         # React frontend (Vite)
│   └── src/
│       ├── app/
│       │   ├── features/
│       │   │   ├── chatSlice.js    # Redux slice for chat state
│       │   │   └── listingSlice.js # Redux slice for listings state
│       │   └── store.js            # Redux store
│       ├── assets/                 # Static assets (images, SVGs)
│       ├── components/             # Reusable UI components
│       │   └── admin/              # Admin-specific components
│       ├── configs/
│       │   └── axios.js            # Axios base configuration
│       └── pages/                  # Route-level page components
│           └── admin/              # Admin dashboard pages
│
└── server/                         # Node.js + Express backend
    ├── configs/                    # Third-party service configs
    ├── controllers/                # Route handler logic
    ├── inngest/                    # Background job definitions
    ├── middlewares/                # Auth & other middleware
    ├── prisma/
    │   └── schema.prisma           # Database schema
    └── routes/                     # Express route definitions
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A PostgreSQL (or compatible) database
- Accounts for: [Stripe](https://stripe.com/), [ImageKit](https://imagekit.io/), [Inngest](https://www.inngest.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2. Set Up the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/marketplace"

# Auth / JWT
JWT_SECRET="your_jwt_secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# ImageKit
IMAGEKIT_PUBLIC_KEY="your_imagekit_public_key"
IMAGEKIT_PRIVATE_KEY="your_imagekit_private_key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_id"

# Nodemailer
MAIL_HOST="smtp.your-provider.com"
MAIL_PORT=587
MAIL_USER="your@email.com"
MAIL_PASS="your_email_password"

# Inngest
INNGEST_EVENT_KEY="your_inngest_event_key"
INNGEST_SIGNING_KEY="your_inngest_signing_key"

# General
PORT=5000
CLIENT_URL="http://localhost:5173"
```

Run Prisma migrations and generate the client:

```bash
npx prisma migrate dev
npx prisma generate
```

Start the server:

```bash
npm run dev
```

---

### 3. Set Up the Client

```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL="http://localhost:5000"
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

Start the development server:

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 🌐 Deployment

Both the frontend and backend are configured for deployment on **Vercel** via their respective `vercel.json` files.

### Deploy the Frontend

```bash
cd client
vercel --prod
```

### Deploy the Backend

```bash
cd server
vercel --prod
```

> **Note:** Make sure to set all environment variables in your Vercel project settings before deploying. Update `CLIENT_URL` in the server env and `VITE_API_URL` in the client env to point to your production URLs.

---

## 📜 Available Scripts

### Client
| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Server
| Command | Description |
|---|---|
| `npm run dev` | Start server with hot reload |
| `npm start` | Start production server |
| `npx prisma studio` | Open Prisma database GUI |
| `npx prisma migrate dev` | Run database migrations |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
