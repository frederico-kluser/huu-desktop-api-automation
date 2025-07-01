import { injectable, inject } from 'tsyringe';
import type {
  AutomationCommand,
  CommandResult,
  MouseCommand,
  ScreenCommand,
} from '../../domain/entities/automation-command.js';
import type { IAutomationExecutor } from '../../domain/use-cases/execute-automation.use-case.js';
import { MouseService } from './mouse.service.js';
import { ScreenService } from './screen.service.js';
import type { MouseAction } from '../../domain/entities/mouse-action.js';

@injectable()
export class AutomationService implements IAutomationExecutor {
  constructor(
    @inject('MouseService')
    private readonly mouseService: MouseService,
    @inject('ScreenService')
    private readonly screenService: ScreenService,
  ) {}

  async execute(command: AutomationCommand): Promise<CommandResult> {
    try {
      switch (command.type) {
        case 'mouse':
          return await this.executeMouseCommand(command as MouseCommand);
        case 'screen':
          return await this.executeScreenCommand(command as ScreenCommand);
        case 'wait':
          return await command.execute();
        default:
          return {
            success: false,
            error: `Unknown command type: ${command.type}`,
          };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private async executeMouseCommand(command: MouseCommand): Promise<CommandResult> {
    const { action } = command;

    switch (action.type) {
      case 'move':
        if (!action.position) {
          return { success: false, error: 'Position required for move action' };
        }
        await this.mouseService.move({
          x: action.position.x,
          y: action.position.y,
          ...(action.options as any),
        });
        return { success: true };

      case 'click':
        await this.mouseService.click({
          x: action.position?.x,
          y: action.position?.y,
          ...(action.options as any),
        });
        return { success: true };

      case 'drag':
        const dragOptions = action.options as any;
        if (!action.position || !dragOptions?.to) {
          return { success: false, error: 'From and to positions required for drag action' };
        }
        await this.mouseService.drag({
          from: action.position,
          to: dragOptions.to,
          duration: dragOptions.duration || 1000,
          smooth: dragOptions.smooth !== undefined ? dragOptions.smooth : true,
        });
        return { success: true };

      case 'scroll':
        const scrollOptions = action.options as any;
        if (!scrollOptions?.direction || !scrollOptions?.amount) {
          return { success: false, error: 'Direction and amount required for scroll action' };
        }
        await this.mouseService.scroll({
          direction: scrollOptions.direction,
          amount: scrollOptions.amount,
          duration: scrollOptions.duration || 1000,
          smooth: scrollOptions.smooth !== undefined ? scrollOptions.smooth : true,
        });
        return { success: true };

      default:
        return { success: false, error: `Unknown mouse action: ${action.type}` };
    }
  }

  private async executeScreenCommand(command: ScreenCommand): Promise<CommandResult> {
    switch (command.operation) {
      case 'capture':
        const imageData = await this.screenService.capture({
          region: command.region,
          format: 'png',
        });
        return { success: true, data: { image: imageData } };

      case 'find':
        if (!command.template) {
          return { success: false, error: 'Template required for find operation' };
        }
        const matches = await this.screenService.findTemplate({
          template: command.template,
          region: command.region,
          confidence: 0.8,
        });
        return { success: true, data: { matches } };

      case 'waitFor':
        if (!command.template) {
          return { success: false, error: 'Template required for waitFor operation' };
        }
        const match = await this.screenService.waitForTemplate(command.template);
        return { success: true, data: { match } };

      default:
        return { success: false, error: `Unknown screen operation: ${command.operation}` };
    }
  }
}