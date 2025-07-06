#!/usr/bin/env node

// Test script to verify DeepSeek Coder integration
import fetch from 'node-fetch';

const API_KEY = 'B77qfdp27w@';
const BASE_URL = 'http://localhost:3000';

async function testDeepSeekCoder() {
  console.log('👨‍💻 Testing DeepSeek Coder integration...\n');

  const payload = {
    prompt: 'Write a simple Python function to calculate factorial',
    model: 'deepseek-coder',
    temperature: 0.7,
    maxTokens: 150,
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
      console.log('✅ Success! DeepSeek Coder response:');
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log('❌ Error response:');
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('💥 Request failed:', error.message);
  }
}

// Run the test
testDeepSeekCoder();
