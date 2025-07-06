import { useState, useCallback, useEffect } from 'react';
import { StatusResult } from '../types/status.types';

const STATUS_CACHE_TTL = 60_000; // 60 segundos
const STATUS_CACHE_KEY = 'nutjs:lastStatus';
const REQUEST_TIMEOUT = 5000; // 5 segundos

/**
 * Hook para gerenciar verificação de status da API
 * @returns {Object} Estado e funções para gerenciar status da API
 */
export const useStatus = () => {
  const [status, setStatus] = useState<StatusResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega status do cache se ainda válido
   */
  useEffect(() => {
    try {
      const cached = localStorage.getItem(STATUS_CACHE_KEY);
      if (cached) {
        const parsedCache = JSON.parse(cached);
        const now = Date.now();
        const cacheTime = new Date(parsedCache.checkedAt).getTime();

        if (now - cacheTime < STATUS_CACHE_TTL) {
          setStatus(parsedCache);
        }
      }
    } catch (err) {
      // Cache corrompido, limpar
      localStorage.removeItem(STATUS_CACHE_KEY);
    }
  }, []);

  /**
   * Verifica o status da API
   */
  const checkStatus = useCallback(async () => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    const startTime = Date.now();

    try {
      const response = await fetch('/api/v1/status', {
        signal: controller.signal,
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      clearTimeout(timeoutId);
      const latency = Date.now() - startTime;

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      const result: StatusResult = {
        ok: true,
        latency,
        message: data.message || 'API está funcionando corretamente',
        checkedAt: new Date().toISOString(),
      };

      setStatus(result);

      // Salvar no cache
      try {
        localStorage.setItem(STATUS_CACHE_KEY, JSON.stringify(result));
      } catch (err) {
        // Ignorar erro de localStorage cheio
      }
    } catch (err) {
      clearTimeout(timeoutId);
      const latency = Date.now() - startTime;

      let message = 'Erro ao verificar status da API';
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          message = 'Tempo limite excedido (5s)';
        } else {
          message = err.message;
        }
      }

      const result: StatusResult = {
        ok: false,
        latency: latency || -1,
        message,
        checkedAt: new Date().toISOString(),
      };

      setStatus(result);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Limpa o cache de status
   */
  const clearCache = useCallback(() => {
    localStorage.removeItem(STATUS_CACHE_KEY);
    setStatus(null);
  }, []);

  return {
    status,
    loading,
    error,
    checkStatus,
    clearCache,
  };
};
