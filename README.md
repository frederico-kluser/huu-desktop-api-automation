# HUU Desktop API Automation

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status](https://img.shields.io/badge/Status-Active-success.svg)

**Sistema completo de automação desktop com API REST e interface web**

[Instalação](#-instalação-rápida) • 
[Documentação](#-documentação) • 
[API](#-endpoints-da-api) • 
[Interface Web](#-interface-web---funcionalidades) • 
[Exemplos](#-exemplos-de-uso)

</div>

## 🚀 Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/huu-desktop-api-automation.git
cd huu-desktop-api-automation

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie em desenvolvimento
npm run dev:full  # API + Web

# Ou em produção
npm start
```

Acesse:
- 🌐 **Interface Web**: http://localhost:3000
- 📡 **API**: http://localhost:3000/api/v1
- 📊 **Health Check**: http://localhost:3000/health

## ⚡ Funcionalidades Principais

- 🖱️ **Automação de Mouse** - Cliques, movimentos, arrastar e scroll
- ⌨️ **Automação de Teclado** - Digitação, teclas especiais e atalhos
- 📸 **Captura de Tela** - Screenshots e busca de templates
- 📝 **OCR** - Extração de texto de imagens
- 🤖 **LLMs** - Integração com OpenAI e DeepSeek
- 📋 **Clipboard** - Copiar, colar e gerenciamento
- 🎯 **Sequências** - Execute múltiplas ações em sequência
- 🌊 **Streaming** - Eventos em tempo real via SSE

## 📋 Pré-requisitos

- **Node.js** 18.0 ou superior
- **npm** ou **pnpm**
- **Sistema Operacional**: Windows, macOS ou Linux
- **Permissões**: Acesso a automação desktop (veja [Permissões](#-permissões))

## 🔧 Permissões

### macOS
```
System Preferences > Security & Privacy > Privacy > Accessibility
Adicione o Terminal ou sua aplicação
```

### Linux
```bash
export DISPLAY=:0  # Configure a variável DISPLAY
```

### Windows
Geralmente funciona sem configuração adicional

## 📖 Documentação

- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [API Endpoints](#-endpoints-da-api)
- [Interface Web](#-interface-web---funcionalidades)
- [Configuração](#-configurações-e-variáveis-de-ambiente)
- [Desenvolvimento](#-scripts-disponíveis)

## 💡 Exemplos de Uso

### Via API (cURL)
```bash
# Mover mouse
curl -X POST http://localhost:3000/api/v1/mouse/move \
  -H "Content-Type: application/json" \
  -d '{"x": 500, "y": 300, "smooth": true}'

# Digitar texto
curl -X POST http://localhost:3000/api/v1/keyboard/type \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World!", "mode": "perChar", "value": 50}'
```

### Via Interface Web
1. Acesse http://localhost:3000
2. Navegue para `/automation`
3. Use o construtor visual de ações
4. Execute sequências com um clique

---

## 🎯 Visão Geral

O **HUU Desktop API Automation** é um sistema completo de automação desktop que combina uma API REST robusta construída com NutJS e uma interface web moderna em React. O projeto permite automação avançada de mouse, teclado, captura de tela, OCR, integração com LLMs e muito mais, tudo através de uma API HTTP ou interface visual.

## 🏗️ Arquitetura do Projeto

### Clean Architecture
O projeto segue os princípios da Clean Architecture com separação clara de responsabilidades:

```
src/
├── domain/          # Camada de domínio (entidades e regras de negócio)
├── application/     # Camada de aplicação (serviços, DTOs, casos de uso)
├── infrastructure/  # Camada de infraestrutura (adaptadores externos)
├── interface/       # Camada de interface (controllers, middleware, schemas)
└── routes/          # Definição de rotas da API
```

### Stack Tecnológica

#### Backend (API)
- **TypeScript** - Linguagem principal com tipagem estática
- **Fastify** - Framework web de alta performance
- **NutJS** - Biblioteca de automação desktop cross-platform
- **TSyringe** - Container de injeção de dependência
- **Zod** - Validação de schemas
- **Tesseract.js** - OCR (Optical Character Recognition)
- **LangChain** - Integração com LLMs (OpenAI, DeepSeek)
- **Sharp** - Processamento de imagens
- **Pino** - Sistema de logging
- **uiohook-napi** - Captura global de eventos de input

#### Frontend (Web)
- **React 18** - Framework de interface
- **TypeScript** - Tipagem estática
- **React Router** - Navegação SPA
- **Bootstrap 5** - Framework CSS
- **React Bootstrap** - Componentes UI
- **Axios** - Cliente HTTP
- **Webpack 5** - Bundler

## 📦 Funcionalidades Implementadas

### 1. Automação de Mouse
- ✅ Mover cursor para coordenadas específicas
- ✅ Cliques (simples, duplo, botões diferentes)
- ✅ Arrastar e soltar (drag & drop)
- ✅ Scroll vertical
- ✅ Obter posição atual do cursor
- ✅ Movimento suave configurável

### 2. Automação de Teclado
- ✅ Digitar texto com diferentes modos de velocidade
- ✅ Pressionar teclas individuais
- ✅ Combinações de teclas (atalhos)
- ✅ Suporte para teclas especiais (F1-F12, Enter, Tab, etc.)

### 3. Captura e Análise de Tela
- ✅ Screenshot completa ou região específica
- ✅ Busca de template na tela (template matching)
- ✅ Aguardar elemento aparecer na tela
- ✅ Captura com processamento de imagem

### 4. OCR (Reconhecimento Óptico de Caracteres)
- ✅ Extração de texto de imagens
- ✅ Suporte multi-idioma (português e inglês)
- ✅ Pré-processamento de imagem para melhor precisão
- ✅ Pool de workers para processamento paralelo
- ✅ Múltiplos formatos de saída (texto, JSON estruturado, tabela)

### 5. Integração com LLMs
- ✅ Suporte para OpenAI (GPT-4, GPT-3.5)
- ✅ Suporte para DeepSeek
- ✅ Processamento de prompts customizados
- ✅ Análise de conteúdo e geração de texto

### 6. Clipboard
- ✅ Copiar texto para área de transferência
- ✅ Colar conteúdo do clipboard
- ✅ Limpar clipboard
- ✅ Leitura do conteúdo atual

### 7. Captura Global de Eventos
- ✅ Stream de eventos de mouse em tempo real (SSE)
- ✅ Stream de eventos de teclado em tempo real
- ✅ Buffer de eventos com estatísticas
- ✅ Sistema de dispatcher para múltiplos listeners

### 8. Sistema de Execução de Sequências
- ✅ Executor de múltiplas ações em sequência
- ✅ Suporte para diferentes dispositivos (mouse, teclado, wait, etc.)
- ✅ Configuração de delay entre ações
- ✅ Opção de parar em caso de erro

### 9. Interface Web
- ✅ Dashboard principal com status da API
- ✅ Página de automação completa
- ✅ Construtor visual de ações (ActionBuilder)
- ✅ Captura/seleção de imagem base64
- ✅ Tabela de visualização de ações
- ✅ Salvar/carregar automações
- ✅ Exportar/importar JSON
- ✅ Execução de sequências via API
- ✅ Indicador de conexão com API em tempo real

### 10. Sistema de Persistência
- ✅ Salvar automações no localStorage
- ✅ Backup automático de automações
- ✅ Exportação para arquivo JSON
- ✅ Importação de arquivos JSON
- ✅ Múltiplos slots de salvamento

## 🛣️ Endpoints da API

### Mouse (`/api/v1/mouse/*`)
- `POST /move` - Move o cursor
- `POST /click` - Clica com o mouse
- `POST /drag` - Arrasta de um ponto a outro
- `POST /scroll` - Rola a tela
- `GET /position` - Obtém posição atual

### Teclado (`/api/v1/keyboard/*`)
- `POST /type` - Digita texto
- `POST /press` - Pressiona tecla
- `POST /combination` - Executa combinação de teclas

### Tela (`/api/v1/screen/*`)
- `POST /capture` - Captura screenshot
- `POST /find` - Busca template na tela
- `POST /waitFor` - Aguarda elemento aparecer

### OCR (`/api/v1/ocr/*`)
- `POST /extract` - Extrai texto de imagem
- `POST /extractWithFormat` - Extrai com formato específico

### LLM (`/api/v1/llm/*`)
- `POST /completion` - Gera completion com LLM

### Clipboard (`/api/v1/clipboard/*`)
- `POST /copy` - Copia texto
- `POST /paste` - Cola conteúdo
- `POST /clear` - Limpa clipboard
- `GET /read` - Lê conteúdo atual

### Automação (`/api/v1/automation/*`)
- `POST /execute` - Executa sequência de ações

### Streaming (`/api/v1/stream/*`)
- `GET /input-events` - Stream SSE de eventos
- `GET /input-events/stats` - Estatísticas de eventos
- `POST /input-events/clear` - Limpa buffer
- `POST /input-events/prune` - Remove eventos antigos

### Status
- `GET /api/v1/status` - Status da API
- `GET /health` - Health check

## 🔧 Configurações e Variáveis de Ambiente

### Variáveis Suportadas
- `PORT` - Porta do servidor (padrão: 3000)
- `NODE_ENV` - Ambiente (development/production)
- `LOG_LEVEL` - Nível de log (debug/info/warn/error)
- `API_KEY` - Chave de API para autenticação
- `OPENAI_API_KEY` - Chave da OpenAI
- `DEEPSEEK_API_KEY` - Chave do DeepSeek
- `DEFAULT_LLM_MODEL` - Modelo LLM padrão
- `OCR_WORKERS` - Número de workers OCR
- `OCR_LANGUAGES` - Idiomas suportados pelo OCR

## 📁 Estrutura de Arquivos Importantes

```
/
├── src/                      # Código fonte da API
│   ├── index.ts             # Ponto de entrada
│   ├── application/         # Serviços e DTOs
│   ├── domain/             # Entidades e regras
│   ├── infrastructure/     # Adaptadores externos
│   └── interface/          # Controllers e middleware
├── web/                     # Interface web React
│   ├── src/
│   │   ├── App.tsx         # Componente raiz
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── services/       # Serviços de API
│   │   └── types/          # Definições TypeScript
│   └── dist/               # Build da web
├── tests/                   # Testes unitários e integração
├── tessdata/               # Dados para OCR
├── package.json            # Dependências e scripts
└── tsconfig.json           # Configuração TypeScript
```

## 🚀 Scripts Disponíveis

### Desenvolvimento
- `npm run dev` - Inicia API em modo watch
- `npm run dev:web` - Inicia apenas frontend
- `npm run dev:full` - Inicia API e frontend juntos

### Build
- `npm run build` - Build da API
- `npm run build:web` - Build do frontend
- `npm run build:prod` - Build de produção

### Produção
- `npm start` - Inicia em produção (API + Web)
- `npm run start:prod` - Inicia servidor de produção

### Testes
- `npm test` - Roda todos os testes
- `npm run test:unit` - Apenas testes unitários
- `npm run test:integration` - Apenas testes de integração
- `npm run test:coverage` - Testes com cobertura

### Qualidade
- `npm run lint` - Verifica linting
- `npm run format` - Formata código
- `npm run typecheck` - Verifica tipos TypeScript

## 🎨 Interface Web - Funcionalidades

### Página Principal (`/`)
- Informações sobre a API
- Status de conexão
- Links para documentação
- Navegação para automação

### Página de Automação (`/automation`)
- **Captura de Tela**: Print screen ou seleção de imagem
- **Construtor de Ações**: Interface visual para criar sequências
- **Tabela de Ações**: Visualização e gerenciamento
- **Salvamento**: Múltiplos slots de save/load
- **Exportação**: Download como JSON
- **Execução**: Rodar sequências via API
- **Status em Tempo Real**: Indicador de conexão

## 🔴 O Que Está Faltando Implementar

### 1. Autenticação e Segurança
- ❌ Sistema completo de autenticação JWT
- ❌ Rate limiting por usuário
- ❌ CORS configurável
- ❌ Criptografia de dados sensíveis
- ❌ Audit log de ações

### 2. Funcionalidades Avançadas
- ❌ Gravação e replay de macros
- ❌ Condicionais e loops nas sequências
- ❌ Variáveis e templates de automação
- ❌ Agendamento de tarefas (cron)
- ❌ Webhooks para eventos

### 3. Interface Web
- ❌ Editor visual de coordenadas sobre screenshot
- ✅ Drag-and-drop para reordenar ações
- ❌ Validação em tempo real dos formulários
- ❌ Dark mode
- ❌ Histórico de execuções
- ❌ Dashboard com métricas
- ❌ Documentação interativa (Swagger UI)

### 4. Melhorias na API
- ❌ WebSocket para comunicação bidirecional
- ❌ Suporte para múltiplos monitores
- ❌ Detecção de elementos UI nativos
- ❌ Integração com mais LLMs (Claude, Gemini)
- ❌ Cache de resultados OCR
- ❌ Compressão de imagens

### 5. DevOps e Infraestrutura
- ❌ Docker e Docker Compose
- ❌ CI/CD pipeline (GitHub Actions)
- ❌ Monitoramento (Prometheus/Grafana)
- ❌ Logs centralizados
- ❌ Backup automático de configurações

### 6. Testes
- ❌ Testes E2E com Playwright
- ❌ Testes de carga
- ❌ Testes de segurança
- ❌ Aumentar cobertura (atualmente ~70%)

### 7. Documentação
- ❌ API documentation completa
- ❌ Guias de uso avançado
- ❌ Vídeos tutoriais
- ❌ Exemplos de integração
- ❌ Troubleshooting guide

### 8. Funcionalidades Específicas
- ❌ Reconhecimento de voz (speech-to-text)
- ❌ Síntese de voz (text-to-speech)
- ❌ Integração com assistentes virtuais
- ❌ Suporte para gamepad/joystick
- ❌ Captura de vídeo da tela

## 🎯 Casos de Uso

1. **Automação de Testes**: Testes de interface automatizados
2. **RPA (Robotic Process Automation)**: Automação de processos repetitivos
3. **Acessibilidade**: Ferramentas assistivas para usuários com deficiência
4. **Gaming**: Bots e automação para jogos
5. **Data Entry**: Preenchimento automático de formulários
6. **Web Scraping Visual**: Extração de dados de interfaces
7. **Monitoramento**: Verificação automática de sistemas
8. **Treinamento**: Demonstrações e tutoriais interativos

## 🔒 Considerações de Segurança

1. **API Key**: Autenticação básica implementada
2. **Validação**: Todos inputs são validados com Zod
3. **Rate Limiting**: Básico implementado
4. **CORS**: Configurado para desenvolvimento
5. **Logs**: Sistema de logging com Pino
6. **Error Handling**: Middleware centralizado

## 📈 Performance

- **Fastify**: Framework otimizado para alta performance
- **Worker Pool OCR**: Processamento paralelo
- **Event Buffer**: Sistema eficiente de eventos
- **Lazy Loading**: Carregamento sob demanda
- **Caching**: Em memória para resultados frequentes

## 🚦 Status do Projeto

O projeto está **funcional e em produção**, com as principais funcionalidades implementadas e testadas. A interface web está completa para uso básico, mas há espaço para muitas melhorias e funcionalidades avançadas.

### Prioridades de Desenvolvimento
1. 🔴 **Alta**: Autenticação completa, Docker, Testes E2E
2. 🟡 **Média**: WebSocket, Dark mode, Swagger UI
3. 🟢 **Baixa**: Funcionalidades avançadas, integrações extras

## 📝 Conclusão

O **HUU Desktop API Automation** é um projeto robusto e bem estruturado que oferece uma solução completa para automação desktop. Com sua arquitetura limpa, stack moderna e interface intuitiva, está pronto para uso em produção, mas com grande potencial para expansão e melhorias.