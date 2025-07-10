// Mock das dependências antes dos imports
jest.mock('../../../../src/config/logger.js', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
  },
}));

// Usar require devido ao verbatimModuleSyntax (conforme know-how.txt)
const {
  ApplicationStartupService,
} = require('../../../../src/application/services/application-startup.service.js');
const { logger } = require('../../../../src/config/logger.js');

describe('ApplicationStartupService', () => {
  let service: any;
  let mockGlobalInputCapture: any;

  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();

    // Criar mock do GlobalInputCaptureService
    mockGlobalInputCapture = {
      start: jest.fn().mockResolvedValue(undefined),
      stop: jest.fn(),
    };

    // Criar instância do serviço com o mock injetado
    service = new ApplicationStartupService(mockGlobalInputCapture);
  });

  describe('initialize', () => {
    test('should start global input capture service successfully', async () => {
      await service.initialize();

      expect(logger.info).toHaveBeenCalledWith('🚀 Iniciando serviços da aplicação...');
      expect(mockGlobalInputCapture.start).toHaveBeenCalledTimes(1);
      expect(logger.info).toHaveBeenCalledWith('✅ Aplicação inicializada com sucesso');
    });

    test('should log error and rethrow when global input capture fails to start', async () => {
      const error = new Error('Failed to start capture');
      mockGlobalInputCapture.start.mockRejectedValue(error);

      await expect(service.initialize()).rejects.toThrow(error);

      expect(logger.info).toHaveBeenCalledWith('🚀 Iniciando serviços da aplicação...');
      expect(mockGlobalInputCapture.start).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledWith('❌ Erro ao inicializar aplicação:', error);
      expect(logger.info).not.toHaveBeenCalledWith('✅ Aplicação inicializada com sucesso');
    });

    test('should handle non-Error exceptions during initialization', async () => {
      const stringError = 'Something went wrong';
      mockGlobalInputCapture.start.mockRejectedValue(stringError);

      await expect(service.initialize()).rejects.toBe(stringError);

      expect(logger.error).toHaveBeenCalledWith('❌ Erro ao inicializar aplicação:', stringError);
    });
  });

  describe('shutdown', () => {
    test('should stop global input capture service successfully', () => {
      service.shutdown();

      expect(logger.info).toHaveBeenCalledWith('🔄 Parando serviços da aplicação...');
      expect(mockGlobalInputCapture.stop).toHaveBeenCalledTimes(1);
      expect(logger.info).toHaveBeenCalledWith('✅ Aplicação finalizada com sucesso');
    });

    test('should log error and rethrow when global input capture fails to stop', () => {
      const error = new Error('Failed to stop capture');
      mockGlobalInputCapture.stop.mockImplementation(() => {
        throw error;
      });

      expect(() => service.shutdown()).toThrow(error);

      expect(logger.info).toHaveBeenCalledWith('🔄 Parando serviços da aplicação...');
      expect(mockGlobalInputCapture.stop).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledWith('❌ Erro ao finalizar aplicação:', error);
      expect(logger.info).not.toHaveBeenCalledWith('✅ Aplicação finalizada com sucesso');
    });

    test('should handle non-Error exceptions during shutdown', () => {
      const stringError = 'Stop failed';
      mockGlobalInputCapture.stop.mockImplementation(() => {
        throw stringError;
      });

      expect(() => service.shutdown()).toThrow(stringError);

      expect(logger.error).toHaveBeenCalledWith('❌ Erro ao finalizar aplicação:', stringError);
    });
  });

  describe('dependency injection', () => {
    test('should instantiate with tsyringe decorators', () => {
      // Teste para garantir que a classe pode ser instanciada com DI
      expect(() => new ApplicationStartupService(mockGlobalInputCapture)).not.toThrow();
    });
  });

  describe('edge cases', () => {
    test('should handle when globalInputCapture is undefined', () => {
      const serviceWithoutDependency = new ApplicationStartupService(undefined as any);

      expect(async () => await serviceWithoutDependency.initialize()).rejects.toThrow();
      expect(() => serviceWithoutDependency.shutdown()).toThrow();
    });

    test('should handle multiple calls to initialize', async () => {
      await service.initialize();
      await service.initialize();

      expect(mockGlobalInputCapture.start).toHaveBeenCalledTimes(2);
    });

    test('should handle multiple calls to shutdown', () => {
      service.shutdown();
      service.shutdown();

      expect(mockGlobalInputCapture.stop).toHaveBeenCalledTimes(2);
    });
  });
});
