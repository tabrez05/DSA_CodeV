import { PrismaClient } from '@prisma/client';
import { config } from '../config';

// Create a new Prisma client for testing
const prisma = new PrismaClient();

// Global setup
beforeAll(async () => {
  // Connect to the test database
  await prisma.$connect();
});

// Global teardown
afterAll(async () => {
  // Disconnect from the test database
  await prisma.$disconnect();
});

// Clean up the database after each test
afterEach(async () => {
  // Add any cleanup logic here
  // For example, you might want to delete test data
});

// Export the Prisma client for use in tests
export { prisma }; 