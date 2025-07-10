// Usando require devido ao verbatimModuleSyntax conforme know-how.txt
const outputShape = require('../../../src/types/output-shape');

describe('output-shape coverage', () => {
  // Para tipos TypeScript - tipos não geram código JavaScript
  test('imports module without errors', () => {
    expect(outputShape).toBeDefined();
  });

  // Testar todas as funções exportadas para maximizar coverage
  test('executes all utility functions', () => {
    const { createSuccessResponse, createErrorResponse, isLegacyResponse, isDynamicResponse } =
      outputShape;

    // createSuccessResponse - sem metadata
    expect(createSuccessResponse('test data')).toEqual({
      success: true,
      data: 'test data',
    });

    // createSuccessResponse - com metadata
    expect(
      createSuccessResponse('test', {
        model: 'gpt-3.5',
        finishReason: 'stop',
        tokensUsed: 100,
        processingTime: 1000,
      }),
    ).toEqual({
      success: true,
      data: 'test',
      metadata: {
        model: 'gpt-3.5',
        finishReason: 'stop',
        tokensUsed: 100,
        processingTime: 1000,
      },
    });

    // createSuccessResponse - com objeto complexo
    expect(createSuccessResponse({ nested: { value: 42 } })).toEqual({
      success: true,
      data: { nested: { value: 42 } },
    });

    // createErrorResponse - sem code
    expect(createErrorResponse('Error message')).toEqual({
      success: false,
      error: 'Error message',
    });

    // createErrorResponse - com code
    expect(createErrorResponse('Error message', 'ERR_001')).toEqual({
      success: false,
      error: 'Error message',
      code: 'ERR_001',
    });

    // createErrorResponse - code vazio não adiciona propriedade
    expect(createErrorResponse('Error', '')).toEqual({
      success: false,
      error: 'Error',
    });
  });

  // Testar type guards para máximo coverage de branches
  test('isLegacyResponse type guard - todos os branches', () => {
    const { isLegacyResponse } = outputShape;

    // Branch: não é objeto
    expect(isLegacyResponse(null)).toBe(false);
    expect(isLegacyResponse(undefined)).toBe(false);
    expect(isLegacyResponse('string')).toBe(false);
    expect(isLegacyResponse(123)).toBe(false);
    expect(isLegacyResponse(true)).toBe(false);

    // Branch: objeto sem propriedades necessárias
    expect(isLegacyResponse({})).toBe(false);
    expect(isLegacyResponse({ success: true })).toBe(false);
    expect(isLegacyResponse({ data: {} })).toBe(false);

    // Branch: data não é objeto
    expect(isLegacyResponse({ success: true, data: 'string' })).toBe(false);
    expect(isLegacyResponse({ success: true, data: null })).toBe(false);

    // Branch: data sem content ou model
    expect(isLegacyResponse({ success: true, data: {} })).toBe(false);
    expect(isLegacyResponse({ success: true, data: { content: 'test' } })).toBe(false);
    expect(isLegacyResponse({ success: true, data: { model: 'test' } })).toBe(false);

    // Branch: resposta válida legada
    expect(
      isLegacyResponse({
        success: true,
        data: {
          content: 'test content',
          model: 'gpt-3.5',
        },
      }),
    ).toBe(true);

    // Branch: resposta válida com campos opcionais
    expect(
      isLegacyResponse({
        success: false,
        data: {
          content: 'error',
          model: 'gpt-4',
          finishReason: 'stop',
          tokensUsed: 100,
        },
      }),
    ).toBe(true);
  });

  test('isDynamicResponse type guard - todos os branches', () => {
    const { isDynamicResponse, isLegacyResponse } = outputShape;

    // Branch: não é objeto
    expect(isDynamicResponse(null)).toBe(false);
    expect(isDynamicResponse(undefined)).toBe(false);
    expect(isDynamicResponse('string')).toBe(false);
    expect(isDynamicResponse(123)).toBe(false);

    // Branch: objeto sem propriedades necessárias
    expect(isDynamicResponse({})).toBe(false);
    expect(isDynamicResponse({ success: true })).toBe(false);
    expect(isDynamicResponse({ data: 'test' })).toBe(false);

    // Branch: resposta dinâmica simples (string)
    expect(
      isDynamicResponse({
        success: true,
        data: 'simple string',
      }),
    ).toBe(true);

    // Branch: resposta dinâmica com objeto
    expect(
      isDynamicResponse({
        success: false,
        data: { custom: 'field', value: 42 },
      }),
    ).toBe(true);

    // Branch: resposta dinâmica com metadata
    expect(
      isDynamicResponse({
        success: true,
        data: 'test',
        metadata: {
          model: 'gpt-3.5',
          processingTime: 1000,
        },
      }),
    ).toBe(true);

    // Branch: não é dinâmica se for legada (testa integração com isLegacyResponse)
    const legacyResponse = {
      success: true,
      data: {
        content: 'test',
        model: 'gpt-3.5',
      },
    };
    expect(isLegacyResponse(legacyResponse)).toBe(true);
    expect(isDynamicResponse(legacyResponse)).toBe(false);
  });

  // Teste de tipos para garantir que interfaces e types funcionam corretamente
  test('type usage patterns', () => {
    const { createSuccessResponse, createErrorResponse } = outputShape;

    // OutputShape<T> usage
    const stringShape = { data: 'test' };
    const objectShape = { data: { key: 'value' } };
    const arrayShape = { data: [1, 2, 3] };

    expect(stringShape.data).toBe('test');
    expect(objectShape.data).toEqual({ key: 'value' });
    expect(arrayShape.data).toEqual([1, 2, 3]);

    // DynamicLLMResponse usage
    const dynamicString = createSuccessResponse('response');
    const dynamicObject = createSuccessResponse({ structured: true });
    const dynamicArray = createSuccessResponse(['item1', 'item2']);

    expect(dynamicString.data).toBe('response');
    expect(dynamicObject.data).toEqual({ structured: true });
    expect(dynamicArray.data).toEqual(['item1', 'item2']);

    // LegacyLLMResponse pattern
    const legacyPattern = {
      success: true,
      data: {
        content: 'legacy content',
        model: 'gpt-3.5-turbo',
        finishReason: 'stop',
        tokensUsed: 50,
      },
    };

    expect(legacyPattern.data.content).toBe('legacy content');
    expect(legacyPattern.data.model).toBe('gpt-3.5-turbo');

    // Error response pattern
    const errorResponse = createErrorResponse('Something went wrong', 'ERR_UNKNOWN');
    expect(errorResponse.success).toBe(false);
    expect(errorResponse.error).toBe('Something went wrong');
    expect(errorResponse.code).toBe('ERR_UNKNOWN');
  });

  // Teste adicional para edge cases e aumentar coverage
  test('edge cases and special values', () => {
    const { createSuccessResponse, createErrorResponse, isLegacyResponse, isDynamicResponse } =
      outputShape;

    // Valores especiais no createSuccessResponse
    expect(createSuccessResponse(null)).toEqual({ success: true, data: null });
    expect(createSuccessResponse(undefined)).toEqual({ success: true, data: undefined });
    expect(createSuccessResponse(0)).toEqual({ success: true, data: 0 });
    expect(createSuccessResponse(false)).toEqual({ success: true, data: false });
    expect(createSuccessResponse('')).toEqual({ success: true, data: '' });

    // Metadata parcial
    expect(createSuccessResponse('test', { model: 'gpt-4' })).toEqual({
      success: true,
      data: 'test',
      metadata: { model: 'gpt-4' },
    });

    // Type guards com objetos complexos
    const complexObject = {
      success: true,
      data: {
        content: 'content',
        model: 'model',
        extra: 'field',
        nested: { deep: true },
      },
      extraField: 'ignored',
    };

    expect(isLegacyResponse(complexObject)).toBe(true);
    expect(isDynamicResponse(complexObject)).toBe(false);

    // Arrays e funções
    expect(isLegacyResponse([])).toBe(false);
    expect(isLegacyResponse(() => {})).toBe(false);
    expect(isDynamicResponse([])).toBe(false);
    expect(isDynamicResponse(() => {})).toBe(false);
  });
});
