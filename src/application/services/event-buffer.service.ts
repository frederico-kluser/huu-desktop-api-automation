/**
 * Serviço de buffer circular para armazenamento temporário de eventos
 * Permite replay de eventos após reconexão de clientes SSE
 */

import { injectable } from 'tsyringe';
import { type InputEvent } from '../../types/input-event.types.js';
import { logger } from '../../config/logger.js';

/**
 * Interface para entrada no buffer com metadados
 */
interface BufferEntry {
  event: InputEvent;
  addedAt: number;
}

/**
 * Serviço de buffer circular para eventos
 * Mantém um histórico limitado de eventos para replay
 */
@injectable()
export class EventBuffer {
  private buffer: BufferEntry[] = [];
  private readonly maxSize: number;
  private head = 0;
  private size = 0;
  
  /**
   * Cria uma instância do EventBuffer
   */
  constructor() {
    this.maxSize = parseInt(
      process.env.INPUT_EVENT_BUFFER || '1000',
      10
    );
    this.buffer = new Array(this.maxSize);
    logger.info(`EventBuffer inicializado com tamanho máximo: ${this.maxSize}`);
  }
  
  /**
   * Adiciona um evento ao buffer
   * @param event Evento a ser adicionado
   */
  add(event: InputEvent): void {
    const entry: BufferEntry = {
      event,
      addedAt: Date.now()
    };
    
    this.buffer[this.head] = entry;
    this.head = (this.head + 1) % this.maxSize;
    
    if (this.size < this.maxSize) {
      this.size++;
    }
    
    logger.debug(`Evento adicionado ao buffer. Size: ${this.size}, ID: ${event.id}`);
  }
  
  /**
   * Obtém eventos após um determinado ID
   * @param afterId ID do último evento recebido pelo cliente
   * @returns Array de eventos após o ID especificado
   */
  getEventsAfter(afterId: string | null): InputEvent[] {
    if (!afterId) {
      return this.getAllEvents();
    }
    
    const events: InputEvent[] = [];
    let foundId = false;
    
    // Percorre o buffer na ordem de inserção
    const startIndex = this.size < this.maxSize ? 0 : this.head;
    
    for (let i = 0; i < this.size; i++) {
      const index = (startIndex + i) % this.maxSize;
      const entry = this.buffer[index];
      
      if (!entry) continue;
      
      if (foundId) {
        events.push(entry.event);
      } else if (entry.event.id === afterId) {
        foundId = true;
      }
    }
    
    logger.debug(`Recuperados ${events.length} eventos após ID: ${afterId}`);
    return events;
  }
  
  /**
   * Obtém todos os eventos no buffer
   * @returns Array com todos os eventos
   */
  getAllEvents(): InputEvent[] {
    const events: InputEvent[] = [];
    const startIndex = this.size < this.maxSize ? 0 : this.head;
    
    for (let i = 0; i < this.size; i++) {
      const index = (startIndex + i) % this.maxSize;
      const entry = this.buffer[index];
      
      if (entry) {
        events.push(entry.event);
      }
    }
    
    return events;
  }
  
  /**
   * Obtém eventos dentro de um intervalo de tempo
   * @param sinceMs Timestamp mínimo em millisegundos
   * @returns Array de eventos após o timestamp especificado
   */
  getEventsSince(sinceMs: number): InputEvent[] {
    const events: InputEvent[] = [];
    const startIndex = this.size < this.maxSize ? 0 : this.head;
    
    for (let i = 0; i < this.size; i++) {
      const index = (startIndex + i) % this.maxSize;
      const entry = this.buffer[index];
      
      if (entry && entry.event.ts >= sinceMs) {
        events.push(entry.event);
      }
    }
    
    logger.debug(`Recuperados ${events.length} eventos desde timestamp: ${sinceMs}`);
    return events;
  }
  
  /**
   * Limpa o buffer
   */
  clear(): void {
    this.buffer = new Array(this.maxSize);
    this.head = 0;
    this.size = 0;
    logger.info('EventBuffer limpo');
  }
  
  /**
   * Obtém o tamanho atual do buffer
   * @returns Número de eventos no buffer
   */
  getSize(): number {
    return this.size;
  }
  
  /**
   * Obtém o ID do último evento no buffer
   * @returns ID do último evento ou null se vazio
   */
  getLastEventId(): string | null {
    if (this.size === 0) {
      return null;
    }
    
    const lastIndex = (this.head - 1 + this.maxSize) % this.maxSize;
    const lastEntry = this.buffer[lastIndex];
    
    return lastEntry ? lastEntry.event.id : null;
  }
  
  /**
   * Remove eventos mais antigos que o tempo especificado
   * @param maxAgeMs Idade máxima em millisegundos
   * @returns Número de eventos removidos
   */
  pruneOldEvents(maxAgeMs: number): number {
    const now = Date.now();
    const minTime = now - maxAgeMs;
    let removed = 0;
    
    // Cria um novo buffer apenas com eventos recentes
    const newBuffer: BufferEntry[] = [];
    const startIndex = this.size < this.maxSize ? 0 : this.head;
    
    for (let i = 0; i < this.size; i++) {
      const index = (startIndex + i) % this.maxSize;
      const entry = this.buffer[index];
      
      if (entry && entry.addedAt >= minTime) {
        newBuffer.push(entry);
      } else {
        removed++;
      }
    }
    
    // Atualiza o buffer
    this.buffer = new Array(this.maxSize);
    this.size = newBuffer.length;
    this.head = this.size % this.maxSize;
    
    // Copia os eventos mantidos
    newBuffer.forEach((entry, i) => {
      this.buffer[i] = entry;
    });
    
    if (removed > 0) {
      logger.info(`Removidos ${removed} eventos antigos do buffer`);
    }
    
    return removed;
  }
}