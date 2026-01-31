require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error('❌ No API key found');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testModels() {
  const modelsToTest = [
    'gemini-3-flash-preview',
    'gemini-2.0-flash-exp',
    'gemini-1.5-flash',
    'models/gemini-3-flash-preview',
    'models/gemini-2.0-flash-exp',
  ];

  for (const modelName of modelsToTest) {
    try {
      console.log(`\n🧪 Testing: ${modelName}`);
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 100,
        }
      });
      
      const result = await model.generateContent('Say "OK" if you work');
      const text = result.response.text();
      console.log(`✅ ${modelName} works! Response: ${text.substring(0, 50)}`);
      break; // Stop at first working model
    } catch (error) {
      console.log(`❌ ${modelName} failed: ${error.message.substring(0, 100)}`);
    }
  }
}

testModels().catch(console.error);
