#!/usr/bin/env node

// Test script to verify DeepSeek integration
import fetch from 'node-fetch';

const API_KEY = 'B77qfdp27w@'; // Usar a chave do .env.example
const BASE_URL = 'http://localhost:3000';

async function testDeepSeek() {
  console.log('🔮 Testing DeepSeek integration...\n');

  const payload = {
    prompt: 'Explain what is desktop automation in one sentence.',
    model: 'deepseek-chat', // Nome correto do modelo
    temperature: 0.7,
    maxTokens: 100,
  };

  try {
    console.log('📤 Sending request to /api/v1/llm with payload:');
    console.log(JSON.stringify(payload, null, 2));
    console.log();

    const response = await fetch(`${BASE_URL}/api/v1/llm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(payload),
    });

    console.log(`📥 Response status: ${response.status} ${response.statusText}`);

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Success! DeepSeek response:');
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log('❌ Error response:');
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

// Test both models
async function testBothModels() {
  console.log('🧪 Testing both DeepSeek models...\n');

  // Test deepseek-chat
  await testModel('deepseek-chat', 'general conversation and knowledge');

  console.log('\n' + '='.repeat(50) + '\n');

  // Test deepseek-reasoner
  await testModel('deepseek-reasoner', 'complex reasoning tasks');
}

async function testModel(modelName, description) {
  console.log(`🔮 Testing ${modelName} (${description})...\n`);

  const payload = {
    prompt: 'What are the main benefits of using desktop automation?',
    model: modelName,
    temperature: 0.7,
    maxTokens: 150,
  };

  try {
    console.log(`📤 Testing model: ${modelName}`);

    const response = await fetch(`${BASE_URL}/api/v1/llm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(payload),
    });

    console.log(`📥 Response status: ${response.status} ${response.statusText}`);

    const result = await response.json();

    if (response.ok) {
      console.log(`✅ ${modelName} working correctly!`);
      console.log(`📝 Response: ${result.data.content?.substring(0, 100)}...`);
      if (result.metadata) {
        console.log(`📊 Tokens used: ${result.metadata.tokensUsed}`);
      }
    } else {
      console.log(`❌ ${modelName} failed:`);
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error(`❌ ${modelName} test failed:`, error.message);
  }
}

// Run the tests
if (process.argv.includes('--both')) {
  testBothModels();
} else {
  testDeepSeek();
}
