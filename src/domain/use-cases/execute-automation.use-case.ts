import { injectable, inject } from 'tsyringe';
import type { AutomationCommand, CommandResult } from '../entities/automation-command.js';

export interface IAutomationExecutor {
  execute(command: AutomationCommand): Promise<CommandResult>;
}

@injectable()
export class ExecuteAutomationUseCase {
  constructor(
    @inject('AutomationService')
    private readonly automationService: IAutomationExecutor,
  ) {}

  async execute(commands: AutomationCommand[]): Promise<CommandResult[]> {
    const results: CommandResult[] = [];

    for (const command of commands) {
      try {
        const result = await this.automationService.execute(command);
        results.push(result);

        if (!result.success) {
          break;
        }
      } catch (error) {
        results.push({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        break;
      }
    }

    return results;
  }
}