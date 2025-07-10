describe('llm-model.enum', () => {
  // Usar require() em vez de import devido ao verbatimModuleSyntax
  const {
    LlmModel,
    LLM_PROVIDER_MAP,
    getProviderForModel,
  } = require('../../../../src/domain/enums/llm-model.enum');

  describe('LlmModel enum', () => {
    test('exports all expected enum values', () => {
      expect(LlmModel.O3).toBe('o3');
      expect(LlmModel.GPT_4_1).toBe('gpt-4.1');
      expect(LlmModel.GPT_4_1_MINI).toBe('gpt-4.1-mini');
      expect(LlmModel.DEEPSEEK_CHAT).toBe('deepseek-chat');
      expect(LlmModel.DEEPSEEK_REASONER).toBe('deepseek-reasoner');
      expect(LlmModel.DEEPSEEK_CODER).toBe('deepseek-coder');
    });

    test('enum has correct number of values', () => {
      const enumValues = Object.values(LlmModel);
      expect(enumValues).toHaveLength(6);
    });

    test('enum values are strings', () => {
      Object.values(LlmModel).forEach((value) => {
        expect(typeof value).toBe('string');
      });
    });
  });

  describe('LLM_PROVIDER_MAP', () => {
    test('maps all LlmModel values to providers', () => {
      expect(LLM_PROVIDER_MAP[LlmModel.O3]).toBe('openai');
      expect(LLM_PROVIDER_MAP[LlmModel.GPT_4_1]).toBe('openai');
      expect(LLM_PROVIDER_MAP[LlmModel.GPT_4_1_MINI]).toBe('openai');
      expect(LLM_PROVIDER_MAP[LlmModel.DEEPSEEK_CHAT]).toBe('deepseek');
      expect(LLM_PROVIDER_MAP[LlmModel.DEEPSEEK_REASONER]).toBe('deepseek');
      expect(LLM_PROVIDER_MAP[LlmModel.DEEPSEEK_CODER]).toBe('deepseek');
    });

    test('contains entries for all enum values', () => {
      const enumValues = Object.values(LlmModel);
      const mapKeys = Object.keys(LLM_PROVIDER_MAP);

      enumValues.forEach((value) => {
        expect(mapKeys).toContain(value);
      });
    });

    test('only contains valid provider values', () => {
      const validProviders = ['openai', 'deepseek'];
      Object.values(LLM_PROVIDER_MAP).forEach((provider) => {
        expect(validProviders).toContain(provider);
      });
    });
  });

  describe('getProviderForModel', () => {
    // Usar test.each para coverage completo do mapeamento
    test.each([
      [LlmModel.O3, 'openai'],
      [LlmModel.GPT_4_1, 'openai'],
      [LlmModel.GPT_4_1_MINI, 'openai'],
      [LlmModel.DEEPSEEK_CHAT, 'deepseek'],
      [LlmModel.DEEPSEEK_REASONER, 'deepseek'],
      [LlmModel.DEEPSEEK_CODER, 'deepseek'],
    ])('returns correct provider for %s', (model, expectedProvider) => {
      expect(getProviderForModel(model)).toBe(expectedProvider);
    });

    test('function is defined and callable', () => {
      expect(typeof getProviderForModel).toBe('function');
      expect(() => getProviderForModel(LlmModel.O3)).not.toThrow();
    });

    // Test edge case com valor não mapeado
    test('handles unmapped values', () => {
      const unmappedValue = 'invalid-model' as any;
      expect(getProviderForModel(unmappedValue)).toBeUndefined();
    });
  });

  // Teste de integração entre enum e mapeamento
  describe('integration tests', () => {
    test('all enum values have corresponding provider mappings', () => {
      Object.values(LlmModel).forEach((model) => {
        const provider = getProviderForModel(model);
        expect(provider).toBeDefined();
        expect(['openai', 'deepseek']).toContain(provider);
      });
    });

    test('provider map and function are consistent', () => {
      Object.entries(LLM_PROVIDER_MAP).forEach(([model, provider]) => {
        expect(getProviderForModel(model as any)).toBe(provider);
      });
    });
  });
});
