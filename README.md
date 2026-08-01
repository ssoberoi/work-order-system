# Work Order Management System

A full-stack Work Order Management System built as part of a technical assessment. The application helps manage machines, engineers, and work orders through a clean dashboard and CRUD operations.

## Features

- Dashboard with summary statistics
- Machine Management
  - Create Machine
  - View Machines
  - Update Machine
  - Delete Machine
- Engineer Management
  - Create Engineer
  - View Engineers
  - Update Engineer
  - Delete Engineer
- Work Order Management
  - Create Work Order
  - View Work Orders
  - Update Work Order
  - Delete Work Order
  - Filter by Status
  - Filter by Priority
  - Search by Work Order Number
  - Filter by Scheduled Date Range
- Form validation on both frontend and backend
- Centralized error handling
- Responsive UI

---

# Tech Stack

## Frontend

- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- React Hook Form
- React Hot Toast

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

---

# Project Structure

```
work-order-system
│
├── backend
│   ├── prisma
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── frontend
    ├── src
    │   ├── api
    │   ├── components
    │   ├── layouts
    │   ├── pages
    │   ├── routes
    │   └── App.jsx
    └── package.json
```

---

# Backend Setup

### 1. Clone Repository

```bash
git clone <repository-url>
```

### 2. Go to Backend

```bash
cd backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create .env

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

DATABASE_URL="postgresql://username:password@localhost:5432/work_order_db?schema=public"
```

---

### 5. Run Prisma Migration

```bash
npx prisma migrate dev
```

---

### 6. Start Backend

```bash
npm run dev
```

Backend will run on

```
http://localhost:5000
```

Health Check

```
GET /health
```

---

# Frontend Setup

Go to frontend folder

```bash
cd frontend
```

Install packages

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend

```bash
npm run dev
```

Frontend will run on

```
http://localhost:5173
```

---

# Database

Database used:

- PostgreSQL

ORM:

- Prisma

To generate Prisma Client

```bash
npx prisma generate
```

To create migration

```bash
npx prisma migrate dev --name migration_name
```

---

# API Endpoints

## Dashboard

| Method | Endpoint |
|----------|-------------------------|
| GET | /api/dashboard/summary |

---

## Machines

| Method | Endpoint |
|----------|-------------------------|
| POST | /api/machines |
| GET | /api/machines |
| GET | /api/machines/:id |
| PUT | /api/machines/:id |
| DELETE | /api/machines/:id |

---

## Engineers

| Method | Endpoint |
|----------|-------------------------|
| POST | /api/engineers |
| GET | /api/engineers |
| GET | /api/engineers/:id |
| PUT | /api/engineers/:id |
| DELETE | /api/engineers/:id |

---

## Work Orders

| Method | Endpoint |
|----------|-------------------------|
| POST | /api/work-orders |
| GET | /api/work-orders |
| GET | /api/work-orders/:id |
| PUT | /api/work-orders/:id |
| DELETE | /api/work-orders/:id |

### Query Parameters

```
status

priority

machineId

engineerId

workOrderNumber

fromDate

toDate
```

Example

```
GET /api/workorders?status=OPEN

GET /api/workorders?priority=HIGH

GET /api/workorders?workOrderNumber=WO001

GET /api/workorders?fromDate=2026-08-01&toDate=2026-08-10
```

---

# Validation

### Machine

- All fields are required
- Machine Code must be unique

### Engineer

- All fields are required
- Email must be unique

### Work Order

- All fields are required
- Estimated Hours must be greater than 0
- Scheduled Date cannot be in the past
- Machine and Engineer must exist before creating a Work Order
- Work Order Number must be unique

---

# Error Handling

The backend uses:

- Global Error Middleware
- Custom ApiError class
- Custom ApiResponse class
- Async Handler for controller methods

---

# Future Improvements

If more time were available, the following features could be added:

- Authentication & Authorization
- Pagination
- Sorting
- Dashboard Charts
- Search across all modules
- Unit Testing
- Docker Support

---

# Author

Shivam Singh

Full Stack Developer

```