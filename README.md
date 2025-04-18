# Todo App - SmolJames

A modern, full-stack Todo application built with Node.js, Express, PostgreSQL, and Prisma ORM. This application provides a complete solution for managing your tasks with authentication and persistence.

## Features

- User Authentication (JWT-based)
- Task Management (Create, Read, Update, Delete)
- Task Completion Tracking
- Dockerized Deployment
- RESTful API Endpoints
- Modern Frontend Interface

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Security**: bcryptjs for password hashing
- **Containerization**: Docker

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Vashu2003/Todo-App-SmolJames-.git
cd chapter_4
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
PORT=8383
DATABASE_URL="postgresql://user:password@localhost:5432/todo_app"
JWT_SECRET=your-secret-key
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Initialize Database
```bash
npx prisma migrate dev
```

### 5. Start the Application
You can run the application in two ways:

#### Using Docker (Recommended)
```bash
docker-compose up
```

#### Directly with Node.js
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Todos
- `GET /todos` - Get all todos (requires authentication)
- `POST /todos` - Create a new todo (requires authentication)
- `PUT /todos/:id` - Update a todo (requires authentication)
- `DELETE /todos/:id` - Delete a todo (requires authentication)

## Project Structure

```
chapter_4/
├── src/
│   ├── routes/        # API routes
│   ├── middleware/    # Authentication middleware
│   └── server.js      # Main application file
├── public/            # Static files and frontend
├── prisma/            # Database schema and migrations
├── .env              # Environment variables
├── package.json      # Project dependencies
└── docker-compose.yaml # Docker configuration
```

## Security Features

- JWT-based authentication
- Password hashing using bcryptjs
- Input validation
- CORS protection
- Rate limiting (coming soon)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

Vashu Singh

## Acknowledgments

- Inspired by @jamezmca's backend course
- Built with modern web technologies and best practices
