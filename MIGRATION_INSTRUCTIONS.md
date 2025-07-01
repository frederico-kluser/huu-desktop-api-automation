# Instruções de Migração e Melhorias - NutJS REST API

## 1. Migração da Dependência Fork para Oficial

### Situação Atual
O projeto usa `@nut-tree-fork/nut-js` versão 4.2.6, que é um fork mantido pela comunidade.

### Problema com a Biblioteca Oficial
A biblioteca oficial `@nut-tree/nut-js` teve mudanças importantes:
- O autor removeu os pacotes públicos do npm
- Os pacotes pré-construídos agora requerem uma assinatura ativa do registro privado nutjs.dev
- O projeto continua sendo open source, mas precisa ser compilado a partir do código-fonte

### Recomendação
**Manter o fork `@nut-tree-fork/nut-js`** pelos seguintes motivos:
1. É mantido ativamente pela comunidade
2. Está disponível publicamente no npm
3. Tem versão mais recente (4.2.6) que a oficial (4.2.0)
4. Não requer assinatura paga para usar

### Se ainda assim quiser usar a versão oficial
1. Você precisará se registrar em https://nutjs.dev/
2. Configurar o registry privado no `.npmrc`:
   ```
   @nut-tree:registry=https://nutjs.dev/
   ```
3. Fazer login no registry privado
4. Instalar a versão oficial

## 2. Configurações VS Code Necessárias

Crie a pasta `.vscode` na raiz do projeto e adicione os seguintes arquivos:

### .vscode/settings.json
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["typescript"],
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.exclude": {
    "node_modules": true,
    "dist": true,
    ".nyc_output": true,
    "coverage": true
  }
}
```

### .vscode/extensions.json
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "orta.vscode-jest",
    "humao.rest-client"
  ]
}
```

### .vscode/launch.json
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug API",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "skipFiles": ["<node_internals>/**"],
      "console": "integratedTerminal",
      "preLaunchTask": "npm: audit:roadmap"
    }
  ]
}
```

## 3. Dependências Faltantes

Instale as seguintes dependências que estão no roadmap mas não no projeto:

```bash
# Provider de template matching (se disponível publicamente)
npm install @nut-tree/nl-matcher || echo "Provider não disponível publicamente"

# Dependências de desenvolvimento adicionais
npm install --save-dev cross-env tsx

# Para otimizações de performance (opcional)
npm install lru-cache generic-pool
```

## 4. Arquivos de Configuração Faltantes

### tsconfig.prod.json
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "sourceMap": false,
    "removeComments": true
  },
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts",
    "src/test-endpoint.ts"
  ]
}
```

## 5. Melhorias Críticas no Código

### ScreenAdapter - Correção da criação de imagem
O método `createImageFromBuffer` está usando dimensões fixas. Precisa detectar as dimensões reais da imagem base64.

### MouseService - Adicionar validação de coordenadas
Validar se as coordenadas estão dentro dos limites da tela antes de executar ações.

### Logging Estruturado
Adicionar logs usando Pino em todos os services para melhor debugging.

## 6. Estrutura de Testes

Crie a seguinte estrutura de testes:
```
tests/
├── unit/
│   ├── services/
│   │   ├── mouse.service.test.ts
│   │   └── screen.service.test.ts
│   └── adapters/
│       ├── nutjs-mouse.adapter.test.ts
│       └── nutjs-screen.adapter.test.ts
└── integration/
    └── api/
        └── automation.test.ts
```

## 7. Scripts Adicionais no package.json

Adicione os seguintes scripts:
```json
{
  "scripts": {
    "audit:roadmap": "ts-node src/tools/audit-roadmap.ts --fix=false",
    "build:prod": "tsc -p tsconfig.prod.json",
    "test:unit": "jest tests/unit",
    "test:integration": "jest tests/integration",
    "test:coverage": "jest --coverage"
  }
}
```

## 8. Próximos Passos

1. **Manter o fork atual** - É a melhor opção considerando as limitações da biblioteca oficial
2. **Criar configurações VS Code** - Para padronizar o ambiente de desenvolvimento
3. **Implementar melhorias no ScreenAdapter** - Correção crítica para funcionalidade
4. **Adicionar testes** - Garantir cobertura mínima de 80%
5. **Implementar logging estruturado** - Para melhor observabilidade
6. **Criar documentação OpenAPI** - Para facilitar o uso da API