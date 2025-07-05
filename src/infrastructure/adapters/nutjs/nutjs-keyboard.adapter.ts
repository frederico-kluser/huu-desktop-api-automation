/**
 * Adaptador para controle de teclado usando NutJS
 * Fornece interface abstrata para operações de teclado independente da implementação
 */

import { keyboard, Key } from '@nut-tree-fork/nut-js';
import { injectable } from 'tsyringe';
import type { IKeyboardAdapter } from '../../../application/services/keyboard.service.js';

/**
 * Implementação do adaptador de teclado usando NutJS
 * Encapsula a biblioteca NutJS para operações de teclado
 */
@injectable()
export class NutJSKeyboardAdapter implements IKeyboardAdapter {
  /**
   * Digita um texto caractere por caractere
   * @param text - O texto a ser digitado
   * @throws {Error} Se a operação de digitação falhar
   */
  async type(text: string): Promise<void> {
    try {
      await keyboard.type(text);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to type text: ${message}`);
    }
  }

  /**
   * Pressiona uma tecla específica
   * @param key - A tecla a ser pressionada (e.g., 'Enter', 'Tab')
   * @throws {Error} Se a tecla não for suportada ou a operação falhar
   */
  async pressKey(key: string): Promise<void> {
    try {
      // Mapeamento de strings para teclas do NutJS
      const keyMap: Record<string, Key> = {
        enter: Key.Enter,
        tab: Key.Tab,
        escape: Key.Escape,
        space: Key.Space,
        backspace: Key.Backspace,
        delete: Key.Delete,
        up: Key.Up,
        down: Key.Down,
        left: Key.Left,
        right: Key.Right,
        home: Key.Home,
        end: Key.End,
        pageup: Key.PageUp,
        pagedown: Key.PageDown,
        f1: Key.F1,
        f2: Key.F2,
        f3: Key.F3,
        f4: Key.F4,
        f5: Key.F5,
        f6: Key.F6,
        f7: Key.F7,
        f8: Key.F8,
        f9: Key.F9,
        f10: Key.F10,
        f11: Key.F11,
        f12: Key.F12,
      };

      const nutKey = keyMap[key.toLowerCase()];
      if (!nutKey) {
        throw new Error(`Unsupported key: ${key}`);
      }

      await keyboard.pressKey(nutKey);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to press key '${key}': ${message}`);
    }
  }

  /**
   * Libera uma tecla específica (após pressKey)
   * @param key - A tecla a ser liberada
   * @throws {Error} Se a tecla não for suportada ou a operação falhar
   */
  async releaseKey(key: string): Promise<void> {
    try {
      const keyMap: Record<string, Key> = {
        enter: Key.Enter,
        tab: Key.Tab,
        escape: Key.Escape,
        space: Key.Space,
        backspace: Key.Backspace,
        delete: Key.Delete,
        up: Key.Up,
        down: Key.Down,
        left: Key.Left,
        right: Key.Right,
        home: Key.Home,
        end: Key.End,
        pageup: Key.PageUp,
        pagedown: Key.PageDown,
        f1: Key.F1,
        f2: Key.F2,
        f3: Key.F3,
        f4: Key.F4,
        f5: Key.F5,
        f6: Key.F6,
        f7: Key.F7,
        f8: Key.F8,
        f9: Key.F9,
        f10: Key.F10,
        f11: Key.F11,
        f12: Key.F12,
      };

      const nutKey = keyMap[key.toLowerCase()];
      if (!nutKey) {
        throw new Error(`Unsupported key: ${key}`);
      }

      await keyboard.releaseKey(nutKey);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to release key '${key}': ${message}`);
    }
  }

  /**
   * Realiza combinação de teclas (e.g., Ctrl+C, Cmd+V)
   * @param keys - Array de teclas para pressionar simultaneamente
   * @throws {Error} Se alguma tecla não for suportada ou a operação falhar
   */
  async combination(keys: string[]): Promise<void> {
    try {
      const keyMap: Record<string, Key> = {
        ctrl: Key.LeftControl,
        control: Key.LeftControl,
        alt: Key.LeftAlt,
        shift: Key.LeftShift,
        cmd: Key.LeftSuper,
        command: Key.LeftSuper,
        meta: Key.LeftSuper,
        win: Key.LeftSuper,
        a: Key.A,
        c: Key.C,
        v: Key.V,
        x: Key.X,
        z: Key.Z,
        y: Key.Y,
      };

      const nutKeys = keys.map((key) => {
        const nutKey = keyMap[key.toLowerCase()];
        if (!nutKey) {
          throw new Error(`Unsupported key in combination: ${key}`);
        }
        return nutKey;
      });

      // Pressiona todas as teclas em ordem
      for (const nutKey of nutKeys) {
        await keyboard.pressKey(nutKey);
      }

      // Libera todas as teclas em ordem reversa
      for (let i = nutKeys.length - 1; i >= 0; i--) {
        await keyboard.releaseKey(nutKeys[i]);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to perform key combination: ${message}`);
    }
  }

  /**
   * Aguarda um período de tempo
   * @param ms - Tempo em milissegundos para aguardar
   */
  async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
