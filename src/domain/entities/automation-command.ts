import { MouseAction } from './mouse-action.js';
import { ScreenRegion } from './screen-region.js';

export type CommandType = 'mouse' | 'keyboard' | 'screen' | 'wait';

export interface CommandResult {
  success: boolean;
  data?: any;
  error?: string;
}

export abstract class AutomationCommand {
  constructor(public readonly type: CommandType) {}

  abstract execute(): Promise<CommandResult>;
}

export class MouseCommand extends AutomationCommand {
  constructor(public readonly action: MouseAction) {
    super('mouse');
  }

  async execute(): Promise<CommandResult> {
    throw new Error('Execute method should be implemented by use case');
  }
}

export class ScreenCommand extends AutomationCommand {
  constructor(
    public readonly operation: 'capture' | 'find' | 'waitFor',
    public readonly template?: string,
    public readonly region?: ScreenRegion,
  ) {
    super('screen');
  }

  async execute(): Promise<CommandResult> {
    throw new Error('Execute method should be implemented by use case');
  }
}

export class WaitCommand extends AutomationCommand {
  constructor(public readonly duration: number) {
    super('wait');
  }

  async execute(): Promise<CommandResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, this.duration);
    });
  }
}