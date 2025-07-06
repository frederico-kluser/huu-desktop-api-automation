/**
 * Teste direto do uiohook-napi para verificar se está capturando eventos
 */

const { uIOhook } = require('uiohook-napi');

console.log('🚀 Teste direto do uiohook-napi');
console.log('📝 Métodos disponíveis:', Object.getOwnPropertyNames(uIOhook));

// Configurar listeners
uIOhook.on('mousemove', (event) => {
  console.log('🖱️ Mouse move:', event);
});

uIOhook.on('mousedown', (event) => {
  console.log('🖱️ Mouse down:', event);
});

uIOhook.on('mouseup', (event) => {
  console.log('🖱️ Mouse up:', event);
});

uIOhook.on('keydown', (event) => {
  console.log('⌨️ Key down:', event);
});

uIOhook.on('keyup', (event) => {
  console.log('⌨️ Key up:', event);
});

console.log('📡 Iniciando captura de eventos...');

try {
  uIOhook.start();
  console.log('✅ uiohook-napi iniciado com sucesso');
  console.log('📋 Mova o mouse, clique ou pressione teclas para testar');
  console.log('💡 Pressione Ctrl+C para sair');
} catch (error) {
  console.error('❌ Erro ao iniciar uiohook-napi:', error);
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando teste...');
  try {
    uIOhook.stop();
    console.log('✅ uiohook-napi parado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao parar uiohook-napi:', error);
  }
  process.exit(0);
});
