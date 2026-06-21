# 🛡️ Uptime Sentinel - Availability monitoring system

**Uptime Sentinel** (SENTINEL) - It is a fully-featured system for monitoring the availability of web resources in real time, featuring a modern web interface, Telegram notifications and detailed analytics.

---

## 📋 Contents

---

- [Project description](#-project-description)
- [Key features](#-key-features)
- [Architecture](#architecture)
- [Technology stack](#-technology-stack)
- [Project structure](#-project-structure)
- [Backend](#-backend)
- [Frontend](#-frontend)
- [DevOps & Infrastructure](#-devops--infrastructure)
- [Database](#-Database)
- [Installation and setup](#-installation-and-setup)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)

---

## 🎯 Project description

Uptime Sentinel is a state-of-the-art platform for monitoring the availability of websites, APIs and services. The system enables you to track the status of resources, measure response times, receive notifications of issues and analyse the performance history of services.

### Key benefits:

⚡ **Real-time monitoring** via WebSocket connections

- 📊 **Detailed analytics** with charts and statistics
- 📱 **Telegram notifications** for outages and recoveries
- 🔐 **Secure authentication** with JWT tokens and refresh tokens
- 🎨 **Modern UI** with dark theme support
- 📦 **Data export** to CSV and PDF formats
- 🚀 **Scalable architecture** based on BullMQ and Redis

---

## ✨ Key features

### For users:

1. **Monitor Management**

- Creating, viewing and deleting monitors
- Customisable check interval (default 60 seconds)
- Grouping monitors by status

2. **Real-time monitoring**

- Status updates without reloading the page (WebSocket)
- Visual status indicators (UP/DOWN/PENDING)
- Response time displayed in milliseconds

3. **Detailed analytics**

- Response time charts for 24 hours, 7 days or 30 days
- Uptime percentage calculation
- Average response delay
- Incident log (outage history)

4. **Data export**

- Export check logs to CSV
- Generate reports in PDF

5. **Notifications**

- Automatic notifications via Telegram in the event of outages
- Service restoration notifications

6. **Search and filtering**

- Search for monitors by name or URL
- Filter by status (All/Online/Offline)

7. **User interface**

- Responsive design for all devices
- Dark and light themes
- Smooth animations and transitions
- Intuitive navigation

---

## Architecture

The project is built using a **microservices architecture**, with a distinction between front-end and back-end applications.

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                    (Next.js 16 + React 19)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Dashboard  │  │   Monitor    │  │    Auth      │      │
│  │    Page      │  │   Details    │  │   Pages      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  WebSocket Client ←──────────────────→  WebSocket Gateway   │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/WebSocket
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                         Backend                              │
│                     (NestJS 11 + TypeScript)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Monitor    │  │     Auth     │  │    Events    │      │
│  │   Service    │  │   Service    │  │   Gateway    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌───────────────────────────────────────────────────┐      │
│  │          Uptime Processor (BullMQ Worker)         │      │
│  │  ┌─────────────────────────────────────────────┐  │      │
│  │  │  • HTTP Health Checks                       │  │      │
│  │  │  • Status Updates                           │  │      │
│  │  │  • Log Creation                             │  │      │
│  │  │  • Notification Triggering                  │  │      │
│  │  └─────────────────────────────────────────────┘  │      │
│  └───────────────────────────────────────────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Prisma     │  │    Redis     │  │  Telegram    │      │
│  │   Service    │  │    (BullMQ)  │  │   Bot API    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────┬───────────────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
    ┌─────▼─────┐          ┌─────▼─────┐
    │ PostgreSQL│          │   Redis   │
    │  Database │          │   Cache   │
    └───────────┘          └───────────┘
```

### Architectural components:

1. **Frontend (Next.js 16)**

- Client-side application with server-side rendering
- WebSocket client for real-time communication
- State management via React hooks
- API client with automatic token refresh

2. **Backend (NestJS 11)**

- RESTful API
- WebSocket gateway for real-time updates
- JWT authentication with refresh tokens
- Task queue on BullMQ for periodic checks

3. **Queue System (BullMQ + Redis)**

- Recurring tasks for monitoring checks
- Asynchronous task processing in background workers
- Execution status tracking

4. **Database (PostgreSQL + Prisma)**

- Relational database for data storage
- Prisma ORM for type-safe queries
- Schema migrations

---

## 🛠️ Technology stack

### Frontend

| Technology           | Version  | Purpose                  |
| -------------------- | -------- | ------------------------ |
| **Next.js**          | 16.1.1   | React framework with SSR |
| **React**            | 19.2.3   | UI library               |
| **TypeScript**       | ^5       | Typing                   |
| **Tailwind CSS**     | ^4       | CSS framework            |
| **Framer Motion**    | ^12.26.1 | Animation                |
| **Recharts**         | ^3.6.0   | Graphs and charts        |
| **React Hook Form**  | ^7.71.0  | Form Management          |
| **Zod**              | ^4.3.5   | Schema Validation        |
| **Socket.io-client** | ^4.8.3   | WebSocket client         |
| **Axios**            | ^1.13.2  | HTTP client              |
| **jsPDF**            | ^4.0.0   | Generate PDF             |
| **Radix UI**         | ^1.x     | UI components            |
| **Lucide React**     | ^0.562.0 | Icons                    |
| **Vitest**           | ^4.0.17  | Unit testing             |
| **Cypress**          | ^15.8.2  | E2E testing              |

### Backend

| Technology       | Version   | Purpose              |
| ---------------- | --------- | -------------------- |
| **NestJS**       | ^11.1.0   | Node.js framework    |
| **TypeScript**   | ^5.7.3    | Typing               |
| **Prisma**       | ^7.2.0    | ORM for PostgreSQL   |
| **PostgreSQL**   | 15-alpine | Relational database  |
| **Redis**        | alpine    | Cache and task queue |
| **BullMQ**       | ^5.66.4   | Sequence of tasks    |
| **Socket.io**    | ^4.8.3    | WebSocket server     |
| **Passport JWT** | ^4.0.1    | JWT auntification    |
| **bcrypt**       | ^6.0.0    | Password hashing     |
| **Telegraf**     | ^4.16.3   | Telegram Bot API     |
| **Swagger**      | ^11.2.4   | API docs             |
| **Jest**         | ^30.0.0   | Testing              |
| **Axios**        | ^1.13.2   | HTTP audit client    |

### DevOps

| Technology         | Purpose                      |
| ------------------ | ---------------------------- |
| **Docker**         | Application containerisation |
| **Docker Compose** | Service orchestration        |
| **GitHub Actions** | CI/CD pipeline               |
| **pnpm**           | Package Manager              |

---

## 📁 Project structure

```
uptime-sentinel/
├── apps/
│   ├── backend/                 # NestJS application
│   │   ├── prisma/              # Prisma schema and migrations
│   │   │   ├── schema.prisma    # Data models
│   │   │   ├── migrations/      # The History of Migration
│   │   │   └── generated/       # Generated Prisma Client
│   │   ├── src/
│   │   │   ├── auth/            # Auntification module
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── guards/      # JWT guards
│   │   │   │   └── dto/         # Data Transfer Objects
│   │   │   ├── monitor/         # Monitoring module
│   │   │   │   ├── monitor.controller.ts
│   │   │   │   ├── monitor.service.ts
│   │   │   │   ├── uptime.processor.ts  # BullMQ worker
│   │   │   │   └── dto/
│   │   │   ├── events/          # WebSocket Gateway
│   │   │   │   └── events.gateway.ts
│   │   │   ├── notify/          # Telegram notification
│   │   │   │   └── notify.service.ts
│   │   │   ├── health/          # Health checks
│   │   │   ├── common/          # General filters and utilities
│   │   │   ├── app.module.ts    # Root module
│   │   │   └── main.ts          # Entry point
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── frontend/                # Next.js application
│       ├── app/                 # App Router (Next.js 13+)
│       │   ├── page.tsx         # Home page (Dashboard)
│       │   ├── login/           # Login page
│       │   ├── register/        # Register page
│       │   ├── add/             # Creating a monitor
│       │   ├── monitor/[id]/    # Monitor specifications
│       │   └── providers/       # React Context providers
│       ├── src/
│       │   ├── entities/        # Business entities (FSD)
│       │   │   └── monitor/
│       │   ├── features/        # Functional features (FSD)
│       │   │   ├── auth-by-email/
│       │   │   └── monitor/
│       │   ├── widgets/         # Composite widgets (FSD)
│       │   │   ├── monitor-list/
│       │   │   └── stats-overview/
│       │   └── shared/          # Reusable components
│       │       ├── api/         # API clients
│       │       ├── ui/          # UI components
│       │       └── lib/         # Utility
│       ├── cypress/             # E2E tests
│       ├── Dockerfile
│       └── package.json
│
├── .github/
│   └── workflows/
│       └── main.yml             # CI/CD pipeline
│
├── docker-compose.yml           # Orchestration of all services
```

> **Note**: The frontend uses the **Feature-Sliced Design (FSD)** architecture to organise its code.

---

## 🎨 Backend

### NestJS modules

#### 1. **Auth Module** (`src/auth/`)

User authentication and authorisation module.

**Features:**

- New user registration
- Logging in (email + password)
- JWT tokens (access + refresh)
- Automatic token renewal
- Protecting routes using Guards
- **Components:**

- `auth.controller.ts` - REST endpoints (`/auth/register`, `/auth/login`, `/auth/refresh`)
- `auth.service.ts` - Business logic of authentication
- `jwt.strategy.ts` - Passport JWT strategy
- `jwt-auth.guard.ts` - Guard for route protection
- `dto/auth.dto.ts` - DTO for validating input data

**Features:**

- Password hashing using bcrypt (10 rounds)
- Access token: 15 minutes
- Refresh token: 7 days
- Storing the hashed refresh token in the database

#### 2. **Monitor Module** (`src/monitor/`)

The main module for controlling monitors.

**Functionality:**

- CRUD operations on monitors
- Retrieving a list of a user’s monitors
- Detailed monitor information, including history
- Exporting data to CSV
- Filtering by time period (24h/7d/30d)

**Endpoints:**

- `POST /monitors` – Create a monitor
- `GET /monitors` – List all of the user’s monitors
- `GET /monitors/:id` – Monitor details
- `GET /monitors/:id/export-csv` – Export to CSV
- `DELETE /monitors/:id` – Delete a monitor

**Features:**

- Automatic creation of a task in BullMQ when a monitor is created
- Deletion of a recurring task when a monitor is deleted
- Data isolation by user (userId)

#### 3. **Uptime Processor** (`src/monitor/uptime.processor.ts`)

BullMQ Worker for performing availability checks.

**How it works:**

1. Retrieve a task from the `uptime-checks` queue
2. Send an HTTP request to the monitored URL (timeout: 1 sec)
3. Log the result in `CheckLog`
4. Update the monitor’s status (UP/DOWN)
5. Send the update via WebSocket
6. Trigger notifications (if the status has changed)

**Error handling:**

- Request timeout
- HTTP errors (4xx, 5xx)
- Network errors
- DNS errors

**Notifications:**

- When status changes from UP/PENDING to DOWN → Telegram alert
- When status changes from DOWN to UP → Telegram recovery notification.

#### 4. **Events Gateway** (`src/events/events.gateway.ts`)

A WebSocket server for real-time updates.

**Features:**

- Connecting/disconnecting clients
- Broadcasting monitor status updates
- Events: `status_updated:{monitorId}`

**Usage:**
When Uptime Processor updates a status, it triggers:

```typescript
eventsGateway.sendMonitorUpdate(monitorId, { status, latency })
```

#### 5. **Notify Service** (`src/notify/notify.service.ts`)

Integration with the Telegram Bot API.

**Features:**

- Sending outage notifications
- Sending recovery notifications
- HTML formatting of messages

**Requirements:**

- `TELEGRAM_BOT_TOKEN` – bot token
- `TELEGRAM_CHAT_ID` – chat ID for notifications

#### 6. **Health Module** (`src/health/`)

Module for health checks (NestJS Terminus).

**Endpoints:**

- `GET /health` - Checking the application’s health

### Middleware and Guards

- **ThrottlerGuard** - DDoS protection (20 requests per minute)
- **JwtAuthGuard** – Protection for routes requiring authentication
- **ValidationPipe** – Validation of incoming data (DTO)
- **AllExceptionsFilter** – Global error handling

### API Documentation

Swagger UI is available at: `http://localhost:5000/api/docs`

- Automatic documentation generation from decorators
- Interactive API testing
- Authorisation via Bearer tokens

---

## 💻 Frontend

### Frontend Architecture (Feature-Sliced Design)

The project uses the **FSD** methodology to organise the code:

```
src/
├── entities/ # Business entities (Monitor, User)
├── features/ # Application features (auth, create-monitor)
├── widgets/ # Composite UI blocks
└── shared/ # Reusable code
```

### Main Pages

#### 1. **Dashboard** (`app/page.tsx`)

The home page providing an overview of all monitors.

**Components:**

- `StatsOverview` – Statistics (total/online/offline)
- `MonitorList` – List of monitor cards
- Search and filters
- Button to create a new monitor

**Functionality:**

- Monitors load automatically on login
- Search by name/URL
- Filter by status
- Real-time updates via WebSocket

#### 2. **Monitor Details** (`app/monitor/[id]/page.tsx`)

Detailed monitor page with analytics.

**Sections:**

- Header with name and URL
- Statistics: Availability, Average Response Time, Incidents
- Response time chart (Recharts)
- Period selection (24h/7d/30d)
- Incident table (DOWN events only)
- Export buttons (CSV, PDF)

**Visualisation:**

- Area chart for latency history
- Colour-coded status indicators
- Animations whilst data is loading

#### 3. **Create Monitor** (`app/add/page.tsx`)

Form for creating a new monitor.

**Fields:**

- Monitor name
- URL to check
- Check interval (in seconds)

**Validation:**

- Zod schema for validation
- React Hook Form for form management

#### 4. **Auth Pages** (`app/login/`, `app/register/`)

Authentication pages.

**Components:**

- `LoginForm` – Login form
- `RegisterForm` – Registration form

### UI Components (Radix UI + Tailwind)

**Components from `shared/ui/`:**

- `Button` – Various button styles
- `Card` – Content cards
- `Input` – Input fields
- `Dialog` – Modal windows
- `AlertDialog` – Confirmation dialogues
- `ThemeToggle` – Theme toggle

**UI Features:**

- Full dark theme support
- Smooth animations (Framer Motion)
- Responsive design (mobile-first)
- Accessibility (ARIA attributes via Radix UI)

### API Integration

#### API Client (`src/shared/api/base.ts`)

A basic axios client with:

- Base URL from `NEXT_PUBLIC_API_URL`
- Automatic addition of tokens to headers
- Error handling

#### Refresh Token Handler (`src/shared/api/fetch-with-refresh.ts`)

Automatic token refresh:

- Interception of 401 errors
- Calling `/auth/refresh` with the refresh token
- Retrying the request with the new token
- Storing tokens in cookies

### State Management

- **React Context** for global state (`AuthProvider`)
- **Local State** via `useState` for component state
- **React Query** (not currently in use, but may be added)

### WebSocket Integration

Connecting to a WebSocket server via `socket.io-client`:

- Subscribing to `status_updated:{monitorId}` events
- Updating the UI without reloading the page

---

## 🚀 DevOps & Infrastructure

### Docker Compose

All services are orchestrated via `docker-compose.yml`:

```yaml
services:
backend: # NestJS API (port 5000)
frontend: # Next.js UI (port 3000)
db: # PostgreSQL (port 5432)
redis: # Redis (port 6379)
```

**Features:**

- Isolated `monitor-network`
- Volume for database data persistence
- Health checks for the frontend
- Hot reload in development mode

### Dockerfiles

#### Backend Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

#### Frontend Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

### Environment variables

#### Backend (.env)

```env
DATABASE_URL=postgresql://user:password@db:5432/uptime_db
REDIS_HOST=redis
REDIS_PORT=6379
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
PORT=5000
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
API_URL=http://backend:5000
```

### CI/CD Pipeline (GitHub Actions)

Pipeline is configured in `.github/workflows/main.yml`:

**Triggers:**

- Pushes to the `main` and `dev` branches
- Pull requests to `main`

**Stages:**

1. **Checkout code** – Retrieving the code
2. **Setup pnpm** – Installing the package manager
3. **Install dependencies** – Installing dependencies (frontend + backend)
4. **Run tests** – Running unit tests (Vitest)
5. **Build and E2E tests** – Building Docker images and running Cypress tests

**Features:**

- Parallel execution where possible
- Caching of dependencies
- Automatic execution on every PR

---

## 🗄️ Database

### Data schema (Prisma)

#### `User` model

```prisma
model User {
  id                        String    @id @default(uuid())
  email                     String    @unique
  password                  String?   // null for OAuth users
  name                      String?
  image                     String?
  provider                  String    @default("credentials")
  externalId                String?
  currentHashedRefreshToken String?   // for refresh tokens
  createdAt                 DateTime? @default(now())
  updatedAt                 DateTime? @default(now())
  Monitor                   Monitor[] // one-to-many relationship
}
```

#### `Monitor` model

```prisma
model Monitor {
  id        String     @id @default(uuid())
  name      String
  url       String
  interval  Int        @default(60)  // sec
  status    Status     @default(PENDING)
  userId    String     // Foreign Key
  createdAt DateTime?  @default(now())
  updatedat DateTime?  @default(now())
  user      User       @relation(...)
  checks    CheckLog[] @relation("MonitorChecks")
}
```

#### `CheckLog` model

```prisma
model CheckLog {
  id           String    @id @default(uuid())
  monitorId    String
  statusCode   Int?      // HTTP response code
  responseTime Int       // milliseconds
  status       Status    @default(PENDING)
  createdAt    DateTime? @default(now())
  monitor      Monitor   @relation(...)
}
```

#### `Incident` model

```prisma
model Incident {
  id         String    @id @default(uuid())
  monitorid  String
  reason     String?
  startedat  DateTime? @default(now())
  resolvedat DateTime?
}
```

#### Enum `Status`

```prisma
enum Status {
  UP       // The service is available
  DOWN     // The service is unavailable
  PENDING  // Waiting for the first inspection
}
```

### Migrations

Prisma automatically generates migrations from `schema.prisma`:

```bash
npx prisma migrate dev --name migration_name
```

Migrations are stored in `apps/backend/prisma/migrations/`.

### Indexes

- `User.email` – unique index
- `Monitor.userId` – foreign key with index
- `CheckLog.monitorId` – foreign key with index
- `CheckLog.createdAt` – for fast queries by time

---

## 📦 Installation and setup

### Prerequisites

- **Node.js** 20+
- **pnpm** (or npm/yarn)
- **Docker** и **Docker Compose**
- **PostgreSQL** 15+ (if you’re running it locally)
- **Redis** (if you’re running it locally)

### Getting started quickly with Docker Compose

1. **Clone the repository:**

```bash
git clone <repository-url>
cd uptime-sentinel
```

2. **Set the environment variables:**

Create the `.env` files:

- `apps/backend/.env`
- `apps/frontend/.env.local`

3. **Start all services:**

```bash
docker-compose up --build
```

4. **Open in your browser:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api/docs

### Local development (without Docker)

#### Backend

```bash
cd apps/backend

# Installing dependencies
pnpm install

# Database configuration
cp .env.example .env  # Fill in the variables
npx prisma generate
npx prisma migrate dev

# Launch
pnpm run start:dev
```

#### Frontend

```bash
cd apps/frontend

# Installing dependencies
pnpm install

# Configuration
cp .env.example .env.local  # NEXT_PUBLIC_API_URL=http://localhost:5000

# Launch
pnpm run dev
```

### Initialising the database

```bash
cd apps/backend


# Creating migrations
npx prisma migrate dev


# Seeding the database with test data (optional)
npx prisma db seed
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000
```

### Authentication

Most endpoints require a JWT token in the header:

```
Authorization: Bearer <access_token>
```

### Endpoints

#### Auth

**POST `/auth/register`**

```json
{
	"email": "user@example.com",
	"password": "password123",
	"name": "John Doe"
}
```

**Response:**

```json
{
	"accessToken": "eyJ...",
	"refreshToken": "eyJ...",
	"user": {
		"id": "uuid",
		"email": "user@example.com",
		"name": "John Doe"
	}
}
```

**POST `/auth/login`**

```json
{
	"email": "user@example.com",
	"password": "password123"
}
```

**POST `/auth/refresh`**

```json
{
	"refreshToken": "eyJ..."
}
```

#### Monitors

**GET `/monitors`** - List of monitors for the current user

**Response:**

```json
[
  {
    "id": "uuid",
    "name": "My Website",
    "url": "https://example.com",
    "status": "UP",
    "interval": 60,
    "checks": [...]
  }
]
```

**POST `/monitors`** - Creating a monitor

```json
{
	"name": "My Website",
	"url": "https://example.com",
	"interval": 60
}
```

**GET `/monitors/:id?period=24h`** - Monitor specifications

- Query params: `period` (24h | 7d | 30d)

**DELETE `/monitors/:id`** - Removing the monitor

**GET `/monitors/:id/export-csv`** - Export in CSV

#### Health

**GET `/health`** - Service health check

### WebSocket Events

**Connection**

```javascript
import io from 'socket.io-client'
const socket = io('http://localhost:5000')
```

**События:**

- `status_updated:{monitorId}` - Updating the monitor status
  ```json
  {
    "status": "UP" | "DOWN",
    "latency": 123
  }
  ```

---

## 🧪 Testing

### Backend (Jest)

```bash
cd apps/backend


# Unit tests
pnpm run test


# Coverage tests
pnpm run test:cov


# E2E tests
pnpm run test:e2e


# Watch mode
pnpm run test:watch
```

### Frontend (Vitest + Cypress)

```bash
cd apps/frontend


# Unit tests
pnpm run test


# UI for tests
pnpm run test:ui


# E2E tests (Cypress)
pnpm run cy:open # Interactive mode
pnpm run cy:run # Headless mode
```

### Code coverage

Backend:

```bash
pnpm run test:cov
```

Frontend:

```bash
pnpm run test -- --coverage
```

---

## 🔧 Further information

### Performance

- **BullMQ** ensures efficient queue processing
- **Redis** caching for fast access
- **Database indexes** to optimise queries
- **WebSocket** for minimal update latency

### Security

- **JWT tokens** with a short lifespan
- **Refresh tokens** for secure updates
- **bcrypt** for password hashing
- **Throttler** for DDoS protection
- **CORS** settings to restrict sources
- **Input data validation** via DTO

### Scalability

- Horizontal scaling of BullMQ workers
- Performance statistics via queue monitoring
- Ability to add database replicas
- Load balancing for the frontend

### Monitoring and logging

- Console logs (Winston/Pino can be configured)
- Health checks via the `/health` endpoint
- BullMQ metrics via Redis
- Errors are handled by a global filter

---

## 🤝 Contributing to the project

The project is currently under active development. Suggestions and pull requests are welcome!

---

## 📞 Contact

Please create Issues in the repository for any questions or suggestions.

---

**Uptime Sentinel** – Reliable monitoring of your services 🛡️
