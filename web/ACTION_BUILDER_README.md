# ActionBuilder - Construtor de Sequências de Automação

## Visão Geral

O ActionBuilder é um componente React que permite criar sequências de automação de mouse e teclado de forma visual e intuitiva. Ele se integra perfeitamente com a API de automação do NutJS.

## Instalação

Antes de usar o ActionBuilder, instale as dependências necessárias:

```bash
cd web
./install-action-builder-deps.sh
# ou manualmente:
npm install --save nanoid react-bootstrap-icons
```

## Uso Básico

### 1. Importar o componente

```typescript
import { ActionBuilder } from './components';
// ou
import ActionBuilder from './components/ActionBuilder';
```

### 2. Usar em sua aplicação

```tsx
function App() {
  const handleActionsChange = (actions) => {
    console.log('Ações atualizadas:', actions);
  };

  return (
    <ActionBuilder 
      onChange={handleActionsChange}
      maxActions={50}
    />
  );
}
```

### 3. Integração com PrintScreenButton

Use o `AutomationPanel` para ter ambos os componentes juntos:

```tsx
import { AutomationPanel } from './components';

function App() {
  return <AutomationPanel onActionsChange={handleActionsChange} />;
}
```

Ou use a página completa de exemplo:

```tsx
import AutomationPage from './pages/AutomationPage';

function App() {
  return <AutomationPage />;
}
```

## Ações Disponíveis

### Mouse

1. **Mover** - Move o cursor para coordenadas específicas
   - Parâmetros: x, y, smooth, duration

2. **Clicar** - Clica em uma posição ou na posição atual
   - Parâmetros: x (opcional), y (opcional), button, doubleClick, smooth, duration

3. **Arrastar** - Arrasta de um ponto a outro
   - Parâmetros: from (x,y), to (x,y), smooth, duration

4. **Rolar** - Rola a tela para cima ou baixo
   - Parâmetros: direction, amount, smooth, duration

### Teclado

1. **Digitar Texto** - Digite um texto com controle de velocidade
   - Parâmetros: text, mode (instant/perChar/total), value (delay)

2. **Pressionar Tecla** - Pressiona uma tecla específica
   - Parâmetros: key (enter, tab, escape, f1-f12, etc.)

3. **Combinação de Teclas** - Executa atalhos como Ctrl+C
   - Parâmetros: keys[] (array de teclas)

## Estrutura de Dados

Cada ação tem a seguinte estrutura:

```typescript
interface AutomationAction {
  id: string;              // ID único gerado automaticamente
  device: 'mouse' | 'keyboard';
  timestamp: number;       // Timestamp de criação
  payload: MousePayload | KeyboardPayload;
}
```

## Validações

O componente implementa validações rigorosas:

- **Texto**: Máximo 10.000 caracteres, remove caracteres de controle
- **Delays**: Máximo 300.000ms (5 minutos)
- **Duração do mouse**: Entre 100ms e 5.000ms
- **Scroll**: Amount entre 1 e 10
- **Combinações**: Máximo 5 teclas

## Eventos e Callbacks

### onChange
Chamado sempre que a lista de ações é modificada:

```typescript
onChange?: (actions: AutomationAction[]) => void;
```

## Persistência

O exemplo em `AutomationPage` inclui:

- **Salvar Rascunho**: Salva no localStorage
- **Exportar JSON**: Baixa as ações como arquivo JSON
- **Executar Sequência**: Placeholder para execução via API

## Customização

### Props do ActionBuilder

```typescript
interface ActionBuilderProps {
  onChange?: (actions: AutomationAction[]) => void;
  initialActions?: AutomationAction[];  // Ações iniciais
  maxActions?: number;                  // Limite de ações (padrão: 100)
  className?: string;                   // Classes CSS adicionais
}
```

## Exemplo Completo

```tsx
import React, { useState } from 'react';
import { ActionBuilder } from './components';

function MyAutomation() {
  const [actions, setActions] = useState([]);

  const executeActions = async () => {
    for (const action of actions) {
      if (action.device === 'mouse') {
        const endpoint = `/api/v1/mouse/${action.payload.type}`;
        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.REACT_APP_API_KEY
          },
          body: JSON.stringify(action.payload.data)
        });
      }
      // Similar para teclado...
    }
  };

  return (
    <div>
      <ActionBuilder onChange={setActions} />
      <button onClick={executeActions}>
        Executar {actions.length} ações
      </button>
    </div>
  );
}
```

## Arquitetura

```
components/
  ├── ActionBuilder.tsx      # Componente principal com useReducer
  ├── ActionForm.tsx        # Formulário dinâmico para adicionar ações
  ├── ActionTable.tsx       # Tabela para visualizar/remover ações
  └── AutomationPanel.tsx   # Integração com PrintScreenButton
  
types/
  └── automation-builder.types.ts  # Tipos TypeScript completos

pages/
  └── AutomationPage.tsx    # Página de exemplo completa
```

## Próximos Passos

1. Implemente a execução real das ações via API
2. Adicione validação em tempo real com Zod
3. Implemente drag-and-drop para reordenar ações
4. Adicione suporte para loops e condicionais
5. Crie templates de ações comuns
6. Implemente importação de arquivos JSON

## Troubleshooting

### Erro "Cannot find module 'nanoid'"
Execute o script de instalação ou instale manualmente:
```bash
npm install --save nanoid react-bootstrap-icons
```

### Ações não aparecem na tabela
Verifique se o callback `onChange` está sendo passado corretamente.

### Limite de ações atingido
Ajuste a prop `maxActions` ou remova ações antigas.

## Contribuindo

Para adicionar novas ações:

1. Atualize os tipos em `automation-builder.types.ts`
2. Adicione os campos no `ActionForm.tsx`
3. Implemente a formatação em `ActionTable.tsx`
4. Adicione a validação correspondente