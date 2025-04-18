import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from './routes/auth.routes.js';
import todoRouter from './routes/todo.routes.js';
import authMiddleware from './middleware/auth.middleware.js';

const app = express();
const PORT = process.env.PORT || 8383;

// Get the file name from the URL of the current module
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = dirname(__filename);

// Middleware
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Get the HTML file from the public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html')); // Corrected path
});

// Routes
app.use('/auth', router);
app.use('/todos',authMiddleware, todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});