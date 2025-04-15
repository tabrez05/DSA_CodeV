import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import chalk from 'chalk';

const prisma = new PrismaClient();

interface ProblemData {
  title: string;
  description: string;
  boilerplateCode: string;
  starterCode: string;
  sampleInput: string;
  sampleOutput: string;
  youtubeUrl?: string;
  testCases: any[];
}

interface TopicData {
  name: string;
  description: string;
  difficulty: string;
  coverImage?: string;
  problems: ProblemData[];
}

const topics: TopicData[] = [
  {
    name: 'Recursion',
    description: 'Master the art of recursive thinking and problem-solving. Learn how to break down complex problems into smaller, manageable pieces.',
    coverImage: 'https://example.com/images/recursion.jpg',
    difficulty: 'Medium',
    problems: [
      {
        title: 'Sum of Digits',
        description: 'Write a recursive function to calculate the sum of digits in a given number.',
        boilerplateCode: `int sumDigits(int n) {
    // Base case
    if (n == 0) return 0;
    
    // Recursive case
    return (n % 10) + sumDigits(n / 10);
}`,
        starterCode: `int sumDigits(int n) {
    // Your code here
}`,
        sampleInput: '123',
        sampleOutput: '6',
        youtubeUrl: 'https://youtube.com/embed/recursion-sum-digits',
        testCases: [
          { input: '123', expectedOutput: '6' },
          { input: '456', expectedOutput: '15' }
        ]
      },
      {
        title: 'Factorial',
        description: 'Implement a recursive function to calculate the factorial of a number.',
        boilerplateCode: `int factorial(int n) {
    // Your code here
}`,
        starterCode: `int factorial(int n) {
    // Your code here
}`,
        sampleInput: '5',
        sampleOutput: '120',
        youtubeUrl: 'https://youtube.com/embed/recursion-factorial',
        testCases: [
          { input: '5', expectedOutput: '120' },
          { input: '3', expectedOutput: '6' }
        ]
      }
    ]
  },
  {
    name: 'Arrays',
    description: 'Learn array manipulation and algorithms',
    difficulty: 'Easy',
    coverImage: 'https://example.com/arrays.jpg',
    problems: [
      {
        title: 'Find Maximum',
        description: 'Find the maximum element in an array',
        boilerplateCode: `function findMax(arr) {
  // Your code here
}`,
        starterCode: `function findMax(arr) {
  return Math.max(...arr);
}`,
        sampleInput: '[1, 3, 2, 5, 4]',
        sampleOutput: '5',
        youtubeUrl: 'https://youtube.com/embed/arrays-find-max',
        testCases: [
          { input: [1, 3, 2, 5, 4], expected: 5 },
          { input: [-1, -3, -2, -5, -4], expected: -1 }
        ]
      },
      {
        title: 'Reverse Array',
        description: 'Reverse the elements of an array',
        boilerplateCode: `function reverseArray(arr) {
  // Your code here
}`,
        starterCode: `function reverseArray(arr) {
  return arr.reverse();
}`,
        sampleInput: '[1, 2, 3, 4, 5]',
        sampleOutput: '[5, 4, 3, 2, 1]',
        youtubeUrl: 'https://youtube.com/embed/arrays-reverse',
        testCases: [
          { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
          { input: ['a', 'b', 'c'], expected: ['c', 'b', 'a'] }
        ]
      }
    ]
  },
  {
    name: 'Strings',
    description: 'Master string manipulation techniques',
    difficulty: 'Easy',
    coverImage: 'https://example.com/strings.jpg',
    problems: [
      {
        title: 'Reverse String',
        description: 'Reverse a given string',
        boilerplateCode: `function reverseString(str) {
  // Your code here
}`,
        starterCode: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
        sampleInput: '"hello"',
        sampleOutput: '"olleh"',
        youtubeUrl: 'https://youtube.com/embed/strings-reverse',
        testCases: [
          { input: 'hello', expected: 'olleh' },
          { input: 'world', expected: 'dlrow' }
        ]
      },
      {
        title: 'Check Palindrome',
        description: 'Check if a string is a palindrome',
        boilerplateCode: `function isPalindrome(str) {
  // Your code here
}`,
        starterCode: `function isPalindrome(str) {
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}`,
        sampleInput: '"racecar"',
        sampleOutput: 'true',
        youtubeUrl: 'https://youtube.com/embed/strings-palindrome',
        testCases: [
          { input: 'racecar', expected: true },
          { input: 'hello', expected: false }
        ]
      }
    ]
  }
];

const users = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User'
  },
  {
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User'
  }
];

async function seed() {
  console.log(chalk.blue('🌱 Starting database seeding...'));

  try {
    // Clean up existing data
    console.log(chalk.yellow('Cleaning up existing data...'));
    await prisma.submission.deleteMany();
    await prisma.problem.deleteMany();
    await prisma.topic.deleteMany();
    await prisma.user.deleteMany();
    console.log(chalk.green('✓ Database cleaned'));

    // Insert users
    console.log(chalk.yellow('Creating users...'));
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          name: userData.name
        }
      });
      console.log(chalk.green(`✓ Created user: ${userData.email}`));
    }

    // Insert topics and their problems
    for (const topicData of topics) {
      const { problems, ...topicInfo } = topicData;
      
      console.log(chalk.yellow(`Creating topic: ${topicInfo.name}`));
      const createdTopic = await prisma.topic.create({
        data: {
          name: topicInfo.name,
          description: topicInfo.description,
          difficulty: topicInfo.difficulty,
          coverImage: topicInfo.coverImage,
          problems: {
            create: problems.map(problem => ({
              title: problem.title,
              description: problem.description,
              boilerplateCode: problem.boilerplateCode,
              starterCode: problem.starterCode,
              sampleInput: problem.sampleInput,
              sampleOutput: problem.sampleOutput,
              youtubeUrl: problem.youtubeUrl,
              testCases: problem.testCases
            }))
          }
        },
        include: {
          problems: true
        }
      });

      console.log(chalk.green(`✓ Created topic: ${topicInfo.name}`));
      console.log(chalk.gray(`  └─ Added ${createdTopic.problems.length} problems`));
    }

    const stats = await prisma.$transaction([
      prisma.topic.count(),
      prisma.problem.count(),
      prisma.user.count()
    ]);

    console.log(chalk.blue('\n📊 Seeding Statistics:'));
    console.log(chalk.white(`Topics created: ${stats[0]}`));
    console.log(chalk.white(`Problems created: ${stats[1]}`));
    console.log(chalk.white(`Users created: ${stats[2]}`));
    console.log(chalk.green('\n✨ Database seeding completed successfully!'));

  } catch (error) {
    console.error(chalk.red('\n❌ Seeding failed:'));
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the seed function
seed()
  .catch((error) => {
    console.error(chalk.red('Fatal error:'));
    console.error(error);
    process.exit(1);
  });