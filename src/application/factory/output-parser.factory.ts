import { z } from 'zod';
import { logger } from '../../config/logger.js';
import { outputFormatConfig } from '../../config/output-format.config.js';
import { validateSchemaDepth, sanitizeSchema } from '../dto/output-format.dto.js';
import type { OutputFormat } from '../dto/output-format.dto.js';

/**
 * Interface para estratégias de parsing de output
 * Permite implementar diferentes engines de validação
 */
export interface IOutputParserStrategy {
  /**
   * Faz parsing do conteúdo usando o esquema fornecido
   * @param content - Conteúdo bruto do LLM
   * @param schema - Esquema de validação
   * @returns Conteúdo validado e formatado
   */
  parse<T>(content: string, schema: OutputFormat): Promise<T>;

  /**
   * Valida se o esquema é suportado pela estratégia
   * @param schema - Esquema a ser validado
   * @returns True se suportado
   */
  isSupported(schema: OutputFormat): boolean;
}

/**
 * Cache para esquemas compilados
 * Melhora performance evitando recompilação
 */
class SchemaCache {
  private cache = new Map<string, { schema: z.ZodType; timestamp: number }>();

  /**
   * Gera chave única para o esquema
   * @param schema - Esquema para gerar chave
   * @returns Chave única
   */
  private generateKey(schema: OutputFormat): string {
    return Buffer.from(JSON.stringify(schema)).toString('base64');
  }

  /**
   * Obtém esquema compilado do cache
   * @param schema - Esquema original
   * @returns Esquema compilado ou null se não encontrado
   */
  get(schema: OutputFormat): z.ZodType | null {
    const key = this.generateKey(schema);
    const cached = this.cache.get(key);

    if (!cached) {
      return null;
    }

    // Verifica se não expirou
    const now = Date.now();
    const maxAge = outputFormatConfig.cacheTtl * 60 * 1000; // Converte para ms

    if (now - cached.timestamp > maxAge) {
      this.cache.delete(key);
      return null;
    }

    return cached.schema;
  }

  /**
   * Armazena esquema compilado no cache
   * @param schema - Esquema original
   * @param compiled - Esquema compilado
   */
  set(schema: OutputFormat, compiled: z.ZodType): void {
    const key = this.generateKey(schema);
    this.cache.set(key, {
      schema: compiled,
      timestamp: Date.now(),
    });
  }

  /**
   * Limpa cache expirado
   */
  cleanup(): void {
    const now = Date.now();
    const maxAge = outputFormatConfig.cacheTtl * 60 * 1000;

    for (const [key, cached] of this.cache.entries()) {
      if (now - cached.timestamp > maxAge) {
        this.cache.delete(key);
      }
    }
  }
}

/**
 * Estratégia de parsing usando Zod
 * Implementação principal para validação de esquemas
 */
export class ZodParserStrategy implements IOutputParserStrategy {
  private cache = new SchemaCache();

  /**
   * Converte OutputFormat para esquema Zod
   * @param schema - Esquema de entrada
   * @returns Esquema Zod compilado
   */
  private buildZodSchema(schema: OutputFormat): z.ZodType {
    // Verifica cache primeiro
    const cached = this.cache.get(schema);
    if (cached) {
      return cached;
    }

    const zodSchema = this.convertToZod(schema);

    // Armazena no cache
    this.cache.set(schema, zodSchema);

    return zodSchema;
  }

  /**
   * Converte recursivamente OutputFormat para Zod
   * @param schema - Esquema a ser convertido
   * @returns Esquema Zod
   */
  private convertToZod(schema: OutputFormat): z.ZodType {
    switch (schema.type) {
      case 'string':
        return z.string();

      case 'number':
        return z.number();

      case 'boolean':
        return z.boolean();

      case 'array':
        if (schema.items) {
          const itemSchema = this.convertToZod(schema.items as OutputFormat);
          return z.array(itemSchema);
        }
        return z.array(z.any());

      case 'object':
        if (schema.properties) {
          const zodProperties: Record<string, z.ZodType> = {};

          for (const [key, propSchema] of Object.entries(schema.properties)) {
            zodProperties[key] = this.convertToZod(propSchema as OutputFormat);
          }

          const objectSchema = z.object(zodProperties);

          // Aplica campos obrigatórios
          if (schema.required && schema.required.length > 0) {
            // Zod já trata required através do objeto base
            // Campos opcionais devem ser marcados com .optional()
          }

          // Configura propriedades adicionais
          if (schema.additionalProperties === false) {
            return objectSchema.strict();
          }

          return objectSchema;
        }
        return z.object({});

      default:
        return z.any();
    }
  }

  /**
   * Faz parsing do conteúdo usando o esquema fornecido
   * @param content - Conteúdo bruto do LLM
   * @param schema - Esquema de validação
   * @returns Conteúdo validado e formatado
   */
  parse<T>(content: string, schema: OutputFormat): T {
    try {
      const startTime = Date.now();

      // Sanitiza o esquema
      const sanitizedSchema = sanitizeSchema(schema) as OutputFormat;

      // Compila o esquema Zod
      const zodSchema = this.buildZodSchema(sanitizedSchema);

      // Tenta fazer parsing do JSON
      let parsedContent: unknown;
      try {
        parsedContent = JSON.parse(content);
      } catch (error) {
        throw new Error(
          `Conteúdo LLM não é JSON válido: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        );
      }

      // Valida com Zod
      const result: unknown = zodSchema.parse(parsedContent);

      const processingTime = Date.now() - startTime;

      if (outputFormatConfig.enableDebugLogs) {
        logger.info('Output parsing successful', {
          processingTime,
          schemaType: schema.type,
          cacheHit: this.cache.get(schema) !== null,
        });
      }

      return result as T;
    } catch (error) {
      logger.error('Output parsing failed', {
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        schemaType: schema.type,
        contentLength: content.length,
      });

      throw error;
    }
  }

  /**
   * Valida se o esquema é suportado pela estratégia
   * @param schema - Esquema a ser validado
   * @returns True se suportado
   */
  isSupported(schema: OutputFormat): boolean {
    // Verifica profundidade
    if (!validateSchemaDepth(schema, outputFormatConfig.maxDepth)) {
      return false;
    }

    // Verifica tipos suportados
    const supportedTypes = ['string', 'number', 'boolean', 'array', 'object'];
    return supportedTypes.includes(schema.type);
  }
}

/**
 * Factory para criar parsers de output
 * Centraliza a criação de estratégias de parsing
 */
export class OutputParserFactory {
  private static instance: OutputParserFactory;
  private strategies: Map<string, IOutputParserStrategy>;

  private constructor() {
    this.strategies = new Map();
    this.registerDefaultStrategies();
  }

  /**
   * Obtém instância singleton do factory
   * @returns Instância do factory
   */
  static getInstance(): OutputParserFactory {
    if (!OutputParserFactory.instance) {
      OutputParserFactory.instance = new OutputParserFactory();
    }
    return OutputParserFactory.instance;
  }

  /**
   * Registra estratégias padrão
   */
  private registerDefaultStrategies(): void {
    this.strategies.set('zod', new ZodParserStrategy());
  }

  /**
   * Registra nova estratégia de parsing
   * @param name - Nome da estratégia
   * @param strategy - Implementação da estratégia
   */
  registerStrategy(name: string, strategy: IOutputParserStrategy): void {
    this.strategies.set(name, strategy);
  }

  /**
   * Obtém estratégia de parsing adequada para o esquema
   * @param schema - Esquema a ser processado
   * @returns Estratégia de parsing
   */
  getStrategy(schema: OutputFormat): IOutputParserStrategy {
    // Por enquanto, usa sempre Zod
    // Futuramente pode implementar lógica para escolher estratégia
    const strategy = this.strategies.get('zod');

    if (!strategy) {
      throw new Error('Nenhuma estratégia de parsing disponível');
    }

    if (!strategy.isSupported(schema)) {
      throw new Error(`Esquema não suportado: ${schema.type}`);
    }

    return strategy;
  }

  /**
   * Limpa caches de todas as estratégias
   */
  cleanup(): void {
    for (const strategy of this.strategies.values()) {
      if (strategy instanceof ZodParserStrategy) {
        strategy['cache'].cleanup();
      }
    }
  }
}

// Executa limpeza de cache periodicamente
if (outputFormatConfig.enableCache) {
  setInterval(
    () => {
      OutputParserFactory.getInstance().cleanup();
    },
    outputFormatConfig.cacheTtl * 60 * 1000,
  ); // Limpa a cada TTL
}
