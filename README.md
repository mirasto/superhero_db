# Superhero Database

A full-stack web application for managing a superhero database with CRUD operations, image management, and pagination.

![Superhero Database](https://via.placeholder.com/800x400?text=Superhero+Database)

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

- **Node.js** with Express.js
- **Multer** for image uploads
- **In-memory storage** (data resets on server restart)
- **Jest** for testing

### Frontend

- **React 18** with Vite
- **React Router** for navigation
- **React Query** for state management and async operations
- **Vanilla CSS** with custom properties

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)

## Getting Started

### Quick Start (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
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
│   │   │   ├── ConfirmModal/
│   │   │   ├── ImageGallery/
│   │   │   ├── ImageUploader/
│   │   │   ├── Layout/
│   │   │   ├── Pagination/
│   │   │   ├── SuperheroCard/
│   │   │   ├── SuperheroDetails/
│   │   │   ├── SuperheroForm/
│   │   │   └── SuperheroList/
│   │   ├── hooks/         # Custom React hooks
│   │   ├── styles/        # Global CSS
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

### Example Request

```bash
# Get all superheroes (first page)
curl http://localhost:3001/api/superheroes

# Create a new superhero
curl -X POST http://localhost:3001/api/superheroes \
  -F "nickname=Superman" \
  -F "real_name=Clark Kent" \
  -F "origin_description=Born on Krypton..." \
  -F "superpowers=Flight, Super strength, Heat vision" \
  -F "catch_phrase=Up, up and away!" \
  -F "images=@/path/to/image.jpg"
```

## Testing

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

## Data Model

```typescript
interface Superhero {
  id: string;
  nickname: string; // e.g., "Superman"
  real_name: string; // e.g., "Clark Kent"
  origin_description: string;
  superpowers: string[]; // e.g., ["flight", "strength"]
  catch_phrase: string;
  images: Image[];
  createdAt: string;
  updatedAt: string;
}

interface Image {
  id: string;
  filename: string;
  url: string;
}
```

## Assumptions

1. **In-memory storage**: Data is stored in memory and will reset when the server restarts. This was chosen for simplicity; a database like MongoDB or PostgreSQL could be added for persistence.

2. **Local image storage**: Images are stored in the `server/uploads` folder. For production, consider using cloud storage (AWS S3, Cloudinary).

3. **No authentication**: The application does not require user login. All operations are public.

4. **Modern browsers**: The application targets modern browsers and does not support Internet Explorer.

5. **Single user**: Designed for single-user operation; no concurrent editing protection.

6. **Superpowers format**: Superpowers are entered as comma-separated values and stored as an array.

7. **Image formats**: Accepts JPEG, PNG, GIF, and WebP images up to 5MB each.

## Screenshots

### Home Page (List View)

- Displays superheroes in a responsive grid
- Shows thumbnail image and nickname
- Pagination with 5 items per page
- Quick access to edit and delete actions

### Details Page

- Full superhero information
- Image gallery with lightbox
- Superpowers displayed as badges
- Catch phrase in styled blockquote

### Create/Edit Form

- Form validation with error messages
- Drag and drop image upload
- Preview of uploaded images
- Ability to remove existing images (edit mode)

## Configuration

### Backend Port

Change the port in `server/src/index.js`:

```javascript
const PORT = process.env.PORT || 3001;
```

### Frontend API URL

If you change the backend port, update `client/src/api/superheroApi.js`:

```javascript
const API_URL = 'http://localhost:3001/api';
```

## License

MIT License - feel free to use this project for learning or as a starting point for your own projects.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
