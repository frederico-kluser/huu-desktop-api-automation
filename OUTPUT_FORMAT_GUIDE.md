# Custom Output Format Guide

Esta documentação explica como usar o parâmetro `outputFormat` na API LLM para personalizar a estrutura de resposta retornada pelo endpoint `/llm`.

## Visão Geral

Por padrão, o endpoint `/llm` retorna apenas o texto gerado pelo modelo de linguagem no campo `data` como string. Com o `outputFormat`, você pode especificar uma estrutura JSON personalizada que o modelo deve seguir, permitindo respostas estruturadas e tipadas.

## Comportamento Padrão vs Personalizado

### Sem outputFormat (padrão)
```json
{
  "success": true,
  "data": "Esta é a resposta do modelo como string simples.",
  "metadata": {
    "model": "gpt-4",
    "finishReason": "stop",
    "tokensUsed": 42
  }
}
```

### Com outputFormat
```json
{
  "success": true,
  "data": {
    "summary": "Resumo estruturado do conteúdo",
    "score": 85,
    "tags": ["importante", "urgente"]
  },
  "metadata": {
    "model": "gpt-4",
    "finishReason": "stop",
    "tokensUsed": 67
  }
}
```

## Estrutura do outputFormat

O `outputFormat` utiliza uma sintaxe baseada em JSON Schema para definir a estrutura desejada:

```json
{
  "type": "object|array|string|number|boolean",
  "properties": {
    "campo1": { "type": "string" },
    "campo2": { "type": "number" }
  },
  "required": ["campo1"],
  "additionalProperties": false,
  "description": "Descrição opcional do schema"
}
```

### Campos Disponíveis

- **type** (obrigatório): Tipo principal do retorno
- **properties**: Para type="object", define as propriedades do objeto
- **items**: Para type="array", define o tipo dos elementos
- **required**: Lista de campos obrigatórios
- **additionalProperties**: Se permite campos extras (padrão: true)
- **description**: Descrição opcional para o modelo

## Exemplos Práticos

### 1. Objeto Simples
```json
{
  "prompt": "Analise este texto e extraia informações importantes",
  "model": "gpt-4o-mini",
  "outputFormat": {
    "type": "object",
    "properties": {
      "topic": { "type": "string" },
      "sentiment": { "type": "string" },
      "confidence": { "type": "number" }
    },
    "required": ["topic", "sentiment"]
  }
}
```

### 2. Array de Objetos
```json
{
  "prompt": "Liste 3 vantagens e desvantagens do trabalho remoto",
  "model": "gpt-4",
  "outputFormat": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "type": { "type": "string" },
        "description": { "type": "string" },
        "impact": { "type": "number" }
      }
    }
  }
}
```

### 3. Número Simples
```json
{
  "prompt": "Em uma escala de 1 a 10, qual a qualidade deste código?",
  "model": "gpt-3.5-turbo",
  "outputFormat": {
    "type": "number",
    "description": "Score de qualidade de 1 a 10"
  }
}
```

### 4. Estrutura Complexa
```json
{
  "prompt": "Crie um plano de estudos para aprender JavaScript",
  "model": "gpt-4",
  "outputFormat": {
    "type": "object",
    "properties": {
      "title": { "type": "string" },
      "duration_weeks": { "type": "number" },
      "modules": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "topics": {
              "type": "array",
              "items": { "type": "string" }
            },
            "estimated_hours": { "type": "number" }
          }
        }
      },
      "prerequisites": {
        "type": "array",
        "items": { "type": "string" }
      }
    },
    "required": ["title", "duration_weeks", "modules"]
  }
}
```

## Limitações e Validações

### Limites Técnicos
- **Tamanho máximo do schema**: 10KB (configurable via `OUTPUT_SCHEMA_MAX_SIZE`)
- **Profundidade máxima**: 5 níveis de aninhamento (configurable via `OUTPUT_SCHEMA_MAX_DEPTH`)
- **Timeout de parsing**: 500ms (configurable via `OUTPUT_SCHEMA_PARSE_TIMEOUT`)

### Tipos Suportados
- `string`: Texto simples
- `number`: Números inteiros ou decimais
- `boolean`: true/false
- `object`: Objetos JSON
- `array`: Arrays de qualquer tipo suportado

### Comportamento de Fallback
Se o modelo retornar JSON inválido ou que não conforme com o schema:
- **Modo string** (padrão): Retorna o texto bruto como string
- **Modo strict**: Retorna erro 422 com detalhes da validação

## Códigos de Erro

| Código | Status | Descrição |
|--------|--------|-----------|
| `SCHEMA_TOO_LARGE` | 413 | Schema excede tamanho máximo |
| `UNSUPPORTED_FORMAT` | 400 | Tipo não suportado no schema |
| `INVALID_JSON_OUTPUT` | 422 | LLM retornou JSON inválido |
| `OUTPUT_PARSING_ERROR` | 422 | JSON não conforme com schema |
| `VALIDATION_ERROR` | 400 | Erro na validação da requisição |

## Configuração de Ambiente

Variáveis de ambiente disponíveis para configurar o comportamento:

```bash
# Tamanho máximo do schema em bytes (padrão: 10240)
OUTPUT_SCHEMA_MAX_SIZE=10240

# Profundidade máxima de aninhamento (padrão: 5)
OUTPUT_SCHEMA_MAX_DEPTH=5

# Timeout para parsing em ms (padrão: 500)
OUTPUT_SCHEMA_PARSE_TIMEOUT=500

# Modo padrão quando outputFormat não especificado (padrão: string)
OUTPUT_SCHEMA_DEFAULT_MODE=string

# Habilita cache de schemas compilados (padrão: true)
OUTPUT_SCHEMA_ENABLE_CACHE=true

# TTL do cache em minutos (padrão: 10)
OUTPUT_SCHEMA_CACHE_TTL=10

# Habilita logs de debug (padrão: false em prod)
OUTPUT_SCHEMA_DEBUG=false
```

## Dicas de Boas Práticas

### 1. Seja Específico no Prompt
```json
{
  "prompt": "Analise o sentimento do texto a seguir e retorne EXATAMENTE no formato JSON especificado: [texto]",
  "outputFormat": {
    "type": "object",
    "properties": {
      "sentiment": { "type": "string" },
      "confidence": { "type": "number" }
    }
  }
}
```

### 2. Use Descrições Claras
```json
{
  "outputFormat": {
    "type": "object",
    "properties": {
      "score": { 
        "type": "number",
        "description": "Score de 0 a 100" 
      }
    },
    "description": "Avaliação quantitativa do conteúdo"
  }
}
```

### 3. Defina Campos Obrigatórios
```json
{
  "outputFormat": {
    "type": "object",
    "properties": {
      "title": { "type": "string" },
      "optional_field": { "type": "string" }
    },
    "required": ["title"]
  }
}
```

### 4. Use additionalProperties Adequadamente
```json
{
  "outputFormat": {
    "type": "object",
    "properties": {
      "name": { "type": "string" }
    },
    "additionalProperties": false  // Bloqueia campos extras
  }
}
```

## Monitoramento e Debug

### Logs de Performance
Com `OUTPUT_SCHEMA_DEBUG=true`, você verá logs detalhados:

```
[INFO] Output parsing successful: processingTime=45ms, schemaType=object, cacheHit=true
[WARN] Output parsing exceeded timeout: processingTime=650ms, timeout=500ms
[ERROR] Output parsing failed: error="Invalid JSON", schemaType=object
```

### Métricas Disponíveis
- Tempo de parsing por requisição
- Taxa de cache hit/miss
- Frequência de erros de validação
- Tipos de schema mais utilizados

## Integração com Automação

O `outputFormat` é especialmente útil para integrar com outras funcionalidades da API:

```json
{
  "prompt": "Analise esta tela e determine as próximas ações do mouse",
  "model": "gpt-4o",
  "outputFormat": {
    "type": "object",
    "properties": {
      "action": { "type": "string" },
      "coordinates": {
        "type": "object",
        "properties": {
          "x": { "type": "number" },
          "y": { "type": "number" }
        }
      },
      "confidence": { "type": "number" }
    }
  }
}
```

Esta resposta estruturada pode ser consumida diretamente pelos endpoints de automação de mouse da API.

## Suporte e Contribuições

Para reportar problemas ou sugerir melhorias no sistema de output format:

1. Verifique os logs de debug
2. Teste com schemas mais simples
3. Consulte os códigos de erro
4. Abra uma issue com exemplo completo

O sistema de output format foi projetado para ser extensível, permitindo futuras integrações com outros engines de validação além do Zod.
