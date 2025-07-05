// Como CommandResult é uma interface TypeScript, ela não existe em runtime
// Este teste verifica que o arquivo pode ser importado e usado como tipo

describe('CommandResult interface', () => {
  test('can import the module without errors', () => {
    // Verificar que o módulo pode ser importado
    expect(() => require('../../../src/domain/entities/command-result')).not.toThrow();
  });

  test('objects conforming to interface structure', () => {
    // Testar objetos que seguem a estrutura da interface
    const successResult = {
      success: true,
      data: { test: 'data' }
    };
    
    const errorResult = {
      success: false,
      error: 'Test error'
    };
    
    const minimalResult: any = {
      success: true
    };
    
    // Verificar estrutura
    expect(successResult.success).toBe(true);
    expect(successResult.data).toEqual({ test: 'data' });
    
    expect(errorResult.success).toBe(false);
    expect(errorResult.error).toBe('Test error');
    
    expect(minimalResult.success).toBe(true);
    expect(minimalResult.data).toBeUndefined();
    expect(minimalResult.error).toBeUndefined();
  });

  test('various data types in data property', () => {
    const results = [
      { success: true, data: 'string' },
      { success: true, data: 123 },
      { success: true, data: [1, 2, 3] },
      { success: true, data: { nested: true } },
      { success: true, data: null },
      { success: false, error: 'error', data: undefined }
    ];
    
    results.forEach(result => {
      expect(result).toHaveProperty('success');
      expect(typeof result.success).toBe('boolean');
    });
  });

  test('class implementing interface pattern', () => {
    class SuccessResult {
      success = true;
      data = { status: 'ok' };
    }
    
    class ErrorResult {
      success = false;
      error = 'Operation failed';
    }
    
    const success = new SuccessResult();
    const error = new ErrorResult();
    
    expect(success.success).toBe(true);
    expect(success.data).toEqual({ status: 'ok' });
    
    expect(error.success).toBe(false);
    expect((error as any).error).toBe('Operation failed');
  });
});