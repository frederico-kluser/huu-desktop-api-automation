/**
 * Teste para replicar exatamente o que o GlobalInputCaptureService faz
 * Vamos ver se o problema é na configuração dos listeners
 */

// Simulando o import dinâmico como no serviço
(async () => {
  try {
    const { uIOhook } = await import('uiohook-napi');

    console.log('✅ uiohook-napi importado com sucesso');

    // Configurar os listeners exatamente como no serviço
    uIOhook.on('mousedown', (event) => {
      console.log('🔥 MOUSEDOWN capturado!', event);
    });

    uIOhook.on('mouseup', (event) => {
      console.log('🔥 MOUSEUP capturado!', event);
    });

    uIOhook.on('mousemove', (event) => {
      console.log('🔥 MOUSEMOVE capturado!', event);
    });

    uIOhook.on('keydown', (event) => {
      console.log('🔥 KEYDOWN capturado!', event);
    });

    uIOhook.on('keyup', (event) => {
      console.log('🔥 KEYUP capturado!', event);
    });

    console.log('🔧 Listeners configurados');

    // Iniciar captura
    uIOhook.start();
    console.log('🎯 uiohook-napi iniciado');

    // Aguardar alguns segundos
    setTimeout(() => {
      console.log('📊 Verificando se houve atividade...');
    }, 3000);
  } catch (error) {
    console.error('❌ Erro:', error);
  }
})();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Encerrando...');
  try {
    const { uIOhook } = await import('uiohook-napi');
    uIOhook.stop();
    console.log('✅ uiohook-napi parado');
  } catch (error) {
    console.error('❌ Erro ao parar:', error);
  }
  process.exit(0);
});
