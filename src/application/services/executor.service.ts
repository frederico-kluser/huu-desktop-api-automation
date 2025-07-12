/**
 * Serviço responsável pela execução de ações de automação
 * Mapeia tipos de dispositivos para serviços específicos e executa ações
 */

import { injectable, inject } from 'tsyringe';
import { container } from 'tsyringe';
import pino from 'pino';
import type {
  AutomationAction,
  ActionDevice,
  MouseAction,
  KeyboardAction,
  WaitAction,
  ClipboardAction,
  ScreenAction,
  LlmAction,
  OcrAction,
} from '../../types/automation-builder.types.js';
import { MouseService } from './mouse.service.js';
import { KeyboardService } from './keyboard.service.js';
import { ClipboardService } from './clipboard.service.js';
import { ScreenService } from './screen.service.js';
import { LLMService } from './llm.service.js';
import { OcrService } from './ocr.service.js';
import type { CommandResult } from '../../domain/entities/command-result.js';
import { LlmModel } from '../../domain/enums/llm-model.enum.js';

export interface ExecutionResult {
  success: boolean;
  actionId: string;
  device: ActionDevice;
  error?: string;
  data?: any;
}

export interface ExecutionOptions {
  stopOnError?: boolean;
  delayBetweenActions?: number;
}

@injectable()
export class ExecutorService {
  private readonly logger = pino({ name: 'ExecutorService' });

  constructor(
    @inject(MouseService) private readonly mouseService: MouseService,
    @inject(KeyboardService) private readonly keyboardService: KeyboardService,
    @inject(ClipboardService) private readonly clipboardService: ClipboardService,
    @inject(ScreenService) private readonly screenService: ScreenService,
    @inject('LLMService') private readonly llmService: LLMService,
    @inject(OcrService) private readonly ocrService: OcrService,
  ) {}

  /**
   * Executa uma sequência de ações
   * @param actions - Array de ações a serem executadas
   * @param options - Opções de execução
   * @returns Array de resultados de execução
   */
  async executeActions(
    actions: AutomationAction[],
    options: ExecutionOptions = {},
  ): Promise<ExecutionResult[]> {
    const { stopOnError = true, delayBetweenActions = 0 } = options;
    const results: ExecutionResult[] = [];

    this.logger.info(
      { actionsCount: actions.length, stopOnError, delayBetweenActions },
      'Starting actions execution',
    );

    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      this.logger.debug({ action, index: i }, 'Executing action');

      try {
        const result = await this.executeAction(action);
        results.push(result);

        if (!result.success && stopOnError) {
          this.logger.error(
            { actionId: action.id, error: result.error },
            'Action failed, stopping execution',
          );
          break;
        }

        // Aplicar delay entre ações se configurado
        if (delayBetweenActions > 0 && i < actions.length - 1) {
          await this.delay(delayBetweenActions);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const result: ExecutionResult = {
          success: false,
          actionId: action.id,
          device: action.device,
          error: errorMessage,
        };
        results.push(result);

        if (stopOnError) {
          this.logger.error({ actionId: action.id, error }, 'Unexpected error, stopping execution');
          break;
        }
      }
    }

    this.logger.info(
      {
        totalActions: actions.length,
        executedActions: results.length,
        successfulActions: results.filter((r) => r.success).length,
        failedActions: results.filter((r) => !r.success).length,
      },
      'Actions execution completed',
    );

    return results;
  }

  /**
   * Executa uma ação individual
   * @param action - Ação a ser executada
   * @returns Resultado da execução
   */
  async executeAction(action: AutomationAction): Promise<ExecutionResult> {
    try {
      switch (action.device) {
        case 'wait':
          return await this.executeWaitAction(action as WaitAction);

        case 'mouse':
          return await this.executeMouseAction(action as MouseAction);

        case 'keyboard':
          return await this.executeKeyboardAction(action as KeyboardAction);

        case 'clipboard':
          return await this.executeClipboardAction(action as ClipboardAction);

        case 'screen':
          return await this.executeScreenAction(action as ScreenAction);

        case 'llm':
          return await this.executeLlmAction(action as LlmAction);

        case 'ocr':
          return await this.executeOcrAction(action as OcrAction);

        default:
          return {
            success: false,
            actionId: action.id,
            device: action.device,
            error: `Unsupported device type: ${action.device}`,
          };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        actionId: action.id,
        device: action.device,
        error: errorMessage,
      };
    }
  }

  /**
   * Executa ação de wait
   */
  private async executeWaitAction(action: WaitAction): Promise<ExecutionResult> {
    const { ms } = action.payload.data;
    this.logger.debug({ ms }, 'Executing wait action');

    await this.delay(ms);

    return {
      success: true,
      actionId: action.id,
      device: action.device,
      data: { waitedMs: ms },
    };
  }

  /**
   * Executa ação do mouse
   */
  private async executeMouseAction(action: MouseAction): Promise<ExecutionResult> {
    const { type, data } = action.payload;

    let result: CommandResult;

    switch (type) {
      case 'move':
        await this.mouseService.move({
          x: data.x,
          y: data.y,
          smooth: data.smooth ?? true,
          duration: data.duration ?? 1000,
        });
        result = { success: true };
        break;

      case 'click':
        await this.mouseService.click({
          x: data.x,
          y: data.y,
          button: data.button ?? 'left',
          doubleClick: data.doubleClick ?? false,
          smooth: data.smooth ?? true,
          duration: data.duration ?? 1000,
        });
        result = { success: true };
        break;

      case 'drag':
        await this.mouseService.drag({
          from: data.from,
          to: data.to,
          smooth: data.smooth ?? true,
          duration: data.duration ?? 1000,
        });
        result = { success: true };
        break;

      case 'scroll':
        await this.mouseService.scroll({
          direction: data.direction,
          amount: data.amount ?? 3,
          smooth: data.smooth ?? true,
          duration: data.duration ?? 1000,
        });
        result = { success: true };
        break;

      default:
        result = {
          success: false,
          error: `Unknown mouse action type: ${type}`,
        };
    }

    return {
      success: result.success,
      actionId: action.id,
      device: action.device,
      error: result.error,
      data: result.data,
    };
  }

  /**
   * Executa ação do teclado
   */
  private async executeKeyboardAction(action: KeyboardAction): Promise<ExecutionResult> {
    const { type, data } = action.payload;

    let result: CommandResult;

    switch (type) {
      case 'type':
        result = await this.keyboardService.type({
          text: data.text,
          mode: data.mode,
          value: data.value,
        });
        break;

      case 'press':
        result = await this.keyboardService.pressKey(data.key);
        break;

      case 'combination':
        result = await this.keyboardService.combination(data.keys);
        break;

      default:
        result = {
          success: false,
          error: `Unknown keyboard action type: ${type}`,
        };
    }

    return {
      success: result.success,
      actionId: action.id,
      device: action.device,
      error: result.error,
      data: result.data,
    };
  }

  /**
   * Executa ação de clipboard
   */
  private async executeClipboardAction(action: ClipboardAction): Promise<ExecutionResult> {
    const { type } = action.payload;

    let result: CommandResult;

    switch (type) {
      case 'copy':
        // Para copy, precisamos capturar o conteúdo selecionado
        // Por enquanto, simularemos com Ctrl+C
        result = await this.keyboardService.combination(['ctrl', 'c']);
        break;

      case 'paste':
        // Para paste, simularemos com Ctrl+V
        result = await this.keyboardService.combination(['ctrl', 'v']);
        break;

      case 'clear':
        result = await this.clipboardService.clear();
        break;

      default:
        result = {
          success: false,
          error: `Unknown clipboard action type: ${type}`,
        };
    }

    return {
      success: result.success,
      actionId: action.id,
      device: action.device,
      error: result.error,
      data: result.data,
    };
  }

  /**
   * Executa ação de screen
   */
  private async executeScreenAction(action: ScreenAction): Promise<ExecutionResult> {
    const { type, data } = action.payload;

    let result: any;

    switch (type) {
      case 'capture':
        const captureResult = await this.screenService.capture({
          region: data.region,
          format: 'png',
        });
        result = {
          success: true,
          data: captureResult,
        };
        break;

      case 'find':
        const findResult = await this.screenService.findTemplate({
          template: data.template,
          confidence: data.confidence ?? 0.8,
          region: data.region,
        });
        result = {
          success: true,
          data: findResult,
        };
        break;

      case 'waitFor':
        const waitResult = await this.screenService.waitForTemplate(
          data.template,
          data.timeout,
          data.confidence,
        );
        result = {
          success: true,
          data: waitResult,
        };
        break;

      default:
        result = {
          success: false,
          error: `Unknown screen action type: ${type}`,
        };
    }

    return {
      success: result.success !== false,
      actionId: action.id,
      device: action.device,
      error: result.error,
      data: result.data || result,
    };
  }

  /**
   * Executa ação de LLM
   */
  private async executeLlmAction(action: LlmAction): Promise<ExecutionResult> {
    const { data } = action.payload;

    const result = await this.llmService.generateCompletion({
      prompt: data.prompt,
      model: (data.model as LlmModel) || LlmModel.GPT_4_1,
      temperature: data.temperature ?? 0.7,
      maxTokens: data.maxTokens ?? 1000,
      systemPrompt: data.systemPrompt,
      outputFormat:
        typeof data.outputFormat === 'string' ? JSON.parse(data.outputFormat) : data.outputFormat,
    });

    return {
      success: result.success,
      actionId: action.id,
      device: action.device,
      error: !result.success ? (result as any).error : undefined,
      data: result.success ? (result as any).data : undefined,
    };
  }

  /**
   * Executa ação de OCR
   */
  private async executeOcrAction(action: OcrAction): Promise<ExecutionResult> {
    const { data } = action.payload;

    const result = await this.ocrService.processImage(data.image, {
      languages: data.languages as
        | ('eng' | 'por' | 'spa' | 'fra' | 'deu' | 'ita' | 'jpn' | 'chi_sim')[]
        | undefined,
      mode: data.mode as 'fast' | 'balanced' | 'accurate',
    });

    return {
      success: result.success,
      actionId: action.id,
      device: action.device,
      error: result.error,
      data: {
        text: result.text,
        confidence: result.confidence,
        words: result.words,
        lines: result.lines,
      },
    };
  }

  /**
   * Função auxiliar para delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
