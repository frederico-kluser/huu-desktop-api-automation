/**
 * Serviço singleton para despacho de eventos de input
 * Gerencia a distribuição de eventos de mouse e teclado para os ouvintes registrados
 */

import { injectable } from 'tsyringe';
import { nanoid } from 'nanoid';
import {
  type InputEvent,
  type IEventPublisher,
  type IEventListener,
  type MouseButton,
  type MouseClickEvent,
  type KeyboardEvent
} from '../../types/input-event.types.js';
import { environment } from '../../config/environment.js';
import { logger } from '../../config/logger.js';

/**
 * Interface para configuração do rate limiter
 */
interface RateLimiter {
  count: number;
  resetTime: number;
}

/**
 * Serviço de despacho de eventos
 * Implementa o padrão Observer para distribuir eventos de input
 */
@injectable()
export class EventDispatcher implements IEventPublisher {
  private static instance: EventDispatcher;
  private listeners: Set<IEventListener> = new Set();
  private eventQueue: InputEvent[] = [];
  private isProcessing = false;
  private rateLimiter: RateLimiter = { count: 0, resetTime: Date.now() };
  
  /** Taxa máxima de eventos por segundo (configurável) */
  private readonly maxEventsPerSecond: number;
  
  /** Regex para filtrar teclas imprimíveis */
  private readonly printableKeyRegex = /^[\x20-\x7E]$/;
  
  /**
   * Cria uma instância do EventDispatcher
   */
  constructor() {
    this.maxEventsPerSecond = parseInt(
      process.env.INPUT_EVENT_RATE || '5000',
      10
    );
  }
  
  /**
   * Obtém a instância única do EventDispatcher
   * @returns Instância singleton do EventDispatcher
   */
  static getInstance(): EventDispatcher {
    if (!EventDispatcher.instance) {
      EventDispatcher.instance = new EventDispatcher();
    }
    return EventDispatcher.instance;
  }
  
  /**
   * Registra um ouvinte de eventos
   * @param listener Ouvinte a ser registrado
   */
  addListener(listener: IEventListener): void {
    this.listeners.add(listener);
    logger.debug(`Listener registrado. Total: ${this.listeners.size}`);
  }
  
  /**
   * Remove um ouvinte de eventos
   * @param listener Ouvinte a ser removido
   */
  removeListener(listener: IEventListener): void {
    this.listeners.delete(listener);
    logger.debug(`Listener removido. Total: ${this.listeners.size}`);
  }
  
  /**
   * Despacha um evento de clique do mouse
   * @param button Botão clicado
   * @param x Coordenada X
   * @param y Coordenada Y
   * @param ts Timestamp (opcional)
   */
  dispatchMouseClick(
    button: MouseButton,
    x: number,
    y: number,
    ts?: number
  ): void {
    if (!this.checkRateLimit()) {
      logger.warn('Rate limit excedido para eventos de mouse');
      return;
    }
    
    const event: MouseClickEvent = {
      id: nanoid(),
      source: 'mouse',
      button,
      x: x || -1,
      y: y || -1,
      ts: ts || Date.now()
    };
    
    this.enqueueEvent(event);
  }
  
  /**
   * Despacha um evento de tecla digitada
   * @param key Tecla digitada
   * @param x Coordenada X do cursor
   * @param y Coordenada Y do cursor
   * @param ts Timestamp (opcional)
   */
  dispatchKeyPress(
    key: string,
    x: number,
    y: number,
    ts?: number
  ): void {
    if (!this.checkRateLimit()) {
      logger.warn('Rate limit excedido para eventos de teclado');
      return;
    }
    
    // Filtra teclas não imprimíveis
    if (!this.printableKeyRegex.test(key)) {
      logger.debug(`Tecla não imprimível ignorada: ${key.charCodeAt(0)}`);
      return;
    }
    
    const event: KeyboardEvent = {
      id: nanoid(),
      source: 'keyboard',
      key,
      x: x || -1,
      y: y || -1,
      ts: ts || Date.now()
    };
    
    this.enqueueEvent(event);
  }
  
  /**
   * Método genérico para despachar eventos
   * @param event Evento a ser despachado
   */
  dispatch(event: any): void {
    if (!this.checkRateLimit()) {
      logger.warn('Rate limit excedido para evento');
      return;
    }
    
    // Adicionar ID se não existir
    if (!event.id) {
      event.id = nanoid();
    }
    
    // Converter para formato compatível se necessário
    if (event.type === 'mouse' && event.data) {
      // Evento estendido de mouse
      this.enqueueEvent(event);
    } else if (event.type === 'keyboard' && event.data) {
      // Evento estendido de teclado
      this.enqueueEvent(event);
    } else {
      // Tentar processar como evento padrão
      this.enqueueEvent(event as InputEvent);
    }
  }
  
  /**
   * Adiciona um evento à fila para processamento
   * @param event Evento a ser enfileirado
   */
  private enqueueEvent(event: any): void {
    this.eventQueue.push(event);
    
    if (!this.isProcessing) {
      setImmediate(() => this.processQueue());
    }
  }
  
  /**
   * Processa a fila de eventos
   * Distribui eventos para todos os ouvintes registrados
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.eventQueue.length === 0) {
      return;
    }
    
    this.isProcessing = true;
    
    try {
      while (this.eventQueue.length > 0) {
        const event = this.eventQueue.shift();
        if (!event) continue;
        
        // Notifica todos os ouvintes
        for (const listener of this.listeners) {
          try {
            listener.onEvent(event);
          } catch (error) {
            logger.error('Erro ao notificar listener:', error);
          }
        }
      }
    } finally {
      this.isProcessing = false;
    }
  }
  
  /**
   * Verifica se o rate limit foi excedido
   * @returns true se dentro do limite, false caso contrário
   */
  private checkRateLimit(): boolean {
    const now = Date.now();
    
    // Reset do contador a cada segundo
    if (now - this.rateLimiter.resetTime >= 1000) {
      this.rateLimiter.count = 0;
      this.rateLimiter.resetTime = now;
    }
    
    if (this.rateLimiter.count >= this.maxEventsPerSecond) {
      return false;
    }
    
    this.rateLimiter.count++;
    return true;
  }
  
  /**
   * Obtém estatísticas do dispatcher
   * @returns Objeto com estatísticas atuais
   */
  getStats(): {
    listenersCount: number;
    queueSize: number;
    eventsPerSecond: number;
  } {
    return {
      listenersCount: this.listeners.size,
      queueSize: this.eventQueue.length,
      eventsPerSecond: this.rateLimiter.count
    };
  }
}