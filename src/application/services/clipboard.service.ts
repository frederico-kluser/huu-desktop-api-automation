/**
 * Serviço de controle de área de transferência (clipboard)
 * Fornece funcionalidades para copiar e colar conteúdo
 */

import { injectable } from 'tsyringe';
import clipboardy from 'clipboardy';
import type { IAutomationService } from '../../domain/interfaces/automation-service.interface.js';
import type { CommandResult } from '../../domain/entities/command-result.js';

/**
 * Serviço para automação de clipboard
 */
@injectable()
export class ClipboardService implements IAutomationService {
  private readonly MAX_CONTENT_SIZE = 1048576; // 1 MB

  /**
   * Copia conteúdo para a área de transferência
   * @param content - Conteúdo a ser copiado
   * @returns Resultado da operação
   */
  async copy(content: string): Promise<CommandResult> {
    try {
      // Valida tamanho do conteúdo
      if (!content) {
        throw new Error('Content cannot be empty');
      }

      const contentSize = Buffer.byteLength(content, 'utf8');
      if (contentSize > this.MAX_CONTENT_SIZE) {
        throw new Error(
          `Content size ${contentSize} bytes exceeds maximum of ${this.MAX_CONTENT_SIZE} bytes (1 MB)`,
        );
      }

      // Copia para clipboard
      await clipboardy.write(content);

      return {
        success: true,
        data: {
          contentLength: content.length,
          sizeBytes: contentSize,
        },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: `Clipboard copy error: ${message}`,
      };
    }
  }

  /**
   * Cola o conteúdo atual da área de transferência
   * @returns Resultado da operação com o conteúdo colado
   */
  async paste(): Promise<CommandResult> {
    try {
      // Lê conteúdo do clipboard
      const content = await clipboardy.read();

      if (!content) {
        return {
          success: true,
          data: {
            content: '',
            isEmpty: true,
            contentLength: 0,
          },
        };
      }

      return {
        success: true,
        data: {
          content,
          isEmpty: false,
          contentLength: content.length,
        },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: `Clipboard paste error: ${message}`,
      };
    }
  }

  /**
   * Limpa o conteúdo da área de transferência
   * @returns Resultado da operação
   */
  async clear(): Promise<CommandResult> {
    try {
      await clipboardy.write('');

      return {
        success: true,
        data: {
          cleared: true,
        },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: `Clipboard clear error: ${message}`,
      };
    }
  }
}
