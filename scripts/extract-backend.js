#!/usr/bin/env node

/**
 * Script para extrair o backend como projeto independente
 * Uso: node scripts/extract-backend.js [caminho-destino]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const destinationPath = process.argv[2] || './backend-standalone';

console.log('📦 Extraindo backend para projeto independente...');
console.log(`📂 Destino: ${path.resolve(destinationPath)}`);

// Criar diretório de destino
if (!fs.existsSync(destinationPath)) {
  fs.mkdirSync(destinationPath, { recursive: true });
}

// Arquivos e diretórios para copiar
const itemsToCopy = [
  { src: 'src', dest: 'src' },
  { src: 'tests', dest: 'tests' },
  { src: 'tsconfig.json', dest: 'tsconfig.json' },
  { src: 'tsconfig.prod.json', dest: 'tsconfig.prod.json' },
  { src: 'tsconfig.test.json', dest: 'tsconfig.test.json' },
  { src: 'backend-package.json', dest: 'package.json' },
  { src: '.env.example', dest: '.env.example' },
  { src: '.eslintrc.json', dest: '.eslintrc.json' },
  { src: '.prettierrc', dest: '.prettierrc' },
  { src: 'jest.config.js', dest: 'jest.config.js' },
  { src: 'BACKEND_README.md', dest: 'README.md' },
];

// Função para copiar recursivamente
function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItem => {
      copyRecursive(
        path.join(src, childItem),
        path.join(dest, childItem)
      );
    });
  } else if (exists) {
    fs.copyFileSync(src, dest);
  }
}

// Copiar arquivos
console.log('📋 Copiando arquivos...');
itemsToCopy.forEach(item => {
  const srcPath = path.join(__dirname, '..', item.src);
  const destPath = path.join(destinationPath, item.dest);
  
  if (fs.existsSync(srcPath)) {
    console.log(`  ✅ ${item.src} → ${item.dest}`);
    copyRecursive(srcPath, destPath);
  } else {
    console.log(`  ⚠️  ${item.src} não encontrado, pulando...`);
  }
});

// Criar .gitignore
console.log('📝 Criando .gitignore...');
const gitignoreContent = `
node_modules/
dist/
coverage/
.nyc_output/
.env
.env.local
*.log
.DS_Store
.vscode/
.idea/
*.swp
*.swo
*~
tessdata/
`.trim();

fs.writeFileSync(path.join(destinationPath, '.gitignore'), gitignoreContent);

// Criar .env.example se não existir
if (!fs.existsSync(path.join(destinationPath, '.env.example'))) {
  console.log('📝 Criando .env.example...');
  const envExampleContent = `
# Server Configuration
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
LOG_LEVEL=info

# API Keys (opcional)
OPENAI_API_KEY=
DEEPSEEK_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=

# OCR Configuration
OCR_LANG=por+eng
`.trim();
  
  fs.writeFileSync(path.join(destinationPath, '.env.example'), envExampleContent);
}

// Criar script de inicialização
console.log('📝 Criando script de inicialização...');
const startScript = `#!/bin/bash

echo "🚀 Iniciando HUU Backend Automation..."

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependências..."
  npm install
fi

# Verificar se .env existe
if [ ! -f ".env" ]; then
  echo "⚙️ Criando arquivo .env..."
  cp .env.example .env
  echo "⚠️  Por favor, configure o arquivo .env com suas chaves de API"
fi

# Iniciar o backend
echo "✨ Iniciando servidor..."
npm run dev
`;

fs.writeFileSync(path.join(destinationPath, 'start.sh'), startScript);
fs.chmodSync(path.join(destinationPath, 'start.sh'), '755');

// Windows batch file
const startBatch = `@echo off
echo 🚀 Iniciando HUU Backend Automation...

if not exist "node_modules" (
  echo 📦 Instalando dependências...
  npm install
)

if not exist ".env" (
  echo ⚙️ Criando arquivo .env...
  copy .env.example .env
  echo ⚠️  Por favor, configure o arquivo .env com suas chaves de API
)

echo ✨ Iniciando servidor...
npm run dev
`;

fs.writeFileSync(path.join(destinationPath, 'start.bat'), startBatch);

console.log('\n✅ Backend extraído com sucesso!');
console.log('\n📚 Para usar o backend standalone:');
console.log(`  1. cd ${destinationPath}`);
console.log('  2. npm install');
console.log('  3. npm run dev');
console.log('\n🎯 Ou simplesmente execute:');
console.log(`  - Linux/Mac: ${destinationPath}/start.sh`);
console.log(`  - Windows: ${destinationPath}/start.bat`);
console.log('\n📖 Consulte o README.md para mais informações.');