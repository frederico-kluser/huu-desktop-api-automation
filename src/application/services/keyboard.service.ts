/**
 * Serviço de automação de teclado com estratégias de timing
 * Fornece funcionalidades para digitação com controle de velocidade
 */

import { inject, injectable } from 'tsyringe';
import type { IAutomationService } from '../../domain/interfaces/automation-service.interface.js';
import type { CommandResult } from '../../domain/entities/command-result.js';

/**
 * Interface para o adaptador de teclado
 */
export interface IKeyboardAdapter {
  type(text: string): Promise<void>;
  pressKey(key: string): Promise<void>;
  releaseKey(key: string): Promise<void>;
  combination(keys: string[]): Promise<void>;
  delay(ms: number): Promise<void>;
}

/**
 * Interface para estratégias de digitação
 */
interface ITypeStrategy {
  type(text: string, adapter: IKeyboardAdapter): Promise<void>;
}

/**
 * Estratégia de digitação instantânea
 */
class InstantTypeStrategy implements ITypeStrategy {
  async type(text: string, adapter: IKeyboardAdapter): Promise<void> {
    await adapter.type(text);
  }
}

/**
 * Estratégia de digitação com delay por caractere
 */
class PerCharTypeStrategy implements ITypeStrategy {
  constructor(private delayPerChar: number) {}

  async type(text: string, adapter: IKeyboardAdapter): Promise<void> {
    const chars = Array.from(text); // Suporta Unicode corretamente
    const batchSize = 50; // Processa em lotes para melhor performance

    for (let i = 0; i < chars.length; i += batchSize) {
      const batch = chars.slice(i, i + batchSize);
      
      for (const char of batch) {
        await adapter.type(char);
        if (this.delayPerChar > 0) {
          await adapter.delay(this.delayPerChar);
        }
      }
    }
  }
}

/**
 * Estratégia de digitação com tempo total
 */
class TotalTimeTypeStrategy implements ITypeStrategy {
  constructor(private totalTime: number) {}

  async type(text: string, adapter: IKeyboardAdapter): Promise<void> {
    const chars = Array.from(text);
    
    if (chars.length === 0) {
      return;
    }

    if (chars.length === 1) {
      await adapter.type(text);
      return;
    }

    // Calcula delay uniforme entre caracteres
    const delayPerChar = Math.floor(this.totalTime / chars.length);

    for (const char of chars) {
      await adapter.type(char);
      if (delayPerChar > 0) {
        await adapter.delay(delayPerChar);
      }
    }
  }
}

/**
 * Opções de configuração para digitação
 */
export interface TypeOptions {
  text: string;
  mode?: 'instant' | 'perChar' | 'total';
  value?: number;
}

/**
 * Serviço para automação de teclado
 */
@injectable()
export class KeyboardService implements IAutomationService {
  constructor(
    @inject('IKeyboardAdapter') private keyboardAdapter: IKeyboardAdapter
  ) {}

  /**
   * Digita texto com opções de timing
   * @param options - Opções de digitação incluindo texto e modo
   * @returns Resultado da operação
   */
  async type(options: TypeOptions): Promise<CommandResult> {
    try {
      // Sanitiza o texto removendo caracteres de controle perigosos
      const sanitizedText = this.sanitizeText(options.text);
      
      // Valida limites
      if (sanitizedText.length === 0) {
        throw new Error('Text cannot be empty after sanitization');
      }

      if (sanitizedText.length > 10000) {
        throw new Error('Text exceeds maximum length of 10000 characters');
      }

      // Seleciona estratégia baseada no modo
      const strategy = this.createStrategy(options);
      
      // Executa digitação
      await strategy.type(sanitizedText, this.keyboardAdapter);

      return {
        success: true,
        data: {
          textLength: sanitizedText.length,
          mode: options.mode || 'instant',
          timing: options.value
        }
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: `Keyboard type error: ${message}`
      };
    }
  }

  /**
   * Pressiona uma tecla específica
   * @param key - Nome da tecla a ser pressionada
   * @returns Resultado da operação
   */
  async pressKey(key: string): Promise<CommandResult> {
    try {
      await this.keyboardAdapter.pressKey(key);
      return {
        success: true,
        data: { key }
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: `Keyboard press key error: ${message}`
      };
    }
  }

  /**
   * Executa combinação de teclas
   * @param keys - Array de teclas para combinação
   * @returns Resultado da operação
   */
  async combination(keys: string[]): Promise<CommandResult> {
    try {
      if (keys.length === 0) {
        throw new Error('Key combination requires at least one key');
      }

      if (keys.length > 5) {
        throw new Error('Key combination supports maximum 5 keys');
      }

      await this.keyboardAdapter.combination(keys);
      return {
        success: true,
        data: { combination: keys.join('+') }
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: `Keyboard combination error: ${message}`
      };
    }
  }

  /**
   * Cria estratégia de digitação baseada nas opções
   */
  private createStrategy(options: TypeOptions): ITypeStrategy {
    const mode = options.mode || 'instant';
    const value = options.value || 0;

    // Valida valor máximo
    if (value > 300000) { // 5 minutos
      throw new Error('Timing value exceeds maximum of 300000ms (5 minutes)');
    }

    switch (mode) {
      case 'perChar':
        if (value < 0) {
          throw new Error('Per-character delay must be non-negative');
        }
        return new PerCharTypeStrategy(value);
      
      case 'total':
        if (value < 0) {
          throw new Error('Total time must be non-negative');
        }
        return new TotalTimeTypeStrategy(value);
      
      case 'instant':
      default:
        return new InstantTypeStrategy();
    }
  }

  /**
   * Sanitiza texto removendo caracteres de controle perigosos
   */
  private sanitizeText(text: string): string {
    // Remove caracteres de controle (0x00-0x1F) exceto \n (0x0A) e \t (0x09)
    return text.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F]/g, '');
  }
}