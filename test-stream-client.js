/**
 * Cliente de teste para validar o endpoint de streaming de eventos
 * Usa EventSource para receber eventos em tempo real
 */

import EventSource from 'eventsource';

console.log('🚀 Iniciando cliente de teste para stream de eventos...');

// Criar conexão com o endpoint de streaming
const eventSource = new EventSource('http://localhost:3000/api/v1/recorder/stream');

// Configurar handlers para os eventos
eventSource.onopen = function (event) {
  console.log('✅ Conexão estabelecida com sucesso!');
  console.log('📡 Aguardando eventos de mouse e teclado...');
  console.log('📋 Mova o mouse, clique ou pressione teclas para testar');
  console.log('---');
};

eventSource.onmessage = function (event) {
  try {
    const data = JSON.parse(event.data);

    // Formatar a saída baseado no tipo de evento
    if (data.type === 'mouse') {
      const { action, x, y, button } = data.data;
      const timestamp = new Date(data.timestamp).toLocaleTimeString();

      if (action === 'move') {
        console.log(`🖱️  [${timestamp}] Mouse move: (${x}, ${y})`);
      } else if (action === 'click') {
        console.log(`🖱️  [${timestamp}] Mouse click: ${button} button at (${x}, ${y})`);
      } else if (action === 'release') {
        console.log(`🖱️  [${timestamp}] Mouse release: ${button} button at (${x}, ${y})`);
      }
    } else if (data.type === 'keyboard') {
      const { action, key } = data.data;
      const timestamp = new Date(data.timestamp).toLocaleTimeString();

      if (action === 'down') {
        console.log(`⌨️  [${timestamp}] Key down: "${key}"`);
      } else if (action === 'up') {
        console.log(`⌨️  [${timestamp}] Key up: "${key}"`);
      }
    } else {
      console.log(
        `📄 [${new Date(data.timestamp).toLocaleTimeString()}] Evento desconhecido:`,
        data,
      );
    }
  } catch (error) {
    console.error('❌ Erro ao processar evento:', error);
    console.log('📄 Dados brutos:', event.data);
  }
};

eventSource.onerror = function (event) {
  console.error('❌ Erro na conexão:', event);

  if (eventSource.readyState === EventSource.CLOSED) {
    console.log('🔴 Conexão fechada');
  } else if (eventSource.readyState === EventSource.CONNECTING) {
    console.log('🟡 Tentando reconectar...');
  }
};

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando cliente...');
  eventSource.close();
  process.exit(0);
});

console.log('💡 Pressione Ctrl+C para sair');
