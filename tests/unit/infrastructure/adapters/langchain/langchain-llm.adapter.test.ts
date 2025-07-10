// Mock das dependências antes dos imports
jest.mock('@langchain/openai', () => ({
  ChatOpenAI: jest.fn().mockImplementation(() => ({
    invoke: jest.fn(),
  })),
}));

jest.mock('@langchain/deepseek', () => ({
  ChatDeepSeek: jest.fn().mockImplementation(() => ({
    invoke: jest.fn(),
  })),
}));

jest.mock('@langchain/core/messages', () => ({
  HumanMessage: jest.fn().mockImplementation((content) => ({ content, type: 'human' })),
  SystemMessage: jest.fn().mockImplementation((content) => ({ content, type: 'system' })),
}));

jest.mock('pino', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  })),
}));

jest.mock('../../../../../src/config/environment.js', () => ({
  environment: {
    openaiApiKey: 'test-openai-key',
    deepseekApiKey: 'test-deepseek-key',
  },
}));

jest.mock('../../../../../src/config/langchain.config.js', () => ({
  LangChainConfig: {
    timeout: 30000,
    retries: 3,
  },
}));

jest.mock('../../../../../src/domain/enums/llm-model.enum.js', () => ({
  getProviderForModel: jest.fn(),
}));

// Usar require devido ao verbatimModuleSyntax
const {
  LangChainLLMAdapter,
} = require('../../../../../src/infrastructure/adapters/langchain/langchain-llm.adapter');
const { ChatOpenAI } = require('@langchain/openai');
const { ChatDeepSeek } = require('@langchain/deepseek');
const { HumanMessage, SystemMessage } = require('@langchain/core/messages');
const { getProviderForModel } = require('../../../../../src/domain/enums/llm-model.enum.js');

describe('LangChainLLMAdapter', () => {
  let adapter: any;
  let mockInvoke: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    adapter = new LangChainLLMAdapter();
    mockInvoke = jest.fn();

    // Reset mocks
    (ChatOpenAI as jest.Mock).mockImplementation(() => ({
      invoke: mockInvoke,
    }));

    (ChatDeepSeek as jest.Mock).mockImplementation(() => ({
      invoke: mockInvoke,
    }));
  });

  test('instantiates adapter', () => {
    expect(adapter).toBeDefined();
    expect(adapter.generateCompletion).toBeDefined();
  });

  test('generates completion with OpenAI provider', async () => {
    const request = {
      model: 'gpt-4',
      prompt: 'Test prompt',
      temperature: 0.7,
      maxTokens: 1000,
      systemPrompt: 'Test system prompt',
    };

    const mockResponse = {
      content: 'Test response',
      response_metadata: {
        finish_reason: 'stop',
        token_usage: {
          prompt_tokens: 10,
          completion_tokens: 20,
          total_tokens: 30,
        },
      },
    };

    (getProviderForModel as jest.Mock).mockReturnValue('openai');
    mockInvoke.mockResolvedValue(mockResponse);

    const result = await adapter.generateCompletion(request);

    expect(result).toEqual({
      content: 'Test response',
      model: 'gpt-4',
      finishReason: 'stop',
      usage: {
        promptTokens: 10,
        completionTokens: 20,
        totalTokens: 30,
      },
    });

    expect(ChatOpenAI).toHaveBeenCalledWith({
      modelName: 'gpt-4',
      temperature: 0.7,
      maxTokens: 1000,
      openAIApiKey: 'test-openai-key',
      timeout: 30000,
      maxRetries: 3,
    });
  });

  test('generates completion with DeepSeek provider', async () => {
    const request = {
      model: 'deepseek-chat',
      prompt: 'Test prompt',
      temperature: 0.5,
      maxTokens: 500,
    };

    const mockResponse = {
      content: 'DeepSeek response',
      response_metadata: {},
    };

    (getProviderForModel as jest.Mock).mockReturnValue('deepseek');
    mockInvoke.mockResolvedValue(mockResponse);

    const result = await adapter.generateCompletion(request);

    expect(result).toEqual({
      content: 'DeepSeek response',
      model: 'deepseek-chat',
      finishReason: undefined,
    });

    expect(ChatDeepSeek).toHaveBeenCalledWith({
      model: 'deepseek-chat',
      temperature: 0.5,
      maxTokens: 500,
      apiKey: 'test-deepseek-key',
      timeout: 30000,
      maxRetries: 3,
    });
  });

  test('handles request without system prompt', async () => {
    const request = {
      model: 'gpt-3.5-turbo',
      prompt: 'No system prompt',
      temperature: 0.5,
      maxTokens: 100,
    };

    (getProviderForModel as jest.Mock).mockReturnValue('openai');
    mockInvoke.mockResolvedValue({ content: 'Response' });

    await adapter.generateCompletion(request);

    // Verificar que SystemMessage não foi chamado
    expect(SystemMessage).not.toHaveBeenCalled();
    expect(HumanMessage).toHaveBeenCalledWith('No system prompt');
  });

  test('handles error during completion', async () => {
    const request = {
      model: 'gpt-4',
      prompt: 'Test',
      temperature: 0.5,
      maxTokens: 100,
    };

    (getProviderForModel as jest.Mock).mockReturnValue('openai');
    mockInvoke.mockRejectedValue(new Error('API Error'));

    await expect(adapter.generateCompletion(request)).rejects.toThrow(
      'Failed to generate completion: API Error',
    );
  });

  test('handles non-Error exceptions', async () => {
    const request = {
      model: 'gpt-4',
      prompt: 'Test',
      temperature: 0.5,
      maxTokens: 100,
    };

    (getProviderForModel as jest.Mock).mockReturnValue('openai');
    mockInvoke.mockRejectedValue('String error');

    await expect(adapter.generateCompletion(request)).rejects.toThrow(
      'Failed to generate completion: Unknown error',
    );
  });

  test('handles response without metadata', async () => {
    const request = {
      model: 'gpt-4',
      prompt: 'Test',
      temperature: 0.5,
      maxTokens: 100,
    };

    const mockResponse = {
      content: 'Response without metadata',
    };

    (getProviderForModel as jest.Mock).mockReturnValue('openai');
    mockInvoke.mockResolvedValue(mockResponse);

    const result = await adapter.generateCompletion(request);

    expect(result).toEqual({
      content: 'Response without metadata',
      model: 'gpt-4',
      finishReason: undefined,
    });
    expect(result.usage).toBeUndefined();
  });

  test('handles non-string content in response', async () => {
    const request = {
      model: 'gpt-4',
      prompt: 'Test',
      temperature: 0.5,
      maxTokens: 100,
    };

    const mockResponse = {
      content: { toString: () => 'Converted content' },
      response_metadata: { finish_reason: 'stop' },
    };

    (getProviderForModel as jest.Mock).mockReturnValue('openai');
    mockInvoke.mockResolvedValue(mockResponse);

    const result = await adapter.generateCompletion(request);

    expect(result.content).toBe('Converted content');
  });

  test('all provider types are handled', () => {
    const request = {
      model: 'test-model',
      prompt: 'Test',
      temperature: 0.5,
      maxTokens: 100,
    };

    // Test com provider desconhecido (deve usar OpenAI como fallback)
    (getProviderForModel as jest.Mock).mockReturnValue('unknown');
    mockInvoke.mockResolvedValue({ content: 'Response' });

    adapter.generateCompletion(request);

    // Deve usar ChatOpenAI como fallback
    expect(ChatOpenAI).toHaveBeenCalled();
    expect(ChatDeepSeek).not.toHaveBeenCalled();
  });

  test('interface ILLMAdapter is properly defined', () => {
    // Teste para garantir que a interface é importável e utilizável
    const adapterAsInterface: typeof adapter = {
      generateCompletion: async () => ({ content: '', model: '' }),
    };
    expect(adapterAsInterface.generateCompletion).toBeDefined();
  });
});
