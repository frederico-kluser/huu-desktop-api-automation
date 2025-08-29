const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App information
  getVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatformInfo: () => ipcRenderer.invoke('get-platform-info'),

  // Automation execution
  executeAutomation: (actions) => ipcRenderer.invoke('execute-automation', actions),
  captureScreenshot: () => ipcRenderer.invoke('capture-screenshot'),
  getMousePosition: () => ipcRenderer.invoke('get-mouse-position'),

  // Backend communication
  checkBackendStatus: () => ipcRenderer.invoke('check-backend-status'),

  // File operations
  showSaveDialog: (options) => ipcRenderer.invoke('show-save-dialog', options),
  showOpenDialog: (options) => ipcRenderer.invoke('show-open-dialog', options),

  // Window controls
  minimizeApp: () => ipcRenderer.send('app-minimize'),
  maximizeApp: () => ipcRenderer.send('app-maximize'),
  closeApp: () => ipcRenderer.send('app-close'),

  // Menu event listeners
  onMenuAction: (callback) => {
    const events = [
      'menu-new-automation',
      'menu-open-automation',
      'menu-save-automation',
      'menu-import',
      'menu-export',
      'menu-execute-automation',
      'menu-stop-automation',
      'menu-record-macro',
      'menu-capture-screen',
      'menu-settings',
      'menu-manage-templates',
      'menu-backend-console',
      'menu-shortcuts',
      'tray-execute-last',
    ];

    events.forEach((event) => {
      ipcRenderer.on(event, (_, ...args) => callback(event, ...args));
    });

    // Return cleanup function
    return () => {
      events.forEach((event) => {
        ipcRenderer.removeAllListeners(event);
      });
    };
  },

  // Remove all listeners
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
});

// Expose environment information
contextBridge.exposeInMainWorld('electronEnv', {
  isDev: process.env.NODE_ENV === 'development',
  platform: process.platform,
  arch: process.arch,
});

// Expose API endpoints (for development/production switching)
contextBridge.exposeInMainWorld('apiConfig', {
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:3000', // In production, backend runs on same port
  wsURL: process.env.NODE_ENV === 'development' ? 'ws://localhost:3000' : 'ws://localhost:3000',
});

// Performance monitoring
contextBridge.exposeInMainWorld('performance', {
  measure: (name, fn) => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
    return result;
  },
});

// Logging utilities
contextBridge.exposeInMainWorld('logger', {
  log: (...args) => console.log('[Renderer]', ...args),
  error: (...args) => console.error('[Renderer]', ...args),
  warn: (...args) => console.warn('[Renderer]', ...args),
  info: (...args) => console.info('[Renderer]', ...args),
  debug: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[Renderer]', ...args);
    }
  },
});

// Storage utilities (wrapper around localStorage with JSON support)
contextBridge.exposeInMainWorld('storage', {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  },
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  },
});

// Clipboard utilities
contextBridge.exposeInMainWorld('clipboard', {
  writeText: (text) => navigator.clipboard.writeText(text),
  readText: () => navigator.clipboard.readText(),
});

// Notification utilities
contextBridge.exposeInMainWorld('notification', {
  show: (title, options = {}) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '../assets/icon.png',
        ...options,
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, {
            icon: '../assets/icon.png',
            ...options,
          });
        }
      });
    }
  },
  requestPermission: () => Notification.requestPermission(),
});

// System information
contextBridge.exposeInMainWorld('system', {
  cpuUsage: () => process.cpuUsage(),
  memoryUsage: () => process.memoryUsage(),
  uptime: () => process.uptime(),
  versions: process.versions,
});

// Prevent the window from being closed accidentally
window.addEventListener('beforeunload', (e) => {
  // Check if there are unsaved changes
  const hasUnsavedChanges = localStorage.getItem('hasUnsavedChanges') === 'true';

  if (hasUnsavedChanges) {
    e.returnValue = 'Você tem alterações não salvas. Deseja realmente sair?';
    return e.returnValue;
  }
});

// Log that preload script has loaded successfully
console.log('[Preload] Electron Bridge initialized successfully');
console.log('[Preload] Platform:', process.platform);
console.log('[Preload] Node version:', process.versions.node);
console.log('[Preload] Electron version:', process.versions.electron);
