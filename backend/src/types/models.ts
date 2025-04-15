export interface Topic {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Problem {
  id: string;
  topicId: string;
  title: string;
  description: string;
  videoUrl?: string;
  boilerplateCode: string;
  inputFormat: string;
  outputFormat: string;
  expectedOutput: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TopicWithProblems extends Topic {
  problems: Problem[];
}

export interface CreateTopicInput {
  name: string;
  description: string;
  coverImage?: string;
}

export interface CreateProblemInput {
  topicId: string;
  title: string;
  description: string;
  videoUrl?: string;
  boilerplateCode: string;
  inputFormat: string;
  outputFormat: string;
  expectedOutput: string;
}

export interface UpdateTopicInput {
  name?: string;
  description?: string;
  coverImage?: string;
}

export interface UpdateProblemInput {
  title?: string;
  description?: string;
  videoUrl?: string;
  boilerplateCode?: string;
  inputFormat?: string;
  outputFormat?: string;
  expectedOutput?: string;
} 