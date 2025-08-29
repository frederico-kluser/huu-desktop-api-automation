# HUU Backend Automation - Standalone

## 🎯 Backend API Independente

Este backend pode ser usado de forma completamente independente do Electron, permitindo sua reutilização em outros projetos.

## 📦 Instalação Standalone

Para usar apenas o backend em outro projeto:

```bash
# Copie estes diretórios/arquivos para seu projeto:
# - src/
# - tests/
# - tsconfig.json
# - tsconfig.prod.json
# - backend-package.json (renomeie para package.json)
# - .env.example

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Ou em produção
npm run build
npm run start:prod
```

## 🚀 Scripts Disponíveis

### Modo Standalone (usando backend-package.json)
- `npm run dev` - Executa em desenvolvimento com hot reload
- `npm run start` - Executa com tsx
- `npm run start:prod` - Executa versão compilada
- `npm run build` - Compila TypeScript para JavaScript

### Modo Integrado (usando package.json principal)
- `npm run start:backend` - Executa backend sozinho
- `npm run dev:backend` - Backend com watch mode
- `npm run start:backend:prod` - Backend compilado

## 🔌 API Endpoints

### Health Check
- `GET /health` - Status do servidor
- `GET /api/v1/status` - Status detalhado da API

### Automação
- `POST /api/v1/automation/execute` - Executa ações de automação
- `GET /api/v1/mouse/position` - Posição atual do mouse
- `POST /api/v1/keyboard/type` - Digita texto
- `POST /api/v1/screen/capture` - Captura tela

### OCR
- `POST /api/v1/ocr/extract` - Extrai texto de imagem
- `POST /api/v1/ocr/batch` - Processamento em lote

## 🔧 Configuração

### Variáveis de Ambiente (.env)
```env
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
LOG_LEVEL=info

# Configurações de IA (opcional)
OPENAI_API_KEY=your_key_here
DEEPSEEK_API_KEY=your_key_here
```

## 🏗️ Arquitetura

O backend segue os princípios de Clean Architecture:

```
src/
├── application/       # Casos de uso e lógica de negócio
├── domain/           # Entidades e regras de domínio
├── infrastructure/   # Adaptadores externos (NutJS, etc)
├── interface/        # Controllers e rotas
└── config/          # Configurações e DI
```

## 🔄 Integração com Electron

O backend foi projetado para funcionar tanto:
1. **Standalone**: Como API REST independente
2. **Integrado**: Iniciado automaticamente pelo Electron

### Para integrar em um novo projeto Electron:

```javascript
// electron/main.js
const { spawn } = require('child_process');

function startBackend() {
  const backendProcess = spawn('npm', ['run', 'start:backend'], {
    cwd: __dirname,
    shell: true
  });
  
  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`);
  });
}

app.whenReady().then(() => {
  startBackend();
  createWindow();
});
```

## 📝 Exemplos de Uso

### JavaScript/TypeScript
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});

// Capturar tela
const screenshot = await api.post('/screen/capture');

// Mover mouse
await api.post('/mouse/move', { x: 100, y: 200 });

// Digitar texto
await api.post('/keyboard/type', { text: 'Hello World' });
```

### Python
```python
import requests

base_url = "http://localhost:3000/api/v1"

# Capturar posição do mouse
response = requests.get(f"{base_url}/mouse/position")
position = response.json()
print(f"Mouse em: {position['x']}, {position['y']}")
```

## 🧪 Testes

```bash
# Testes unitários
npm test

# Com cobertura
npm run test:coverage

# Testar endpoints
npm run test:api
```

## 📚 Documentação Completa

Para mais detalhes sobre cada endpoint e suas opções, consulte a documentação principal do projeto.

## 📄 Licença

MIT - Este backend pode ser usado livremente em outros projetos.