import { Router } from 'express';
import { compile } from '../controllers/compileController';

const router = Router();

// Test endpoint for simple code compilation
router.post('/test', compile);

// Main compilation endpoint
router.post('/', compile);

export default router; 