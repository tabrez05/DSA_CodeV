import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import topicRoutes from './routes/topicRoutes';
import compileRoutes from './routes/compileRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/topics', topicRoutes);
app.use('/api/compile', compileRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = config.server.port || 3001;

app.listen(PORT, () => {
  console.log(`Server is running in ${config.server.nodeEnv} mode on port ${PORT}`);
}); 