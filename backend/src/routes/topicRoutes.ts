import { Router } from 'express';
import { getAllTopics, getTopicById } from '../controllers/topicController';

const router = Router();

router.get('/', getAllTopics);
router.get('/:id', getTopicById);

export default router; 