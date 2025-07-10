import 'reflect-metadata';
import { container } from 'tsyringe';
import { MouseService } from '../application/services/mouse.service.js';
import { ScreenService } from '../application/services/screen.service.js';
import { KeyboardService } from '../application/services/keyboard.service.js';
import { ClipboardService } from '../application/services/clipboard.service.js';
import { LLMService } from '../application/services/llm.service.js';
import { NutJSMouseAdapter } from '../infrastructure/adapters/nutjs/nutjs-mouse.adapter.js';
import { NutJSScreenAdapter } from '../infrastructure/adapters/nutjs/nutjs-screen.adapter.js';
import { NutJSKeyboardAdapter } from '../infrastructure/adapters/nutjs/nutjs-keyboard.adapter.js';
import { LangChainLLMAdapter } from '../infrastructure/adapters/langchain/langchain-llm.adapter.js';
import { EventDispatcher } from '../application/services/event-dispatcher.service.js';
import { EventBuffer } from '../application/services/event-buffer.service.js';
import { InputEventsController } from '../interface/controllers/input-events.controller.js';
import { GlobalInputCaptureService } from '../application/services/global-input-capture.service.js';
import { ApplicationStartupService } from '../application/services/application-startup.service.js';
import { OutputParserFactory } from '../application/factory/output-parser.factory.js';
import { ImagePreprocessor } from '../application/services/image-preprocessor.service.js';
import { OcrWorkerPool } from '../application/services/ocr-worker-pool.service.js';
import { OcrService } from '../application/services/ocr.service.js';
import { OcrController } from '../interface/controllers/ocr.controller.js';

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

  container.register('IKeyboardAdapter', {
    useClass: NutJSKeyboardAdapter,
  });

  container.register('KeyboardService', {
    useClass: KeyboardService,
  });

  container.register('ClipboardService', {
    useClass: ClipboardService,
  });

  container.register('LLMAdapter', {
    useClass: LangChainLLMAdapter,
  });

  container.register('LLMService', {
    useClass: LLMService,
  });

  // Registrar OutputParserFactory como singleton
  container.registerInstance('OutputParserFactory', OutputParserFactory.getInstance());

  // Registrar EventDispatcher como singleton
  container.registerSingleton(EventDispatcher);

  // Registrar EventBuffer como singleton
  container.registerSingleton(EventBuffer);

  // Registrar InputEventsController
  container.register(InputEventsController, {
    useClass: InputEventsController,
  });

  // Registrar GlobalInputCaptureService como singleton
  container.registerSingleton(GlobalInputCaptureService);

  // Registrar ApplicationStartupService
  container.register(ApplicationStartupService, {
    useClass: ApplicationStartupService,
  });

  // Registrar serviços OCR
  // ImagePreprocessor como singleton para reutilização
  container.registerSingleton(ImagePreprocessor);

  // OcrWorkerPool como singleton para manter pool de workers
  container.registerSingleton(OcrWorkerPool);

  // OcrService como transient (nova instância por requisição)
  container.register(OcrService, {
    useClass: OcrService,
  });

  // OcrController
  container.register(OcrController, {
    useClass: OcrController,
  });
}

export { container };
