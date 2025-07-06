# API de Automação Desktop - Documentação de Uso

## Índice

- [Visão Geral](#visão-geral)
- [Autenticação](#autenticação)
- [Formato de Resposta](#formato-de-resposta)
- [Tratamento de Erros](#tratamento-de-erros)
- [Endpoints da API](#endpoints-da-api)
  - [1. Operações de Teclado](#1-operações-de-teclado)
  + [2. Operações de Mouse](#2-operações-de-mouse)
  + [3. Operações de Tela](#3-operações-de-tela)
  + [4. Operações de Área de Transferência](#4-operações-de-área-de-transferência)
  + [5. Integração com LLM](#5-integração-com-llm)
  + [6. Streaming de Eventos](#6-streaming-de-eventos)
  - [7. Health Check](#7-health-check)
- [Configurações Avançadas](#configurações-avançadas)
- [Exemplos de Uso](#exemplos-de-uso)
- [Limites e Restrições](#limites-e-restrições)
- [Troubleshooting](#troubleshooting)

## Visão Geral

Esta API REST fornece uma interface completa em http://localhost:3000/api/v1
para automação desktop, permitindo controle programático de mouse, teclado,
captura de tela e integração com modelos de linguagem (LLMs). Construída com
TypeScript, Fastify e NutJS, seguindo os princípios de Clean Architecture.

### Características Principais

- **Automação Desktop Completa**: Controle de mouse, teclado e captura de tela
- **Streaming em Tempo Real**: Eventos de entrada via Server-Sent Events (SSE)
- **Integração com IA**: Suporte para OpenAI e DeepSeek LLMs
- **Arquitetura Limpa**: Separação clara de responsabilidades
- **Validação Robusta**: Schemas Zod para todas as requisições
- **Alta Performance**: Otimizado para baixa latência

### URL Base

```
http://localhost:3000/api/v1
```

## Autenticação

A API utiliza autenticação via API Key no header das requisições:

```http
x-api-key: your-api-key-here
```

### Endpoints que Requerem Autenticação

- `GET /api/v1/mouse/position/stream`
- `POST /api/v1/llm`
- Todos os endpoints de streaming de eventos

### Exemplo de Requisição Autenticada

```bash
curl -X POST http://localhost:3000/api/v1/llm \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key-here" \
  -d '{"prompt": "Hello", "model": "gpt-4"}'
```

## Formato de Resposta

Todas as respostas seguem o formato padrão:

```json
{
  "success": boolean,
  "data": any,        // Presente quando success=true
  "error": string,    // Presente quando success=false
  "code": string      // Código de erro opcional
}
```

### Resposta de Sucesso

```json
{
  "success": true,
  "data": {
    "x": 100,
    "y": 200
  }
}
```

### Resposta de Erro

```json
{
  "success": false,
  "error": "Invalid coordinates",
  "code": "INVALID_COORDINATES"
}
```

## Tratamento de Erros

### Códigos de Status HTTP

| Código | Significado | Código de Erro |
|--------|------------|----------------|
| 400 | Requisição inválida | BAD_REQUEST |
| 401 | Não autorizado | UNAUTHORIZED |
| 403 | Proibido | FORBIDDEN |
| 404 | Não encontrado | NOT_FOUND |
| 405 | Método não permitido | METHOD_NOT_ALLOWED |
| 408 | Timeout da requisição | REQUEST_TIMEOUT |
| 413 | Payload muito grande | PAYLOAD_TOO_LARGE |
| 429 | Muitas requisições | TOO_MANY_REQUESTS |
| 500 | Erro interno do servidor | INTERNAL_SERVER_ERROR |
| 502 | Bad Gateway | BAD_GATEWAY |
| 503 | Serviço indisponível | SERVICE_UNAVAILABLE |
| 504 | Gateway Timeout | GATEWAY_TIMEOUT |

### Erros de Validação

Erros de validação incluem detalhes específicos:

```json
{
  "success": false,
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "x",
      "message": "Expected number, received string"
    }
  ]
}
```

## Endpoints da API

### 1. Operações de Teclado

#### 1.1 Digitar Texto

Digita texto com opções de temporização.

**Endpoint:** `POST /api/v1/keyboard/type`

**Headers:**
```http
Content-Type: application/json
```

**Body:**
```json
{
  "text": "Hello World",
  "mode": "instant",      // Opcional: instant, perChar, total
  "value": 1000          // Opcional: valor em ms dependendo do modo
}
```

**Modos de Digitação:**
- `instant`: Digita todo o texto instantaneamente
- `perChar`: Aplica delay entre cada caractere (value = delay por caractere)
- `total`: Distribui o tempo total entre todos os caracteres (value = tempo total)

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "charactersTyped": 11,
    "mode": "instant",
    "totalTime": 0
  }
}
```

**Exemplo cURL:**
```bash
curl -X POST http://localhost:3000/api/v1/keyboard/type \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello World",
    "mode": "perChar",
    "value": 100
  }'
```

#### 1.2 Pressionar Tecla

Pressiona uma tecla específica.

**Endpoint:** `POST /api/v1/keyboard/press`

**Body:**
```json
{
  "key": "enter"
}
```

**Teclas Suportadas:**
- Navegação: `enter`, `tab`, `escape`, `space`, `backspace`, `delete`
- Setas: `up`, `down`, `left`, `right`
- Posição: `home`, `end`, `pageup`, `pagedown`
- Função: `f1` até `f12`

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "key": "enter",
    "pressed": true
  }
}
```

#### 1.3 Combinação de Teclas

Executa combinações de teclas (atalhos).

**Endpoint:** `POST /api/v1/keyboard/combination`

**Body:**
```json
{
  "keys": ["ctrl", "c"]
}
```

**Modificadores Suportados:**
- `ctrl`, `alt`, `shift`, `cmd` (macOS) / `win` (Windows)

**Teclas Suportadas com Modificadores:**
- Letras: `a`, `c`, `v`, `x`, `z`, `y`
- Máximo de 5 teclas por combinação

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "combination": ["ctrl", "c"],
    "executed": true
  }
}
```

### 2. Operações de Mouse

#### 2.1 Mover Mouse

Move o cursor para coordenadas específicas.

**Endpoint:** `POST /api/v1/mouse/move`

**Body:**
```json
{
  "x": 500,
  "y": 300,
  "smooth": true,      // Opcional: movimento suave
  "duration": 1000     // Opcional: duração em ms
}
```

**Parâmetros:**
- `x`, `y`: Coordenadas de destino (obrigatórias)
- `smooth`: Ativa movimento suave (padrão: configurável)
- `duration`: Tempo para completar o movimento (100-5000ms)

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "position": {
      "x": 500,
      "y": 300
    },
    "smooth": true,
    "duration": 1000
  }
}
```

#### 2.2 Clicar com Mouse

Realiza clique em posição específica ou atual.

**Endpoint:** `POST /api/v1/mouse/click`

**Body:**
```json
{
  "x": 500,              // Opcional: usa posição atual se omitido
  "y": 300,              // Opcional: usa posição atual se omitido
  "button": "left",      // Opcional: left, right, middle
  "doubleClick": false,  // Opcional: clique duplo
  "smooth": false,       // Opcional: mover suavemente antes de clicar
  "duration": 500        // Opcional: duração do movimento
}
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "button": "left",
    "position": {
      "x": 500,
      "y": 300
    },
    "doubleClick": false
  }
}
```

#### 2.3 Arrastar Mouse

Arrasta de um ponto a outro.

**Endpoint:** `POST /api/v1/mouse/drag`

**Body:**
```json
{
  "from": {
    "x": 100,
    "y": 100
  },
  "to": {
    "x": 500,
    "y": 500
  },
  "duration": 2000,    // Opcional: duração em ms
  "smooth": true       // Opcional: movimento suave
}
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "from": {"x": 100, "y": 100},
    "to": {"x": 500, "y": 500},
    "duration": 2000,
    "smooth": true
  }
}
```

#### 2.4 Rolar Tela

Realiza scroll na tela.

**Endpoint:** `POST /api/v1/mouse/scroll`

**Body:**
```json
{
  "direction": "down",   // Obrigatório: up ou down
  "amount": 5,          // Opcional: quantidade (1-10)
  "smooth": true,       // Opcional: rolagem suave
  "duration": 500       // Opcional: duração em ms
}
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "direction": "down",
    "amount": 5,
    "smooth": true
  }
}
```

#### 2.5 Obter Posição do Mouse

Retorna a posição atual do cursor.

**Endpoint:** `GET /api/v1/mouse/position`

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "x": 742,
    "y": 419
  }
}
```

#### 2.6 Stream de Posição do Mouse

Retorna stream contínuo da posição do mouse via SSE.

**Endpoint:** `GET /api/v1/mouse/position/stream`

**Headers Obrigatórios:**
```http
x-api-key: your-api-key-here
Accept: text/event-stream
```

**Query Parameters:**
- `interval`: Intervalo entre atualizações em ms (padrão: 100)

**Formato da Resposta (SSE):**
```
data: {"x":742,"y":419,"timestamp":1703123456789}

data: {"x":745,"y":420,"timestamp":1703123456889}
```

**Exemplo cURL:**
```bash
curl -H "x-api-key: your-api-key" \
     -H "Accept: text/event-stream" \
     http://localhost:3000/api/v1/mouse/position/stream?interval=50
```

### 3. Operações de Tela

#### 3.1 Buscar Imagem na Tela

Procura uma imagem template na tela.

**Endpoint:** `POST /api/v1/screen/find`

**Body:**
```json
{
  "template": "base64_encoded_image_or_path",
  "confidence": 0.9,    // Opcional: nível de confiança (0-1)
  "region": {          // Opcional: região de busca
    "x": 0,
    "y": 0,
    "width": 1920,
    "height": 1080
  }
}
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "found": true,
    "location": {
      "x": 150,
      "y": 200,
      "width": 100,
      "height": 50
    },
    "confidence": 0.95
  }
}
```

**Resposta quando não encontrado:**
```json
{
  "success": true,
  "data": {
    "found": false,
    "location": null,
    "confidence": 0
  }
}
```

#### 3.2 Capturar Tela

Captura screenshot da tela ou região específica.

**Endpoint:** `POST /api/v1/screen/capture`

**Body:**
```json
{
  "region": {          // Opcional: captura tela inteira se omitido
    "x": 100,
    "y": 100,
    "width": 800,
    "height": 600
  },
  "format": "png"      // Opcional: png ou jpg
}
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "image": "data:image/png;base64,iVBORw0KGgoAAAANS...",
    "dimensions": {
      "width": 800,
      "height": 600
    },
    "format": "png"
  }
}
```

### 4. Operações de Área de Transferência

#### 4.1 Copiar para Área de Transferência

Copia conteúdo para a área de transferência.

**Endpoint:** `POST /api/v1/clipboard/copy`

**Body:**
```json
{
  "content": "Texto para copiar"
}
```

**Limites:**
- Tamanho máximo: 1MB

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "copied": true,
    "length": 17
  }
}
```

#### 4.2 Colar da Área de Transferência

Obtém o conteúdo atual da área de transferência.

**Endpoint:** `GET /api/v1/clipboard/paste`

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "content": "Conteúdo da área de transferência",
    "type": "text"
  }
}
```

#### 4.3 Limpar Área de Transferência

Limpa o conteúdo da área de transferência.

**Endpoint:** `POST /api/v1/clipboard/clear`

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "cleared": true
  }
}
```

### 5. Integração com LLM

#### 5.1 Gerar Completação

Gera texto usando modelos de linguagem com suporte a saída estruturada.

**Endpoint:** `POST /api/v1/llm`

**Headers Obrigatórios:**
```http
Content-Type: application/json
x-api-key: your-api-key-here
```

**Body:**
```json
{
  "prompt": "Explique o que é machine learning",
  "model": "gpt-4",
  "temperature": 0.7,        // Opcional: 0-2 (padrão: 0.7)
  "maxTokens": 1000,         // Opcional: 1-4096 (padrão: 1000)
  "systemPrompt": "Você é um assistente útil", // Opcional
  "outputFormat": {          // Opcional: para saída estruturada
    "type": "object",
    "properties": {
      "explanation": {
        "type": "string",
        "description": "Explicação do conceito"
      },
      "examples": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    },
    "required": ["explanation", "examples"]
  }
}
```

**Modelos Suportados:**

| Modelo | Provedor | Descrição | Suporta Tools |
|--------|----------|-----------|---------------|
| `o3` | OpenAI | Modelo mais avançado | Sim |
| `gpt-4.1` | OpenAI | GPT-4 Turbo | Sim |
| `gpt-4.1-mini` | OpenAI | Versão otimizada | Sim |
| `deepseek-chat` | DeepSeek | DeepSeek V3 | Sim |
| `deepseek-reasoner` | DeepSeek | DeepSeek R1 (raciocínio) | Não |
| `deepseek-coder` | DeepSeek | Alias para V3 | Sim |

**Resposta de Sucesso (Texto):**
```json
{
  "success": true,
  "data": {
    "completion": "Machine learning é um subcampo da inteligência artificial...",
    "model": "gpt-4",
    "usage": {
      "promptTokens": 15,
      "completionTokens": 150,
      "totalTokens": 165
    }
  }
}
```

**Resposta de Sucesso (Estruturada):**
```json
{
  "success": true,
  "data": {
    "completion": {
      "explanation": "Machine learning é um subcampo da IA...",
      "examples": [
        "Reconhecimento de imagens",
        "Processamento de linguagem natural",
        "Sistemas de recomendação"
      ]
    },
    "model": "gpt-4",
    "usage": {
      "promptTokens": 15,
      "completionTokens": 150,
      "totalTokens": 165
    }
  }
}
```

### 6. Streaming de Eventos

#### 6.1 Stream de Eventos de Entrada

Retorna stream em tempo real de eventos de teclado e mouse.

**Endpoint:** `GET /api/v1/stream/input-events`

**Headers:**
```http
Accept: text/event-stream
Last-Event-ID: 123456  // Opcional: para recuperar eventos perdidos
```

**Formato dos Eventos (SSE):**
```
id: 1703123456789
event: input
data: {"type":"keydown","key":"a","timestamp":1703123456789}

id: 1703123456889
event: input
data: {"type":"mousemove","x":500,"y":300,"timestamp":1703123456889}

id: 1703123456989
event: heartbeat
data: {"timestamp":1703123456989}
```

**Tipos de Eventos:**
- `keydown`: Tecla pressionada
- `keyup`: Tecla liberada
- `mousedown`: Botão do mouse pressionado
- `mouseup`: Botão do mouse liberado
- `mousemove`: Movimento do mouse
- `wheel`: Scroll do mouse
- `heartbeat`: Sinal de vida (a cada 30s por padrão)

#### 6.2 Estatísticas do Sistema de Eventos

Retorna estatísticas sobre o buffer de eventos.

**Endpoint:** `GET /api/v1/stream/input-events/stats`

**Resposta:**
```json
{
  "success": true,
  "data": {
    "bufferSize": 1000,
    "currentSize": 245,
    "oldestEventAge": 45000,
    "newestEventAge": 100,
    "eventRate": 15.5,
    "droppedEvents": 0,
    "listeners": 3
  }
}
```

#### 6.3 Limpar Buffer de Eventos

Remove todos os eventos do buffer.

**Endpoint:** `POST /api/v1/stream/input-events/clear`

**Resposta:**
```json
{
  "success": true,
  "data": {
    "cleared": true,
    "eventsRemoved": 245
  }
}
```

#### 6.4 Remover Eventos Antigos

Remove eventos mais antigos que o tempo especificado.

**Endpoint:** `POST /api/v1/stream/input-events/prune`

**Body:**
```json
{
  "maxAgeMs": 60000  // Remove eventos mais antigos que 1 minuto
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "pruned": true,
    "eventsRemoved": 123,
    "remainingEvents": 122
  }
}
```

### 7. Health Check

Verifica o status da API.

**Endpoint:** `GET /health`

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-10T10:30:00.000Z",
  "uptime": 3600000,
  "environment": "production",
  "version": "1.0.0"
}
```

## Configurações Avançadas

### Rate Limiting

A API implementa rate limiting para proteger contra sobrecarga:

- **Eventos de Entrada**: Máximo 5000 eventos/segundo (configurável via `INPUT_EVENT_RATE`)
- **Requisições HTTP**: Sem limite global, mas endpoints individuais podem ter limites

### Buffers e Timeouts

| Configuração | Padrão | Descrição |
|--------------|--------|-----------|
| Buffer de Eventos | 1000 | Número máximo de eventos mantidos |
| Timeout de Parsing | 500ms | Tempo máximo para processar schemas |
| Heartbeat | 30s | Intervalo para sinal de vida em streams |
| Max Event Age | 5min | Idade máxima de eventos no buffer |

### Limites de Validação

| Recurso | Limite | Configuração |
|---------|--------|--------------|
| Texto do Teclado | 10.000 caracteres | `KEYBOARD_MAX_TEXT_LENGTH` |
| Delay Máximo | 5 minutos | `KEYBOARD_MAX_DELAY` |
| Conteúdo Clipboard | 1MB | Fixo |
| Tamanho do Schema | 10KB | `OUTPUT_SCHEMA_MAX_SIZE` |
| Profundidade Schema | 5 níveis | `OUTPUT_SCHEMA_MAX_DEPTH` |
| Combinação de Teclas | 5 teclas | Fixo |

### Performance e Otimização

#### Mouse
- Taxa de amostragem para movimento suave: 30 FPS
- Intervalo de streaming de posição: 100ms (configurável)
- Duração mínima de movimento: 100ms
- Duração máxima de movimento: 5000ms

#### Teclado
- Processamento em lotes: 50 caracteres por vez
- Modos otimizados para diferentes casos de uso
- Suporte a delays customizados

#### Streaming
- Compressão automática para grandes volumes
- Recuperação de eventos perdidos via Last-Event-ID
- Limpeza automática de eventos antigos

## Exemplos de Uso

### Exemplo Completo: Automação de Formulário

```bash
# 1. Mover para campo de email
curl -X POST http://localhost:3000/api/v1/mouse/click \
  -H "Content-Type: application/json" \
  -d '{"x": 500, "y": 300}'

# 2. Digitar email
curl -X POST http://localhost:3000/api/v1/keyboard/type \
  -H "Content-Type: application/json" \
  -d '{"text": "usuario@example.com", "mode": "perChar", "value": 50}'

# 3. Tab para próximo campo
curl -X POST http://localhost:3000/api/v1/keyboard/press \
  -H "Content-Type: application/json" \
  -d '{"key": "tab"}'

# 4. Digitar senha
curl -X POST http://localhost:3000/api/v1/keyboard/type \
  -H "Content-Type: application/json" \
  -d '{"text": "senha123", "mode": "instant"}'

# 5. Submeter formulário
curl -X POST http://localhost:3000/api/v1/keyboard/press \
  -H "Content-Type: application/json" \
  -d '{"key": "enter"}'
```

### Exemplo: Captura e Análise com IA

```bash
# 1. Capturar tela
SCREENSHOT=$(curl -X POST http://localhost:3000/api/v1/screen/capture \
  -H "Content-Type: application/json" \
  -d '{"region": {"x": 0, "y": 0, "width": 1920, "height": 1080}}' \
  | jq -r '.data.image')

# 2. Analisar com LLM
curl -X POST http://localhost:3000/api/v1/llm \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d "{
    \"prompt\": \"Analise esta imagem e descreva o que você vê: $SCREENSHOT\",
    \"model\": \"gpt-4\",
    \"outputFormat\": {
      \"type\": \"object\",
      \"properties\": {
        \"description\": {\"type\": \"string\"},
        \"elements\": {
          \"type\": \"array\",
          \"items\": {\"type\": \"string\"}
        }
      },
      \"required\": [\"description\", \"elements\"]
    }
  }"
```

### Exemplo: Monitoramento de Eventos

```javascript
// Cliente JavaScript para SSE
const eventSource = new EventSource(
  'http://localhost:3000/api/v1/stream/input-events',
  {
    headers: {
      'Last-Event-ID': localStorage.getItem('lastEventId')
    }
  }
);

eventSource.addEventListener('input', (event) => {
  const data = JSON.parse(event.data);
  console.log(`Evento ${data.type}:`, data);
  localStorage.setItem('lastEventId', event.lastEventId);
});

eventSource.addEventListener('heartbeat', (event) => {
  console.log('Heartbeat recebido');
});

eventSource.onerror = (error) => {
  console.error('Erro na conexão:', error);
};
```

## Limites e Restrições

### Limites do Sistema

1. **Taxa de Eventos**: Máximo 5000 eventos por segundo
2. **Tamanho do Buffer**: 1000 eventos simultâneos
3. **Conexões SSE**: Limitado pela memória disponível
4. **Tempo de Resposta**: Operações devem responder em < 5s

### Restrições de Plataforma

#### macOS
- Requer permissões de Acessibilidade
- Solicitar em: Preferências do Sistema > Segurança e Privacidade > Acessibilidade

#### Linux
- Requer variável DISPLAY configurada
- Pode necessitar de `xhost +` para acesso ao X11

#### Windows
- Pode requerer execução como Administrador para algumas operações
- Compatibilidade com diferentes versões pode variar

### Limitações de Segurança

1. **Clipboard**: Conteúdo limitado a 1MB por segurança
2. **Texto**: Máximo 10.000 caracteres por operação
3. **Combinações**: Máximo 5 teclas simultâneas
4. **Rate Limiting**: Proteção contra flood de requisições

## Troubleshooting

### Problemas Comuns

#### Erro: "Accessibility permissions required"
**Solução**: No macOS, adicione a aplicação às permissões de Acessibilidade.

#### Erro: "DISPLAY not set"
**Solução**: No Linux, exporte a variável DISPLAY:
```bash
export DISPLAY=:0
```

#### Erro: "Rate limit exceeded"
**Solução**: Reduza a frequência de requisições ou ajuste `INPUT_EVENT_RATE`.

#### Erro: "Schema too large"
**Solução**: Simplifique o schema ou aumente `OUTPUT_SCHEMA_MAX_SIZE`.

### Logs e Debug

Habilite logs detalhados configurando:
```env
LOG_LEVEL=debug
KEYBOARD_DEBUG=true
INPUT_EVENT_DEBUG=true
OUTPUT_SCHEMA_DEBUG=true
```

Logs são salvos em `logs/` com rotação automática.

### Verificação de Saúde

Use o endpoint `/health` para verificar:
- Status do servidor
- Tempo de atividade
- Ambiente atual
- Versão da API

### Suporte

Para problemas não cobertos nesta documentação:
1. Verifique os logs em `logs/error.log`
2. Consulte os testes em `tests/` para exemplos
3. Abra uma issue no repositório do projeto

---

## Changelog

### v1.0.0
- Lançamento inicial
- Suporte completo para automação de mouse e teclado
- Integração com OpenAI e DeepSeek
- Streaming de eventos em tempo real
- Captura e busca de imagens na tela