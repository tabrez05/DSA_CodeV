import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db/client';
import { AppError } from '../middleware/errorHandler';

export async function getAllTopics(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const topics = await prisma.topic.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        coverImage: true,
      },
    });

    res.json({
      status: 'success',
      data: topics,
    });
  } catch (error) {
    next(new AppError(500, 'Failed to fetch topics'));
  }
}

export async function getTopicById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const topic = await prisma.topic.findUnique({
      where: { id },
      include: {
        problems: {
          select: {
            id: true,
            title: true,
            description: true,
            videoUrl: true,
            boilerplateCode: true,
          },
        },
      },
    });

    if (!topic) {
      return next(new AppError(404, 'Topic not found'));
    }

    res.json({
      status: 'success',
      data: topic,
    });
  } catch (error) {
    next(new AppError(500, 'Failed to fetch topic'));
  }
} 