#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting HUU Desktop Automation in development mode...\n');

// Build the web interface first
console.log('📦 Building web interface...');
const webpackBuild = spawn('npm', ['run', 'build:web'], {
  stdio: 'inherit',
  shell: true,
});

webpackBuild.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Web build failed');
    process.exit(1);
  }

  console.log('✅ Web interface built successfully\n');
  console.log('🖥️  Starting Electron with integrated backend...\n');

  // Start Electron with integrated backend
  const electron = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, NODE_ENV: 'development' },
  });

  electron.on('close', (code) => {
    console.log(`\n👋 Electron exited with code ${code}`);
    process.exit(code);
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping application...');
    electron.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    electron.kill('SIGTERM');
    process.exit(0);
  });
});
