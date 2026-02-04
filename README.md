# Superhero Database

A full-stack web application for managing a superhero database with CRUD operations, image management, and pagination.

## Features

- **Create** superheroes with detailed information and multiple images
- **Read** superhero list with pagination (5 per page) and detailed view
- **Update** superhero information and manage images
- **Delete** superheroes with confirmation
- **Image Gallery** with lightbox functionality
- **Responsive Design** - works on desktop and mobile
- **Modern UI** - dark theme with glassmorphism effects

## Tech Stack

### Backend

- **Node.js** with **Express.js**
- **Multer** for image uploads
- **UUID** for unique identifiers
- **In-memory storage** (data resets on server restart)
- **Jest** & **Supertest** for testing

### Frontend

- **React 19** with **Vite**
- **React Router v7** for navigation
- **TanStack Query (React Query) v5** for state management and async operations
- **Axios** for API requests
- **Vanilla CSS** with CSS Modules and custom variables

## Prerequisites

- Node.js (v20 or higher recommended)
- npm (v9 or higher)

## Getting Started

### Quick Start (Recommended)

1. **Clone the repository**

   ```bash
   cd superhero
   ```

2. **Install all dependencies**

   ```bash
   npm run install:all
   ```

3. **Start development servers**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

### Manual Setup

If you prefer to set up each part manually:

1. **Install root dependencies**

   ```bash
   npm install
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Project Structure

```
superhero/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API client functions
│   │   ├── components/    # React components
│   │   │   ├── image/     # Image related components
│   │   │   ├── layout/    # Layout components
│   │   │   ├── superhero/ # Superhero domain components
│   │   │   └── ui/        # Shared UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── styles/        # Global CSS
│   │   ├── utils/         # Helper functions
│   │   └── tests/         # Frontend tests
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Data models
│   │   ├── routes/        # API routes
│   │   ├── store/         # In-memory data store
│   │   └── index.js       # Server entry point
│   ├── tests/             # Backend tests
│   ├── uploads/           # Image storage
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## API Endpoints

| Method   | Endpoint                               | Description                  |
| -------- | -------------------------------------- | ---------------------------- |
| `GET`    | `/api/superheroes`                     | List superheroes (paginated) |
| `GET`    | `/api/superheroes/:id`                 | Get superhero details        |
| `POST`   | `/api/superheroes`                     | Create a new superhero       |
| `PUT`    | `/api/superheroes/:id`                 | Update a superhero           |
| `DELETE` | `/api/superheroes/:id`                 | Delete a superhero           |
| `POST`   | `/api/superheroes/:id/images`          | Add images to superhero      |
| `DELETE` | `/api/superheroes/:id/images/:imageId` | Remove image                 |

### Query Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 5)

### Run All Tests

```bash
npm test
```

### Run Backend Tests Only

```bash
npm run test:server
# or
cd server && npm test
```

### Run Frontend Tests Only

```bash
npm run test:client
# or
cd client && npm run test:run
```

### Watch Mode (Frontend)

```bash
cd client && npm test
```

## Assumptions

1. **In-memory storage**: Data is stored in memory and will reset when the server restarts.
2. **Local image storage**: Images are stored in the `server/uploads` folder.
3. **No authentication**: The application does not require user login.
4. **Modern browsers**: The application targets modern browsers.
5. **Image formats**: Accepts common image formats up to 5MB.

## Configuration

### Backend Port

Change the port in `server/src/index.js`:

```javascript
const PORT = process.env.PORT || 3001;
```

### Frontend API URL

If you change the backend port, update `client/src/config.js`:

```javascript
export const BASE_URL = 'http://localhost:3001';
```
