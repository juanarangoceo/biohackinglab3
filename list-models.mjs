import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error('❌ GOOGLE_API_KEY not found');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    console.log('📋 Fetching available models...\n');
    
    // Try to list models using the REST API directly
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ API Error:', response.status, error);
      return;
    }
    
    const data = await response.json();
    
    if (data.models && data.models.length > 0) {
      console.log(`✅ Found ${data.models.length} available models:\n`);
      data.models.forEach(model => {
        console.log(`  - ${model.name}`);
        if (model.supportedGenerationMethods) {
          console.log(`    Methods: ${model.supportedGenerationMethods.join(', ')}`);
        }
      });
    } else {
      console.log('⚠️  No models found');
    }
  } catch (error) {
    console.error('❌ Error listing models:', error.message);
  }
}

listModels();
