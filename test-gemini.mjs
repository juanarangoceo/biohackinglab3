import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;
console.log('API Key (masked):', apiKey ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 5)}` : 'NOT FOUND');

if (!apiKey) {
  console.error('❌ GOOGLE_API_KEY not found in .env');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testModels() {
  const modelsToTest = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-2.0-flash-exp',
  ];

  for (const modelName of modelsToTest) {
    try {
      console.log(`\n🧪 Testing model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say hello in one word');
      const response = result.response;
      const text = response.text();
      console.log(`✅ ${modelName} works! Response: ${text}`);
      break; // If one works, we're good
    } catch (error) {
      console.error(`❌ ${modelName} failed:`, error.message);
    }
  }
}

testModels();
