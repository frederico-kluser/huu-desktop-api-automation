/**
 * Service for Electron integration
 * Detects if running in Electron and provides unified API
 */

// Types for Electron API
interface ElectronAPI {
  getVersion: () => Promise<string>;
  getPlatformInfo: () => Promise<any>;
  executeAutomation: (actions: any[]) => Promise<any>;
  captureScreenshot: () => Promise<any>;
  getMousePosition: () => Promise<any>;
  checkBackendStatus: () => Promise<boolean>;
  showSaveDialog: (options?: any) => Promise<any>;
  showOpenDialog: (options?: any) => Promise<any>;
  minimizeApp: () => void;
  maximizeApp: () => void;
  closeApp: () => void;
  onMenuAction: (callback: (event: string, ...args: any[]) => void) => () => void;
  removeAllListeners: (channel: string) => void;
}

interface ElectronEnv {
  isDev: boolean;
  platform: string;
  arch: string;
}

interface ApiConfig {
  baseURL: string;
  wsURL: string;
}

interface StorageAPI {
  get: (key: string) => any;
  set: (key: string, value: any) => boolean;
  remove: (key: string) => boolean;
  clear: () => boolean;
}

interface ClipboardAPI {
  writeText: (text: string) => Promise<void>;
  readText: () => Promise<string>;
}

interface NotificationAPI {
  show: (title: string, options?: NotificationOptions) => void;
  requestPermission: () => Promise<NotificationPermission>;
}

interface SystemAPI {
  cpuUsage: () => any;
  memoryUsage: () => any;
  uptime: () => number;
  versions: any;
}

interface LoggerAPI {
  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
}

// Extend window interface
declare global {
  interface Window {
    electronAPI?: ElectronAPI;
    electronEnv?: ElectronEnv;
    apiConfig?: ApiConfig;
    storage?: StorageAPI;
    clipboard?: ClipboardAPI;
    notification?: NotificationAPI;
    system?: SystemAPI;
    logger?: LoggerAPI;
    performance?: {
      measure: (name: string, fn: () => any) => any;
    };
  }
}

class ElectronService {
  private isElectron: boolean;
  private electronAPI?: ElectronAPI;
  private menuListenerCleanup?: () => void;

  constructor() {
    this.isElectron = this.detectElectron();
    this.electronAPI = window.electronAPI;

    if (this.isElectron) {
      this.initializeElectron();
    }
  }

  /**
   * Detect if running in Electron
   */
  private detectElectron(): boolean {
    // Check for Electron-specific globals
    if (typeof window !== 'undefined' && window.electronAPI) {
      return true;
    }

    // Check for Electron user agent
    if (typeof navigator !== 'undefined' && navigator.userAgent.includes('Electron')) {
      return true;
    }

    return false;
  }

  /**
   * Initialize Electron-specific features
   */
  private initializeElectron(): void {
    console.log('🖥️ Running in Electron environment');

    // Log platform information
    if (window.electronEnv) {
      console.log('Platform:', window.electronEnv.platform);
      console.log('Architecture:', window.electronEnv.arch);
      console.log('Development mode:', window.electronEnv.isDev);
    }

    // Setup global error handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      if (window.logger) {
        window.logger.error('Unhandled promise rejection:', event.reason);
      }
    });

    // Request notification permission
    if (window.notification) {
      window.notification.requestPermission();
    }
  }

  /**
   * Check if running in Electron
   */
  public isInElectron(): boolean {
    return this.isElectron;
  }

  /**
   * Get app version
   */
  public async getVersion(): Promise<string> {
    if (this.electronAPI) {
      return await this.electronAPI.getVersion();
    }
    return 'Web Version';
  }

  /**
   * Get platform information
   */
  public async getPlatformInfo(): Promise<any> {
    if (this.electronAPI) {
      return await this.electronAPI.getPlatformInfo();
    }
    return {
      platform: navigator.platform,
      userAgent: navigator.userAgent,
    };
  }

  /**
   * Execute automation actions
   */
  public async executeAutomation(actions: any[]): Promise<any> {
    if (this.electronAPI) {
      // Use Electron IPC
      return await this.electronAPI.executeAutomation(actions);
    } else {
      // Use direct API call
      const apiURL = window.apiConfig?.baseURL || 'http://localhost:3000';
      const response = await fetch(`${apiURL}/api/v1/automation/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actions }),
      });
      return await response.json();
    }
  }

  /**
   * Capture screenshot
   */
  public async captureScreenshot(): Promise<any> {
    if (this.electronAPI) {
      return await this.electronAPI.captureScreenshot();
    } else {
      const apiURL = window.apiConfig?.baseURL || 'http://localhost:3000';
      const response = await fetch(`${apiURL}/api/v1/screen/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return await response.json();
    }
  }

  /**
   * Get mouse position
   */
  public async getMousePosition(): Promise<any> {
    if (this.electronAPI) {
      return await this.electronAPI.getMousePosition();
    } else {
      const apiURL = window.apiConfig?.baseURL || 'http://localhost:3000';
      const response = await fetch(`${apiURL}/api/v1/mouse/position`);
      return await response.json();
    }
  }

  /**
   * Check backend status
   */
  public async checkBackendStatus(): Promise<boolean> {
    if (this.electronAPI) {
      return await this.electronAPI.checkBackendStatus();
    } else {
      try {
        const apiURL = window.apiConfig?.baseURL || 'http://localhost:3000';
        const response = await fetch(`${apiURL}/health`);
        return response.ok;
      } catch {
        return false;
      }
    }
  }

  /**
   * Show save dialog
   */
  public async showSaveDialog(options?: any): Promise<any> {
    if (this.electronAPI) {
      return await this.electronAPI.showSaveDialog(options);
    } else {
      // Web fallback - use browser download
      return { canceled: false, filePath: 'automation.json' };
    }
  }

  /**
   * Show open dialog
   */
  public async showOpenDialog(options?: any): Promise<any> {
    if (this.electronAPI) {
      return await this.electronAPI.showOpenDialog(options);
    } else {
      // Web fallback - use file input
      return new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e: any) => {
          const file = e.target.files[0];
          if (file) {
            resolve({ canceled: false, filePaths: [file.name], files: [file] });
          } else {
            resolve({ canceled: true });
          }
        };
        input.click();
      });
    }
  }

  /**
   * Window controls
   */
  public minimizeWindow(): void {
    if (this.electronAPI) {
      this.electronAPI.minimizeApp();
    }
  }

  public maximizeWindow(): void {
    if (this.electronAPI) {
      this.electronAPI.maximizeApp();
    }
  }

  public closeWindow(): void {
    if (this.electronAPI) {
      this.electronAPI.closeApp();
    } else {
      window.close();
    }
  }

  /**
   * Register menu action listener
   */
  public onMenuAction(callback: (action: string, ...args: any[]) => void): () => void {
    if (this.electronAPI) {
      // Clean up previous listener if exists
      if (this.menuListenerCleanup) {
        this.menuListenerCleanup();
      }

      // Register new listener
      this.menuListenerCleanup = this.electronAPI.onMenuAction(callback);
      return this.menuListenerCleanup;
    }

    // No-op for web
    return () => {};
  }

  /**
   * Storage utilities
   */
  public storage = {
    get: (key: string): any => {
      if (window.storage) {
        return window.storage.get(key);
      }
      // Fallback to localStorage
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch {
        return null;
      }
    },

    set: (key: string, value: any): boolean => {
      if (window.storage) {
        return window.storage.set(key, value);
      }
      // Fallback to localStorage
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },

    remove: (key: string): boolean => {
      if (window.storage) {
        return window.storage.remove(key);
      }
      // Fallback to localStorage
      try {
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    },

    clear: (): boolean => {
      if (window.storage) {
        return window.storage.clear();
      }
      // Fallback to localStorage
      try {
        localStorage.clear();
        return true;
      } catch {
        return false;
      }
    },
  };

  /**
   * Clipboard utilities
   */
  public clipboard = {
    writeText: async (text: string): Promise<void> => {
      if (window.clipboard) {
        return await window.clipboard.writeText(text);
      }
      // Fallback to navigator clipboard
      return await navigator.clipboard.writeText(text);
    },

    readText: async (): Promise<string> => {
      if (window.clipboard) {
        return await window.clipboard.readText();
      }
      // Fallback to navigator clipboard
      return await navigator.clipboard.readText();
    },
  };

  /**
   * Notification utilities
   */
  public notification = {
    show: (title: string, options?: NotificationOptions): void => {
      if (window.notification) {
        window.notification.show(title, options);
      } else if ('Notification' in window) {
        // Fallback to browser notifications
        if (Notification.permission === 'granted') {
          new Notification(title, options);
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              new Notification(title, options);
            }
          });
        }
      }
    },

    requestPermission: async (): Promise<NotificationPermission> => {
      if (window.notification) {
        return await window.notification.requestPermission();
      }
      // Fallback to browser API
      return await Notification.requestPermission();
    },
  };

  /**
   * Logging utilities
   */
  public logger = {
    log: (...args: any[]): void => {
      if (window.logger) {
        window.logger.log(...args);
      } else {
        console.log('[App]', ...args);
      }
    },

    error: (...args: any[]): void => {
      if (window.logger) {
        window.logger.error(...args);
      } else {
        console.error('[App]', ...args);
      }
    },

    warn: (...args: any[]): void => {
      if (window.logger) {
        window.logger.warn(...args);
      } else {
        console.warn('[App]', ...args);
      }
    },

    info: (...args: any[]): void => {
      if (window.logger) {
        window.logger.info(...args);
      } else {
        console.info('[App]', ...args);
      }
    },

    debug: (...args: any[]): void => {
      if (window.logger) {
        window.logger.debug(...args);
      } else if (process.env.NODE_ENV === 'development') {
        console.debug('[App]', ...args);
      }
    },
  };

  /**
   * Get API base URL
   */
  public getApiBaseURL(): string {
    if (window.apiConfig) {
      return window.apiConfig.baseURL;
    }
    // Default URLs
    return process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'http://localhost:3000';
  }

  /**
   * Get WebSocket URL
   */
  public getWsURL(): string {
    if (window.apiConfig) {
      return window.apiConfig.wsURL;
    }
    // Default URLs
    return process.env.NODE_ENV === 'development' ? 'ws://localhost:3000' : 'ws://localhost:3000';
  }

  /**
   * Clean up resources
   */
  public dispose(): void {
    if (this.menuListenerCleanup) {
      this.menuListenerCleanup();
      this.menuListenerCleanup = undefined;
    }

    if (this.electronAPI) {
      this.electronAPI.removeAllListeners('menu-action');
    }
  }
}

// Create singleton instance
const electronService = new ElectronService();

// Export service
export default electronService;
