# Roadmap técnico completo para API REST wrapper do NutJS

## Stack técnica e arquitetura recomendada

Após análise comparativa detalhada dos frameworks HTTP disponíveis, a combinação **Fastify + Clean Architecture + TSyringe** emerge como a solução ideal para este projeto, oferecendo performance superior (até 7x mais rápido que Express) e arquitetura de plugins otimizada para operações assíncronas longas típicas de automação desktop.

### Comparação de frameworks HTTP

**Fastify (Recomendado)**: Performance superior com serialização JSON ultrarrápida, schema validation built-in ideal para validar comandos de automação, plugin architecture que se alinha perfeitamente com providers NutJS, e melhor gerenciamento de recursos para operações longas.

**Express**: Ecosistema maduro mas com performance inferior devido à arquitetura pesada de middleware, podendo causar blocking em automações intensivas.

**Koa**: Arquitetura leve e moderna mas com comunidade menor e menos middleware disponível para necessidades específicas de automação.

## Estrutura do projeto com Clean Architecture

```
src/
├── domain/                    # Entidades e regras de negócio
│   ├── entities/
│   │   ├── automation-command.ts
│   │   ├── mouse-action.ts
│   │   └── screen-region.ts
│   └── use-cases/
│       └── execute-automation.use-case.ts
├── application/               # Casos de uso e serviços
│   ├── services/
│   │   ├── automation.service.ts
│   │   └── operation-tracker.service.ts
│   └── dto/
│       └── automation-request.dto.ts
├── infrastructure/            # Frameworks e drivers
│   ├── adapters/
│   │   ├── nutjs/
│   │   │   ├── nutjs-mouse.adapter.ts
│   │   │   └── nutjs-screen.adapter.ts
│   │   └── http/
│   │       └── fastify.adapter.ts
│   └── providers/
│       └── nl-matcher.provider.ts
├── interface/                 # Controllers e apresentação
│   ├── controllers/
│   │   └── automation.controller.ts
│   └── middleware/
│       ├── error-handler.middleware.ts
│       └── validation.middleware.ts
└── config/                    # Configurações
    ├── environment.ts
    └── dependency-injection.ts
```

## Configurações do projeto

### tsconfig.json (Node.js 24+ com TypeScript nativo)
```json
{
  "compilerOptions": {
    "target": "ES2024",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,
    "declaration": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "verbatimModuleSyntax": true,
    "lib": ["ES2024", "DOM"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### .eslintrc.js (Regras TypeScript strict + async/await)
```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    '@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
  }
};
```

### package.json
```json
{
  "name": "nutjs-rest-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc -p tsconfig.prod.json",
    "start": "node dist/index.js",
    "test": "jest",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts"
  },
  "dependencies": {
    "@nut-tree/nut-js": "^4.2.6",
    "@nut-tree/nl-matcher": "^1.0.0",
    "fastify": "^4.24.0",
    "zod": "^3.22.4",
    "pino": "^8.16.0",
    "tsyringe": "^4.8.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "typescript": "^5.3.2",
    "@typescript-eslint/eslint-plugin": "^6.12.0",
    "tsx": "^4.6.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.1"
  }
}
```

## Implementação dos endpoints principais

### Servidor Fastify com arquitetura modular
```typescript
// src/index.ts
import Fastify from 'fastify';
import { automationRoutes } from './routes/automation.routes';
import { errorHandler } from './middleware/error-handler';
import { container } from './config/dependency-injection';

const server = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  }
});

// Register plugins
await server.register(automationRoutes, { prefix: '/api/v1' });

// Error handling
server.setErrorHandler(errorHandler);

// Start server
const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
```

### Service Layer para operações de mouse com interpolação
```typescript
// src/services/mouse.service.ts
import { mouse, straightTo, Point, Button } from '@nut-tree/nut-js';

export class MouseService {
  async move(request: MouseMoveRequest): Promise<void> {
    const { x, y, smooth = true, duration = 1000 } = request;
    
    if (smooth) {
      mouse.config.mouseSpeed = Math.max(100, Math.min(1000, duration));
    }

    const targetPoint = new Point(x, y);
    await mouse.move(straightTo(targetPoint));
  }

  async drag(from: Point, to: Point): Promise<void> {
    await mouse.move(straightTo(from));
    await mouse.pressButton(Button.LEFT);
    await mouse.move(straightTo(to));
    await mouse.releaseButton(Button.LEFT);
  }
}
```

### Template matching com base64
```typescript
// src/services/screen.service.ts
import { screen, Image } from '@nut-tree/nut-js';
import '@nut-tree/nl-matcher'; // Provider moderno

export class ScreenService {
  async findTemplate(base64Image: string, confidence = 0.8): Promise<MatchResult[]> {
    // Converter base64 para buffer
    const imageBuffer = Buffer.from(base64Image.replace(/^data:image\/[a-z]+;base64,/, ''), 'base64');
    
    // Criar imagem NutJS
    const templateImage = new Image(imageBuffer.length, 1, imageBuffer, 3);
    
    // Configurar busca
    screen.config.confidence = confidence;
    
    // Buscar com otimizações
    const matches = await screen.findAll(templateImage, {
      searchMultipleScales: false, // Performance
      scaleSteps: [1, 0.9, 0.8]
    });
    
    return matches.map(match => ({
      x: match.left,
      y: match.top,
      width: match.width,
      height: match.height,
      confidence: match.confidence
    }));
  }
}
```

### Validação com Zod
```typescript
// src/schemas/automation.schemas.ts
import { z } from 'zod';

export const mouseSchemas = {
  move: z.object({
    x: z.number().int().min(0),
    y: z.number().int().min(0),
    smooth: z.boolean().optional().default(true),
    duration: z.number().int().min(100).max(5000).optional()
  }),
  
  click: z.object({
    x: z.number().int().min(0).optional(),
    y: z.number().int().min(0).optional(),
    button: z.enum(['left', 'right', 'middle']).optional(),
    doubleClick: z.boolean().optional()
  })
};
```

## Performance e otimizações

### Pool de recursos NutJS
```typescript
// src/infrastructure/nutjs-pool.ts
import genericPool from 'generic-pool';

const nutjsPool = genericPool.createPool({
  create: async () => {
    const nutjs = await import('@nut-tree/nut-js');
    return nutjs;
  },
  destroy: async (instance) => {
    // Cleanup se necessário
  },
  max: 10,
  min: 2,
  idleTimeoutMillis: 30000
});

export { nutjsPool };
```

### Cache de templates com LRU
```typescript
import { LRUCache } from 'lru-cache';
import crypto from 'crypto';

const templateCache = new LRUCache<string, ProcessedImage>({
  max: 100,
  ttl: 1000 * 60 * 5 // 5 minutos
});

const getCacheKey = (imageBuffer: Buffer): string => {
  return crypto.createHash('md5').update(imageBuffer).digest('hex');
};
```

### Throttling para operações de mouse
```typescript
const mouseThrottle = throttle((operation: () => Promise<void>) => {
  return operation();
}, 16); // 60fps

const clickDebounce = debounce((operation: () => Promise<void>) => {
  return operation();
}, 100); // Evita cliques duplos acidentais
```

## Edge cases e compatibilidade

### Detecção e handling por sistema operacional
```typescript
// src/utils/platform-detector.ts
export const detectPlatform = () => {
  const platform = process.platform;
  
  const handlers = {
    win32: {
      checkPermissions: async () => true,
      setupDisplay: async () => {},
      specialConfigs: () => ({
        mouseSpeed: 500
      })
    },
    darwin: {
      checkPermissions: async () => {
        // Verificar permissões de acessibilidade
        console.warn('Verifique permissões em System Preferences > Security & Privacy');
        return true;
      },
      setupDisplay: async () => {},
      specialConfigs: () => ({
        mouseSpeed: 300
      })
    },
    linux: {
      checkPermissions: async () => true,
      setupDisplay: async () => {
        if (!process.env.DISPLAY) {
          throw new Error('DISPLAY não configurado');
        }
      },
      specialConfigs: () => ({
        mouseSpeed: 400
      })
    }
  };
  
  return handlers[platform] || handlers.linux;
};
```

### Handling de múltiplos monitores
```typescript
const handleMultiMonitor = async (targetMonitor: number = 0) => {
  // NutJS atualmente tem limitações com múltiplos monitores
  // Workaround: capturar todos os monitores e calcular offsets
  
  const screenBounds = await screen.width(); // Monitor principal
  
  // Para outros monitores, usar coordenadas absolutas
  // considerando a configuração do sistema
};
```

## Deployment local

### PM2 para produção
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'nutjs-api',
    script: 'dist/index.js',
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: 'logs/error.log',
    out_file: 'logs/out.log'
  }]
};
```

### Build otimizado com pkg
```json
{
  "pkg": {
    "scripts": ["dist/**/*.js"],
    "assets": [
      "node_modules/@nut-tree/**/*"
    ],
    "targets": [
      "node18-win-x64",
      "node18-linux-x64",
      "node18-macos-x64"
    ]
  }
}
```

### Swagger/OpenAPI
```yaml
openapi: 3.0.0
info:
  title: NutJS Desktop Automation API
  version: 1.0.0
paths:
  /api/v1/mouse/move:
    post:
      summary: Move mouse cursor
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MouseMove'
      responses:
        '200':
          description: Success
```

## Timeline de desenvolvimento

### Semana 1: Fundação (20-25 horas)
- Setup do projeto TypeScript + Fastify
- Integração básica com NutJS
- Endpoints fundamentais (mouse move/click)
- Hot-reload e debugging configurados

### Semana 2: Funcionalidades core (25-30 horas)
- Implementação completa de todos endpoints
- Sistema de template matching
- Validação com Zod
- Testes unitários e integração

### Semana 3: Build e deployment (20-25 horas)
- Configuração de build para produção
- Empacotamento com pkg
- Setup PM2 e systemd
- Documentação Swagger completa

### Semana 4: Otimização e polimento (15-20 horas)
- Implementação de pool de recursos
- Cache de templates
- Métricas e monitoramento
- Guia de troubleshooting

## Boilerplate inicial

```typescript
// src/app.ts - Servidor mínimo funcional
import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const app = Fastify({
  logger: true
}).withTypeProvider<TypeBoxTypeProvider>();

app.post('/api/v1/mouse/move', {
  schema: {
    body: {
      type: 'object',
      properties: {
        x: { type: 'number' },
        y: { type: 'number' }
      },
      required: ['x', 'y']
    }
  }
}, async (request, reply) => {
  const { x, y } = request.body;
  // Implementar movimento do mouse
  return { success: true };
});

app.listen({ port: 3000, host: '0.0.0.0' });
```

## Scripts cross-platform

```json
{
  "scripts": {
    "dev:win": "set NODE_ENV=development && tsx watch src/index.ts",
    "dev:unix": "NODE_ENV=development tsx watch src/index.ts",
    "build": "cross-env NODE_ENV=production tsc",
    "package:all": "npm run package:win && npm run package:linux && npm run package:mac"
  }
}
```

## Guia de troubleshooting

### Problemas comuns e soluções

**macOS - Permissões de acessibilidade**: System Preferences > Security & Privacy > Privacy > Accessibility - adicionar Node.js ou o executável

**Linux - Display não encontrado**: `export DISPLAY=:0` ou usar Xvfb para ambientes headless

**Windows - DPI scaling**: Detectar e ajustar coordenadas baseado no fator de escala do monitor

**Performance de template matching**: Usar NL-matcher (1.72x mais rápido), limitar região de busca, ajustar confidence threshold

Este roadmap fornece uma base sólida e production-ready para criar uma API REST wrapper do NutJS, com arquitetura escalável, performance otimizada e suporte cross-platform completo.