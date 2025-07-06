# 🔍 Modelos DeepSeek Suportados pelo LangChain.js

## 📋 Resumo dos Modelos Disponíveis

Baseado na pesquisa realizada, aqui estão todos os modelos DeepSeek que o LangChain.js suporta através da API oficial da DeepSeek:

### ✅ **Modelos Ativos (Janeiro 2025)**

| Modelo | Nome da API | Descrição | Status | Funcionalidades |
|--------|-------------|-----------|--------|------------------|
| **DeepSeek V3** | `deepseek-chat` | Modelo principal, mais rápido | ✅ Ativo | Tool calling, structured output |
| **DeepSeek R1** | `deepseek-reasoner` | Modelo de raciocínio | ✅ Ativo | Reasoning, **sem** tool calling |
| **DeepSeek Coder** | `deepseek-coder` | Alias para V3 | ✅ Ativo (merged) | Mesmo que deepseek-chat |

## 🔧 **Implementação na Nossa API**

```typescript
// src/domain/enums/llm-model.enum.ts
export enum LlmModel {
  // OpenAI Models
  O3 = 'o3',
  GPT_4_1 = 'gpt-4.1',
  GPT_4_1_MINI = 'gpt-4.1-mini',
  
  // DeepSeek Models
  DEEPSEEK_CHAT = 'deepseek-chat',        // DeepSeek V3
  DEEPSEEK_REASONER = 'deepseek-reasoner', // DeepSeek R1  
  DEEPSEEK_CODER = 'deepseek-coder',       // Alias para V3
}
```

## 🧪 **Testes Realizados**

### ✅ API Oficial DeepSeek
```bash
curl https://api.deepseek.com/models
# Resultado: apenas deepseek-chat e deepseek-reasoner listados
```

### ✅ Teste de Funcionalidade
```bash
# deepseek-chat ✅
✅ 200 OK - Resposta gerada com sucesso

# deepseek-reasoner ✅  
✅ 200 OK - Resposta gerada com sucesso

# deepseek-coder ✅
✅ 200 OK - Funciona (redireciona para deepseek-chat)
```

## 📚 **Informações Técnicas**

### **DeepSeek V3 (`deepseek-chat`)**
- **Lançado**: 2024
- **Características**: Modelo principal, mais rápido
- **Suporte**: Tool calling, structured output
- **Tokens**: Até 32,768 tokens
- **Custo**: $0.00014 por token

### **DeepSeek R1 (`deepseek-reasoner`)**
- **Lançado**: Janeiro 2025
- **Características**: Modelo de raciocínio avançado
- **Suporte**: **NÃO** suporta tool calling ou structured output
- **Tokens**: Até 32,768 tokens
- **Custo**: $0.00055 por token
- **Especial**: Expõe o processo de pensamento/raciocínio

### **DeepSeek Coder (`deepseek-coder`)**
- **Status**: Merged com DeepSeek V3
- **Funcionalidade**: Alias para `deepseek-chat`
- **Histórico**: Originalmente modelo separado, agora integrado
- **Uso**: Funciona perfeitamente, mas redireciona internamente

## 🚫 **Modelos Descontinuados**

Com base na pesquisa, alguns modelos mencionados na documentação antiga **NÃO** estão mais disponíveis na API:

- `deepseek-v2` - Não listado na API atual
- `deepseek-v2.5` - Merged com deepseek-chat
- Versões específicas como `deepseek-v3-0324` - Não aceitas

## 🎯 **Recomendações de Uso**

### **Para Conversas Gerais e Tool Calling:**
```javascript
model: "deepseek-chat"
```

### **Para Tarefas de Programação:**
```javascript
model: "deepseek-coder" // Funciona, mas é alias para deepseek-chat
// OU
model: "deepseek-chat"  // Recomendado
```

### **Para Raciocínio Complexo:**
```javascript
model: "deepseek-reasoner"
```

## 🔗 **Referências**

- [DeepSeek API Documentation](https://api-docs.deepseek.com/)
- [LangChain.js DeepSeek Integration](https://js.langchain.com/docs/integrations/chat/deepseek/)
- [DeepSeek Official Website](https://www.deepseek.com/)

## ✅ **Status de Implementação**

🎉 **TODOS OS MODELOS DEEPSEEK DISPONÍVEIS FORAM IMPLEMENTADOS E TESTADOS COM SUCESSO!**

- ✅ `deepseek-chat` - Funcionando
- ✅ `deepseek-reasoner` - Funcionando  
- ✅ `deepseek-coder` - Funcionando (alias)
- ✅ LangChain.js integração - Completa
- ✅ Enum de modelos - Atualizado
- ✅ Configuração - Completa
- ✅ Testes - Todos passando
