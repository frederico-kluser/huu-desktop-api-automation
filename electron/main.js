const { app, BrowserWindow, ipcMain, Menu, Tray, shell, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { spawn } = require('child_process');
const fs = require('fs');

// Enable live reload for Electron in development
if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit',
  });
}

// Keep a global reference of the window object
let mainWindow;
let backendProcess;
let tray;
let isQuitting = false;

// Configure auto-updater
const { autoUpdater } = require('electron-updater');

// Enable DevTools in development
if (isDev) {
  require('electron-debug')({ showDevTools: false });
}

// Function to create the main application window
function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: !isDev,
    },
    icon: path.join(__dirname, '..', 'assets', 'icon.png'),
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    show: false,
    frame: true,
    backgroundColor: '#ffffff',
  });

  // Load the app
  if (isDev) {
    // In development, load from webpack dev server
    mainWindow.loadURL('http://localhost:3001');

    // Open DevTools automatically in development
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built files
    mainWindow.loadFile(path.join(__dirname, '..', 'web', 'dist', 'index.html'));
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // Focus window on creation
    if (isDev) {
      mainWindow.focus();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle window minimize to tray
  mainWindow.on('minimize', (event) => {
    if (process.platform === 'darwin') return;

    event.preventDefault();
    mainWindow.hide();

    if (!isDev) {
      showTrayBalloon('App minimizado', 'O aplicativo está rodando em segundo plano');
    }
  });

  // Handle window close
  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();

      if (process.platform === 'darwin') {
        app.hide();
      } else {
        mainWindow.hide();
      }

      return false;
    }
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Setup application menu
  setupMenu();
}

// Setup application menu
function setupMenu() {
  const template = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Nova Automação',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('menu-new-automation');
          },
        },
        {
          label: 'Abrir Automação',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            mainWindow.webContents.send('menu-open-automation');
          },
        },
        {
          label: 'Salvar Automação',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            mainWindow.webContents.send('menu-save-automation');
          },
        },
        { type: 'separator' },
        {
          label: 'Importar',
          click: () => {
            mainWindow.webContents.send('menu-import');
          },
        },
        {
          label: 'Exportar',
          click: () => {
            mainWindow.webContents.send('menu-export');
          },
        },
        { type: 'separator' },
        {
          label: isDev ? 'Sair (Dev Mode)' : 'Sair',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            isQuitting = true;
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Editar',
      submenu: [
        { label: 'Desfazer', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: 'Refazer', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
        { type: 'separator' },
        { label: 'Recortar', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'Copiar', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'Colar', accelerator: 'CmdOrCtrl+V', role: 'paste' },
      ],
    },
    {
      label: 'Visualizar',
      submenu: [
        { label: 'Recarregar', accelerator: 'CmdOrCtrl+R', role: 'reload' },
        { label: 'Forçar Recarregamento', accelerator: 'CmdOrCtrl+Shift+R', role: 'forceReload' },
        { label: 'Alternar Tela Cheia', accelerator: 'F11', role: 'togglefullscreen' },
        { type: 'separator' },
        {
          label: 'Alternar Ferramentas do Desenvolvedor',
          accelerator: 'F12',
          click: () => {
            mainWindow.webContents.toggleDevTools();
          },
          visible: isDev,
        },
      ],
    },
    {
      label: 'Automação',
      submenu: [
        {
          label: 'Executar',
          accelerator: 'F5',
          click: () => {
            mainWindow.webContents.send('menu-execute-automation');
          },
        },
        {
          label: 'Parar',
          accelerator: 'Shift+F5',
          click: () => {
            mainWindow.webContents.send('menu-stop-automation');
          },
        },
        { type: 'separator' },
        {
          label: 'Gravar Macro',
          accelerator: 'CmdOrCtrl+Shift+R',
          click: () => {
            mainWindow.webContents.send('menu-record-macro');
          },
        },
        {
          label: 'Capturar Tela',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => {
            mainWindow.webContents.send('menu-capture-screen');
          },
        },
      ],
    },
    {
      label: 'Ferramentas',
      submenu: [
        {
          label: 'Configurações',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            mainWindow.webContents.send('menu-settings');
          },
        },
        {
          label: 'Gerenciar Templates',
          click: () => {
            mainWindow.webContents.send('menu-manage-templates');
          },
        },
        { type: 'separator' },
        {
          label: 'Console do Backend',
          click: () => {
            mainWindow.webContents.send('menu-backend-console');
          },
          visible: isDev,
        },
      ],
    },
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'Documentação',
          click: () => {
            shell.openExternal('https://github.com/huu-desktop-api-automation/docs');
          },
        },
        {
          label: 'Atalhos de Teclado',
          click: () => {
            mainWindow.webContents.send('menu-shortcuts');
          },
        },
        { type: 'separator' },
        {
          label: 'Reportar Problema',
          click: () => {
            shell.openExternal('https://github.com/huu-desktop-api-automation/issues');
          },
        },
        {
          label: 'Sobre',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Sobre HUU Desktop Automation',
              message: 'HUU Desktop Automation',
              detail: `Versão: ${app.getVersion()}\nElectron: ${process.versions.electron}\nNode: ${process.versions.node}\nChrome: ${process.versions.chrome}`,
              buttons: ['OK'],
            });
          },
        },
      ],
    },
  ];

  // macOS specific menu adjustments
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { label: 'Sobre ' + app.getName(), role: 'about' },
        { type: 'separator' },
        {
          label: 'Configurações...',
          accelerator: 'Cmd+,',
          click: () => mainWindow.webContents.send('menu-settings'),
        },
        { type: 'separator' },
        { label: 'Serviços', role: 'services', submenu: [] },
        { type: 'separator' },
        { label: 'Ocultar ' + app.getName(), accelerator: 'Cmd+H', role: 'hide' },
        { label: 'Ocultar Outros', accelerator: 'Cmd+Shift+H', role: 'hideothers' },
        { label: 'Mostrar Todos', role: 'unhide' },
        { type: 'separator' },
        {
          label: 'Sair',
          accelerator: 'Cmd+Q',
          click: () => {
            isQuitting = true;
            app.quit();
          },
        },
      ],
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Create system tray
function createTray() {
  if (process.platform === 'darwin') return; // macOS doesn't need tray

  const iconPath = path.join(__dirname, '..', 'assets', 'tray-icon.png');

  tray = new Tray(iconPath);
  tray.setToolTip('HUU Desktop Automation');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mostrar',
      click: () => {
        mainWindow.show();
        mainWindow.focus();
      },
    },
    {
      label: 'Executar Última Automação',
      click: () => {
        mainWindow.webContents.send('tray-execute-last');
      },
    },
    { type: 'separator' },
    {
      label: 'Sair',
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  // Click on tray icon shows the window
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

// Show tray balloon notification
function showTrayBalloon(title, content) {
  if (tray && process.platform === 'win32') {
    tray.displayBalloon({
      title: title,
      content: content,
      icon: path.join(__dirname, '..', 'assets', 'icon.png'),
    });
  }
}

// Start backend server
function startBackend() {
  if (isDev) {
    // In development, backend runs separately
    console.log('Development mode: Backend should be started separately');
    return;
  }

  // In production, start the backend as a child process
  const backendPath = path.join(__dirname, '..', 'dist', 'index.js');

  if (!fs.existsSync(backendPath)) {
    console.error('Backend not found. Please build the project first.');
    dialog.showErrorBox('Erro', 'Backend não encontrado. Por favor, compile o projeto primeiro.');
    app.quit();
    return;
  }

  backendProcess = spawn('node', [backendPath], {
    env: { ...process.env, ELECTRON_RUN_AS_NODE: '1' },
    stdio: 'pipe',
  });

  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend Error: ${data}`);
  });

  backendProcess.on('close', (code) => {
    console.log(`Backend process exited with code ${code}`);
    backendProcess = null;
  });
}

// Stop backend server
function stopBackend() {
  if (backendProcess) {
    backendProcess.kill('SIGTERM');
    backendProcess = null;
  }
}

// Setup IPC handlers
function setupIPC() {
  // Handle automation execution requests
  ipcMain.handle('execute-automation', async (event, actions) => {
    try {
      // Forward to backend API
      const response = await fetch('http://localhost:3000/api/v1/automation/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actions }),
      });

      return await response.json();
    } catch (error) {
      console.error('Error executing automation:', error);
      return { success: false, error: error.message };
    }
  });

  // Handle screenshot requests
  ipcMain.handle('capture-screenshot', async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/screen/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      return await response.json();
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      return { success: false, error: error.message };
    }
  });

  // Handle mouse position requests
  ipcMain.handle('get-mouse-position', async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/mouse/position');
      return await response.json();
    } catch (error) {
      console.error('Error getting mouse position:', error);
      return { success: false, error: error.message };
    }
  });

  // Handle backend status check
  ipcMain.handle('check-backend-status', async () => {
    try {
      const response = await fetch('http://localhost:3000/health');
      return response.ok;
    } catch (error) {
      return false;
    }
  });

  // Handle app version request
  ipcMain.handle('get-app-version', () => {
    return app.getVersion();
  });

  // Handle platform info request
  ipcMain.handle('get-platform-info', () => {
    return {
      platform: process.platform,
      arch: process.arch,
      version: process.getSystemVersion(),
      electron: process.versions.electron,
      node: process.versions.node,
    };
  });

  // Handle file dialog for automations
  ipcMain.handle('show-save-dialog', async (event, options) => {
    const result = await dialog.showSaveDialog(mainWindow, {
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'All Files', extensions: ['*'] },
      ],
      ...options,
    });
    return result;
  });

  ipcMain.handle('show-open-dialog', async (event, options) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'All Files', extensions: ['*'] },
      ],
      ...options,
    });
    return result;
  });

  // Handle app control
  ipcMain.on('app-minimize', () => {
    mainWindow.minimize();
  });

  ipcMain.on('app-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on('app-close', () => {
    mainWindow.close();
  });
}

// App event handlers
app.whenReady().then(() => {
  createWindow();
  createTray();
  setupIPC();
  startBackend();

  // Setup auto-updater
  if (!isDev) {
    autoUpdater.checkForUpdatesAndNotify();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  } else {
    mainWindow.show();
  }
});

app.on('before-quit', () => {
  isQuitting = true;
  stopBackend();
});

app.on('will-quit', (event) => {
  if (backendProcess) {
    event.preventDefault();
    stopBackend();
    setTimeout(() => app.quit(), 1000);
  }
});

// Handle certificate errors
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (isDev) {
    // Ignore certificate errors in development
    event.preventDefault();
    callback(true);
  } else {
    // Use default behavior in production
    callback(false);
  }
});

// Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});
