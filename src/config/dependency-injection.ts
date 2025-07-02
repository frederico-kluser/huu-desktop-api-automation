import 'reflect-metadata';
import { container } from 'tsyringe';
import { MouseService } from '../application/services/mouse.service.js';
import { ScreenService } from '../application/services/screen.service.js';
import { AutomationService } from '../application/services/automation.service.js';
import { KeyboardService } from '../application/services/keyboard.service.js';
import { ClipboardService } from '../application/services/clipboard.service.js';
import { NutJSMouseAdapter } from '../infrastructure/adapters/nutjs/nutjs-mouse.adapter.js';
import { NutJSScreenAdapter } from '../infrastructure/adapters/nutjs/nutjs-screen.adapter.js';
import { NutJSKeyboardAdapter } from '../infrastructure/adapters/nutjs/nutjs-keyboard.adapter.js';
import { ExecuteAutomationUseCase } from '../domain/use-cases/execute-automation.use-case.js';
import { EventDispatcher } from '../application/services/event-dispatcher.service.js';
import { EventBuffer } from '../application/services/event-buffer.service.js';
import { InputEventsController } from '../interface/controllers/input-events.controller.js';

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

  container.register('IKeyboardAdapter', {
    useClass: NutJSKeyboardAdapter,
  });

  container.register('KeyboardService', {
    useClass: KeyboardService,
  });

  container.register('ClipboardService', {
    useClass: ClipboardService,
  });

  // Registrar EventDispatcher como singleton
  container.registerSingleton(EventDispatcher);

  // Registrar EventBuffer como singleton
  container.registerSingleton(EventBuffer);

  // Registrar InputEventsController
  container.register(InputEventsController, {
    useClass: InputEventsController,
  });
}

export { container };
