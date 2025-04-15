# CodeWit

A modern coding platform for learning and practicing programming.

## Features

- Interactive coding environment
- Real-time code execution using Judge0 API
- Topic-based learning structure
- User authentication and progress tracking
- Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React + Vite
- TypeScript
- Tailwind CSS
- Axios

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Judge0 API key (from RapidAPI)

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd codewit
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Environment Setup:

Backend (.env):
```
PORT=3001
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/codedsa?schema=public"
JUDGE0_API_KEY=your_judge0_api_key
JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
JWT_SECRET=your_jwt_secret
```

4. Database Setup:
```bash
cd backend
npx prisma generate
npx prisma db push
```

5. Start the application:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## API Documentation

### Topics
- GET /api/topics - Get all topics
- GET /api/topics/:id - Get topic by ID

### Code Execution
- POST /api/compile - Execute code
  - Body: { language_id: number, source_code: string }

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT