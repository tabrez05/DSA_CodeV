export interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  videoUrl: string;
  maxScore: number;
  successRate: number;
  category: string;
}

export interface TopicCategory {
  name: string;
  topics: Topic[];
}

export const TOPIC_CATEGORIES = [
  'Arrays & Strings',
  'Linked Lists',
  'Stacks & Queues',
  'Hashing',
  'Trees',
  'Graphs',
  'Sorting & Searching'
] as const; 