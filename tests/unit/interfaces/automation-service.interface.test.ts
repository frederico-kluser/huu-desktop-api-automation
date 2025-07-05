import type { IAutomationService } from '../../../src/domain/interfaces/automation-service.interface.js';

describe('IAutomationService', () => {
  test('interface should be defined', () => {
    // Interface de marcação - apenas verifica que pode ser importada
    const testInterface: IAutomationService = {} as IAutomationService;
    expect(testInterface).toBeDefined();
  });

  test('interface allows implementation', () => {
    // Testa que a interface pode ser implementada
    class TestAutomationService implements IAutomationService {
      // Interface vazia permite qualquer implementação
    }

    const instance = new TestAutomationService();
    expect(instance).toBeInstanceOf(TestAutomationService);
  });

  test('interface allows multiple implementations', () => {
    // Múltiplas implementações da interface
    class ServiceA implements IAutomationService {}
    class ServiceB implements IAutomationService {}

    const serviceA = new ServiceA();
    const serviceB = new ServiceB();

    expect(serviceA).toBeInstanceOf(ServiceA);
    expect(serviceB).toBeInstanceOf(ServiceB);
  });

  test('interface as type constraint', () => {
    // Usa interface como tipo
    function acceptsAutomationService(service: IAutomationService): boolean {
      return service !== null && service !== undefined;
    }

    const mockService: IAutomationService = {};
    expect(acceptsAutomationService(mockService)).toBe(true);
  });
});
