/**
 * Teste específico para verificar problemas do macOS e permissões
 */

const { uIOhook } = require('uiohook-napi');

console.log('🔍 Teste de diagnóstico do uiohook-napi no macOS');
console.log('Sistema operacional:', process.platform);
console.log('Versão do Node.js:', process.version);

// Verificar se há handlers padrão
console.log('🔧 Configurando handlers com logs detalhados...');

// Handler de erro para capturar problemas
uIOhook.on('error', (error) => {
  console.error('❌ Erro no uiohook-napi:', error);
});

// Contador de eventos
let eventCount = 0;

// Listeners com contadores
uIOhook.on('mousedown', (event) => {
  eventCount++;
  console.log(`🖱️ [${eventCount}] MOUSEDOWN:`, {
    type: event.type,
    button: event.button,
    x: event.x,
    y: event.y,
    time: event.time,
  });
});

uIOhook.on('mouseup', (event) => {
  eventCount++;
  console.log(`🖱️ [${eventCount}] MOUSEUP:`, {
    type: event.type,
    button: event.button,
    x: event.x,
    y: event.y,
    time: event.time,
  });
});

uIOhook.on('mousemove', (event) => {
  eventCount++;
  // Apenas mostrar alguns eventos de movimento para não spam
  if (eventCount % 10 === 0) {
    console.log(`🖱️ [${eventCount}] MOUSEMOVE:`, {
      type: event.type,
      x: event.x,
      y: event.y,
      time: event.time,
    });
  }
});

uIOhook.on('keydown', (event) => {
  eventCount++;
  console.log(`⌨️ [${eventCount}] KEYDOWN:`, {
    type: event.type,
    keycode: event.keycode,
    keychar: event.keychar,
    time: event.time,
  });
});

uIOhook.on('keyup', (event) => {
  eventCount++;
  console.log(`⌨️ [${eventCount}] KEYUP:`, {
    type: event.type,
    keycode: event.keycode,
    keychar: event.keychar,
    time: event.time,
  });
});

console.log('✅ Listeners configurados');
console.log('🎯 Iniciando captura...');

try {
  uIOhook.start();
  console.log('✅ uiohook.start() executado com sucesso');

  // Verificar periodicamente
  let checkCount = 0;
  const checkInterval = setInterval(() => {
    checkCount++;
    console.log(`📊 [${checkCount * 2}s] Eventos capturados: ${eventCount}`);

    if (checkCount >= 10) {
      // Parar após 20 segundos
      clearInterval(checkInterval);
      console.log('⏰ Tempo limite atingido');
      console.log('🛑 Parando captura...');
      uIOhook.stop();
      process.exit(0);
    }
  }, 2000);
} catch (error) {
  console.error('❌ Erro ao iniciar uiohook:', error);
  process.exit(1);
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando...');
  try {
    uIOhook.stop();
    console.log('✅ uiohook parado');
  } catch (error) {
    console.error('❌ Erro ao parar:', error);
  }
  process.exit(0);
});

console.log('💡 Mova o mouse ou pressione teclas para testar');
console.log('💡 Pressione Ctrl+C para sair');
console.log(
  '💡 ⚠️ Se não houver eventos, pode ser necessário dar permissões de acessibilidade no macOS',
);
