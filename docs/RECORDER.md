# Recorder API

O endpoint Recorder permite capturar e transmitir em tempo real eventos de mouse e teclado via Server-Sent Events (SSE).

## Características

- 🖱️ Captura eventos de mouse (clique, arrasto, movimento)
- ⌨️ Captura eventos de teclado (tecla pressionada/solta)
- 📸 Screenshot automático em cliques do mouse
- 🔄 Streaming em tempo real via SSE
- ⚡ Throttling configurável para eventos de movimento

## Endpoints

### GET /api/v1/recorder/stream

Inicia um stream SSE que transmite eventos gravados.

**Headers necessários:**
- `x-api-key`: Chave de autenticação

**Eventos retornados:**

#### Evento: `connected`
Enviado quando a conexão é estabelecida.

```json
{
  "connectionId": "rec_1234567890_abc123",
  "config": {
    "includeScreenshot": true,
    "moveIntervalMs": 50
  }
}
```

#### Evento: `recorded`
Enviado para cada ação capturada.

**Mouse Down/Up:**
```json
{
  "id": "unique-event-id",
  "timestamp": 1234567890123,
  "type": "mouse",
  "action": "down", // ou "up"
  "x": 100,
  "y": 200,
  "button": "left", // "left", "right" ou "middle"
  "screenshot": "base64..." // apenas em "down"
}
```

**Mouse Move (durante drag):**
```json
{
  "id": "unique-event-id",
  "timestamp": 1234567890123,
  "type": "mouse",
  "action": "move",
  "x": 150,
  "y": 250
}
```

**Keyboard:**
```json
{
  "id": "unique-event-id",
  "timestamp": 1234567890123,
  "type": "keyboard",
  "action": "down", // ou "up"
  "key": "a"
}
```

### GET /api/v1/recorder/stats

Retorna estatísticas do sistema de gravação.

**Response:**
```json
{
  "success": true,
  "data": {
    "activeConnections": 2,
    "config": {
      "includeScreenshot": true,
      "moveIntervalMs": 50,
      "maxScreenshotSize": 2097152
    },
    "timestamp": 1234567890123
  }
}
```

## Configuração

As seguintes variáveis de ambiente controlam o comportamento do recorder:

- `RECORDER_INCLUDE_SCREENSHOT`: Incluir screenshots em cliques (default: true)
- `RECORDER_MOVE_INTERVAL_MS`: Intervalo mínimo entre eventos de movimento em ms (default: 50, range: 20-200)
- `RECORDER_MAX_SCREENSHOT_SIZE`: Tamanho máximo do screenshot em bytes (default: 2097152, range: 10KB-10MB)

## Exemplo de Uso

### JavaScript/Node.js

```javascript
const EventSource = require('eventsource');

const eventSource = new EventSource('http://localhost:3000/api/v1/recorder/stream', {
  headers: {
    'x-api-key': 'your-api-key'
  }
});

eventSource.addEventListener('recorded', (event) => {
  const data = JSON.parse(event.data);
  console.log('Evento capturado:', data);
});
```

### Python

```python
import sseclient
import requests
import json

url = 'http://localhost:3000/api/v1/recorder/stream'
headers = {'x-api-key': 'your-api-key'}

response = requests.get(url, headers=headers, stream=True)
client = sseclient.SSEClient(response)

for event in client.events():
    if event.event == 'recorded':
        data = json.loads(event.data)
        print(f"Evento capturado: {data}")
```

## Notas Importantes

1. **Screenshots**: São capturados apenas em eventos de "mouse down" para evitar overhead
2. **Movimento durante drag**: Eventos de movimento só são enviados enquanto um botão está pressionado
3. **Throttling**: Movimentos são limitados pelo `RECORDER_MOVE_INTERVAL_MS` para evitar spam
4. **Formato de imagem**: Screenshots são sempre retornados em formato PNG base64
5. **Reconexão**: Use o header `Last-Event-ID` para recuperar eventos perdidos após reconexão