/**
 * Exemplo de cliente ESM para o endpoint recorder
 * Conecta ao stream SSE e exibe eventos gravados
 */

import EventSource from 'eventsource';

const API_URL = 'http://localhost:3000';
const API_KEY = process.env.API_KEY || 'test-key';

// Criar conexão SSE
const eventSource = new EventSource(`${API_URL}/api/v1/recorder/stream`, {
  headers: {
    'x-api-key': API_KEY,
  },
});

// Eventos de conexão
eventSource.addEventListener('connected', (event) => {
  const data = JSON.parse(event.data);
  console.log('🟢 Conectado ao recorder:', data.connectionId);
  console.log('⚙️  Configuração:', data.config);
});

// Eventos gravados
eventSource.addEventListener('recorded', (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'mouse') {
    if (data.action === 'down') {
      console.log(`🖱️  Mouse ${data.button} pressionado em (${data.x}, ${data.y})`);
      if (data.screenshot) {
        console.log('   📸 Screenshot capturado');
      }
    } else if (data.action === 'up') {
      console.log(`🖱️  Mouse ${data.button} solto em (${data.x}, ${data.y})`);
    } else if (data.action === 'move') {
      console.log(`🖱️  Mouse movido para (${data.x}, ${data.y})`);
    }
  } else if (data.type === 'keyboard') {
    if (data.action === 'down') {
      console.log(`⌨️  Tecla '${data.key}' pressionada`);
    } else if (data.action === 'up') {
      console.log(`⌨️  Tecla '${data.key}' solta`);
    }
  }

  // Mostrar timestamp
  const time = new Date(data.timestamp).toISOString();
  console.log(`   ⏰ ${time}`);
  console.log('');
});

// Erros
eventSource.addEventListener('error', (error) => {
  console.error('❌ Erro na conexão:', error);
});

// Fechar ao sair
process.on('SIGINT', () => {
  console.log('\n👋 Fechando conexão...');
  eventSource.close();
  process.exit(0);
});

console.log('👂 Ouvindo eventos de mouse e teclado...');
console.log('   Pressione Ctrl+C para sair\n');
