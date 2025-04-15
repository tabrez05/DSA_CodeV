import { compileCode } from '../utils/judge0';

async function testJudge0Integration() {
  try {
    // Simple Python code to test
    const sourceCode = `
print("Hello, World!")
    `.trim();

    // Python3 language_id is 71
    const result = await compileCode(71, sourceCode);
    
    console.log('Test Results:');
    console.log('Status:', result.status);
    console.log('Stdout:', result.stdout);
    console.log('Stderr:', result.stderr);
    console.log('Compile Output:', result.compile_output);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testJudge0Integration(); 