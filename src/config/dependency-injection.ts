import 'reflect-metadata';
import { container } from 'tsyringe';
import { MouseService } from '../application/services/mouse.service.js';
import { ScreenService } from '../application/services/screen.service.js';
import { AutomationService } from '../application/services/automation.service.js';
import { NutJSMouseAdapter } from '../infrastructure/adapters/nutjs/nutjs-mouse.adapter.js';
import { NutJSScreenAdapter } from '../infrastructure/adapters/nutjs/nutjs-screen.adapter.js';
import { ExecuteAutomationUseCase } from '../domain/use-cases/execute-automation.use-case.js';

export function configureDependencies(): void {
  container.register('MouseAdapter', {
    useClass: NutJSMouseAdapter,
  });

  container.register('ScreenAdapter', {
    useClass: NutJSScreenAdapter,
  });

  container.register('MouseService', {
    useClass: MouseService,
  });

  container.register('ScreenService', {
    useClass: ScreenService,
  });

  container.register('AutomationService', {
    useClass: AutomationService,
  });

  container.register('ExecuteAutomationUseCase', {
    useClass: ExecuteAutomationUseCase,
  });
}

export { container };