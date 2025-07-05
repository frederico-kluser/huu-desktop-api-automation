// Mock do @nut-tree-fork/nut-js antes de qualquer import
jest.mock('@nut-tree-fork/nut-js', () => ({
  mouse: {
    getPosition: jest.fn().mockResolvedValue({ x: 100, y: 200 })
  }
}));

// Usar require para evitar problemas com verbatimModuleSyntax
const { KeyboardService } = require('../../../src/application/services/keyboard.service');

describe('KeyboardService', () => {
  let service: any;
  let mockKeyboardAdapter: any;
  let mockEventDispatcher: any;

  beforeEach(() => {
    // Mock do adapter
    mockKeyboardAdapter = {
      type: jest.fn().mockResolvedValue(undefined),
      pressKey: jest.fn().mockResolvedValue(undefined),
      releaseKey: jest.fn().mockResolvedValue(undefined),
      combination: jest.fn().mockResolvedValue(undefined),
      delay: jest.fn().mockResolvedValue(undefined)
    };

    // Mock do event dispatcher
    mockEventDispatcher = {
      dispatch: jest.fn(),
      dispatchKeyPress: jest.fn()
    };

    // Criar instância do serviço
    service = new KeyboardService(mockKeyboardAdapter, mockEventDispatcher);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('type', () => {
    test('digita texto no modo instant', async () => {
      const result = await service.type({ text: 'hello' });
      
      expect(result.success).toBe(true);
      expect(mockKeyboardAdapter.type).toHaveBeenCalledWith('hello');
      expect(mockEventDispatcher.dispatchKeyPress).toHaveBeenCalledTimes(5);
    });

    test('digita texto no modo perChar com delay', async () => {
      const result = await service.type({ 
        text: 'hi',
        mode: 'perChar',
        value: 100
      });
      
      expect(result.success).toBe(true);
      expect(mockKeyboardAdapter.type).toHaveBeenCalledTimes(2);
      expect(mockKeyboardAdapter.delay).toHaveBeenCalledTimes(2);
    });

    test('digita texto no modo total com tempo total', async () => {
      const result = await service.type({ 
        text: 'test',
        mode: 'total',
        value: 200
      });
      
      expect(result.success).toBe(true);
      expect(mockKeyboardAdapter.type).toHaveBeenCalledTimes(4);
      expect(mockKeyboardAdapter.delay).toHaveBeenCalledTimes(4);
    });

    test('retorna erro com texto vazio após sanitização', async () => {
      const result = await service.type({ text: '\x00\x01\x02' });
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Text cannot be empty');
    });

    test('retorna erro com texto muito longo', async () => {
      const longText = 'a'.repeat(10001);
      const result = await service.type({ text: longText });
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('exceeds maximum length');
    });

    test('retorna erro com timing value muito alto', async () => {
      const result = await service.type({ 
        text: 'test',
        mode: 'total',
        value: 300001
      });
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('exceeds maximum');
    });

    test('retorna erro com delay negativo no modo perChar', async () => {
      const result = await service.type({ 
        text: 'test',
        mode: 'perChar',
        value: -1
      });
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('must be non-negative');
    });

    test('retorna erro com tempo total negativo', async () => {
      const result = await service.type({ 
        text: 'test',
        mode: 'total',
        value: -1
      });
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('must be non-negative');
    });

    test('lida com texto Unicode corretamente', async () => {
      const unicodeText = '👋🌍';
      const result = await service.type({ text: unicodeText });
      
      expect(result.success).toBe(true);
      expect(mockEventDispatcher.dispatchKeyPress).toHaveBeenCalledTimes(2);
    });

    test('processa texto em lotes no modo perChar', async () => {
      const largeText = 'a'.repeat(100);
      const result = await service.type({ 
        text: largeText,
        mode: 'perChar',
        value: 0
      });
      
      expect(result.success).toBe(true);
      expect(mockKeyboardAdapter.type).toHaveBeenCalledTimes(100);
    });

    test('lida com caractere único no modo total', async () => {
      const result = await service.type({ 
        text: 'x',
        mode: 'total',
        value: 100
      });
      
      expect(result.success).toBe(true);
      expect(mockKeyboardAdapter.type).toHaveBeenCalledWith('x');
      expect(mockKeyboardAdapter.delay).not.toHaveBeenCalled();
    });

    test('lida com erro do adapter', async () => {
      mockKeyboardAdapter.type.mockRejectedValue(new Error('Adapter error'));
      
      const result = await service.type({ text: 'test' });
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Adapter error');
    });

    test('sanitiza caracteres de controle mantendo \\n e \\t', async () => {
      const textWithControl = 'hello\x00\x01world\ntest\ttab';
      const result = await service.type({ text: textWithControl });
      
      expect(result.success).toBe(true);
      expect(mockKeyboardAdapter.type).toHaveBeenCalledWith('helloworld\ntest\ttab');
    });
  });

  describe('pressKey', () => {
    test('pressiona tecla com sucesso', async () => {
      const result = await service.pressKey('Enter');
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ key: 'Enter' });
      expect(mockKeyboardAdapter.pressKey).toHaveBeenCalledWith('Enter');
      expect(mockEventDispatcher.dispatch).toHaveBeenCalledTimes(2);
    });

    test('emite eventos de key down e key up', async () => {
      await service.pressKey('Space');
      
      const calls = mockEventDispatcher.dispatch.mock.calls;
      expect(calls[0][0].data).toEqual({ key: 'Space', action: 'down' });
      expect(calls[1][0].data).toEqual({ key: 'Space', action: 'up' });
    });

    test('lida com erro do adapter', async () => {
      mockKeyboardAdapter.pressKey.mockRejectedValue(new Error('Key error'));
      
      const result = await service.pressKey('Invalid');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Key error');
    });
  });

  describe('combination', () => {
    test('executa combinação de teclas com sucesso', async () => {
      const keys = ['Ctrl', 'C'];
      const result = await service.combination(keys);
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ combination: 'Ctrl+C' });
      expect(mockKeyboardAdapter.combination).toHaveBeenCalledWith(keys);
    });

    test('retorna erro com array vazio', async () => {
      const result = await service.combination([]);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('at least one key');
    });

    test('retorna erro com mais de 5 teclas', async () => {
      const keys = ['A', 'B', 'C', 'D', 'E', 'F'];
      const result = await service.combination(keys);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('maximum 5 keys');
    });

    test('lida com erro do adapter', async () => {
      mockKeyboardAdapter.combination.mockRejectedValue(new Error('Combo error'));
      
      const result = await service.combination(['Ctrl', 'V']);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Combo error');
    });
  });

  describe('coverage de branches e statements', () => {
    test('modo default quando mode não especificado', async () => {
      const result = await service.type({ text: 'default' });
      
      expect(result.success).toBe(true);
      expect(result.data.mode).toBe('instant');
    });

    test('value default quando não especificado', async () => {
      const result = await service.type({ 
        text: 'test',
        mode: 'perChar'
      });
      
      expect(result.success).toBe(true);
      expect(mockKeyboardAdapter.delay).not.toHaveBeenCalled();
    });

    test('erro não-Error é tratado corretamente', async () => {
      mockKeyboardAdapter.type.mockRejectedValue('string error');
      
      const result = await service.type({ text: 'test' });
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Unknown error');
    });

    test('texto vazio no modo total retorna sem processar', async () => {
      const result = await service.type({ 
        text: '\x00',
        mode: 'total',
        value: 100
      });
      
      expect(result.success).toBe(false);
      expect(mockKeyboardAdapter.type).not.toHaveBeenCalled();
    });

    test('texto vazio após sanitização no modo total com erro antes do return', async () => {
      // Criar um mock do método privado para simular texto vazio após sanitização
      const sanitizeTextSpy = jest.spyOn(service as any, 'sanitizeText');
      sanitizeTextSpy.mockReturnValueOnce(''); // Retorna string vazia
      
      const result = await service.type({ 
        text: 'some text',
        mode: 'total',
        value: 100
      });
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Text cannot be empty');
      
      sanitizeTextSpy.mockRestore();
    });

    test('estratégias funcionam sem event dispatcher', async () => {
      // Criar serviço sem event dispatcher
      const serviceNoDispatcher = new KeyboardService(mockKeyboardAdapter, null);
      
      const result = await serviceNoDispatcher.type({ 
        text: 'test',
        mode: 'perChar',
        value: 10
      });
      
      expect(result.success).toBe(true);
      expect(mockEventDispatcher.dispatchKeyPress).not.toHaveBeenCalled();
    });
  });
});