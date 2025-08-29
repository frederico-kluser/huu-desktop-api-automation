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

// Disable auto-download
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

// Enable DevTools in development
// Note: electron-debug module removed due to compatibility issues

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
    titleBarStyle: 'default', // Use default title bar for all platforms
    show: false,
    frame: true,
    movable: true, // Ensure window is movable
    backgroundColor: '#ffffff',
  });

  // Always load from built HTML file
  const indexPath = path.join(__dirname, '..', 'web', 'dist', 'index.html');

  // Check if HTML file exists first
  if (!fs.existsSync(indexPath)) {
    console.error('Frontend not built. Please run: npm run build:web');
    dialog.showErrorBox('Erro', 'Interface não encontrada. Execute: npm run build:web');
    app.quit();
    return;
  }

  // Wait for backend to be ready before loading
  const waitForBackend = async () => {
    let retries = 30; // 30 seconds timeout
    console.log('Waiting for backend to be ready...');

    while (retries > 0) {
      try {
        const response = await fetch('http://localhost:3000/health');
        if (response.ok) {
          console.log('✅ Backend is ready!');
          
          // Load the HTML file
          console.log('Loading HTML from:', indexPath);
          mainWindow.loadFile(indexPath);

          // Open DevTools in development
          if (isDev) {
            mainWindow.webContents.openDevTools();
          }
          
          // Log any load errors
          mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
            console.error('Failed to load:', errorCode, errorDescription);
          });
          
          mainWindow.webContents.on('did-finish-load', () => {
            console.log('✅ Page loaded successfully');
          });
          
          return;
        }
      } catch (e) {
        // Backend not ready yet
        console.log(`Waiting for backend... (${retries} retries left)`);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      retries--;
    }

    console.error('Backend failed to start - loading interface anyway');
    // Try to load the interface even if backend fails
    mainWindow.loadFile(indexPath);
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  };

  // Start loading after a short delay
  setTimeout(waitForBackend, 2000);

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
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
          label: 'Sair',
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
          label: 'Ferramentas do Desenvolvedor',
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

// Start backend server integrated with Electron
function startBackend() {
  // Prevent multiple backend starts
  if (backendProcess) {
    console.log('Backend already running, skipping start');
    return;
  }

  console.log('🚀 Starting integrated backend server...');

  // Kill any existing process on port 3000 first (synchronously)
  try {
    if (process.platform === 'win32') {
      require('child_process').execSync('taskkill /F /IM node.exe /FI "WINDOWTITLE eq *3000*"', { stdio: 'ignore' });
    } else {
      require('child_process').execSync('lsof -ti:3000 | xargs kill -9 2>/dev/null || true', { stdio: 'ignore' });
    }
    console.log('Port 3000 cleared');
  } catch (e) {
    console.log('No process found on port 3000');
  }

  // Determine backend path based on environment
  const backendCommand = isDev ? 'tsx' : 'node';
  const backendPath = isDev
    ? path.join(__dirname, '..', 'src', 'index.ts')
    : path.join(__dirname, '..', 'dist', 'index.js');

  // Check if backend exists in production
  if (!isDev && !fs.existsSync(backendPath)) {
    console.error('Backend not found. Building...');
    // Try to build backend
    const buildProcess = spawn('npm', ['run', 'build:prod'], {
      cwd: path.join(__dirname, '..'),
      shell: true,
      stdio: 'inherit',
    });

    buildProcess.on('close', (code) => {
      if (code === 0) {
        startBackendProcess();
      } else {
        dialog.showErrorBox('Erro', 'Falha ao compilar o backend');
        app.quit();
      }
    });
  } else {
    startBackendProcess();
  }

  function startBackendProcess() {
    // Use tsx for TypeScript in development, node for production
    const command = isDev
      ? path.join(__dirname, '..', 'node_modules', '.bin', backendCommand)
      : backendCommand;

    console.log(`Starting backend with: ${command} ${backendPath}`);

    backendProcess = spawn(command, [backendPath], {
      env: {
        ...process.env,
        ELECTRON_RUN_AS_NODE: '1',
        NODE_ENV: isDev ? 'development' : 'production',
        PORT: '3000',
        HOST: '127.0.0.1',
      },
      cwd: path.join(__dirname, '..'),
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
    });

    // Handle stdout with error checking
    if (backendProcess.stdout) {
      backendProcess.stdout.on('data', (data) => {
        try {
          const message = data.toString().trim();
          // Filter out noisy logs
          if (!message.includes('EventDispatcher.dispatch') && 
              !message.includes('Despachando evento') &&
              message.length > 0) {
            console.log(`[Backend] ${message}`);
          }
        } catch (e) {
          // Ignore logging errors to prevent EPIPE
        }
      });
    }

    // Handle stderr with error checking
    if (backendProcess.stderr) {
      backendProcess.stderr.on('data', (data) => {
        try {
          const message = data.toString().trim();
          if (message.length > 0) {
            console.error(`[Backend Error] ${message}`);
          }
        } catch (e) {
          // Ignore logging errors to prevent EPIPE
        }
      });
    }

    backendProcess.on('error', (error) => {
      console.error('Failed to start backend:', error);
      dialog.showErrorBox('Erro', `Falha ao iniciar backend: ${error.message}`);
    });

    backendProcess.on('close', (code) => {
      console.log(`Backend process exited with code ${code}`);
      backendProcess = null;

      // If app is not quitting, restart backend only if it crashed unexpectedly
      if (!isQuitting && code !== 0 && code !== null) {
        console.log('Backend crashed, restarting in 5 seconds...');
        backendProcess = null; // Clear the process reference
        setTimeout(() => {
          if (!isQuitting) {
            startBackend();
          }
        }, 5000);
      } else {
        backendProcess = null; // Clear the process reference
      }
    });
  }
}

// Stop backend server
function stopBackend() {
  if (backendProcess) {
    console.log('Stopping backend server...');

    // Try graceful shutdown first
    backendProcess.kill('SIGTERM');

    // Force kill after 5 seconds if still running
    setTimeout(() => {
      if (backendProcess) {
        backendProcess.kill('SIGKILL');
      }
    }, 5000);

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

// Handle uncaught exceptions to prevent crashes
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't exit on EPIPE errors
  if (error.code !== 'EPIPE') {
    dialog.showErrorBox('Erro Crítico', error.message);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// App event handlers
app.whenReady().then(() => {
  // Start backend first
  startBackend();

  // Then create window after a delay
  setTimeout(() => {
    createWindow();
    createTray();
    setupIPC();

    // Setup auto-updater
    if (!isDev) {
      // Check for updates but don't auto-download
      autoUpdater.checkForUpdates().catch((err) => {
        console.log('Auto-updater error:', err);
      });

      // Handle update events
      autoUpdater.on('update-available', (info) => {
        dialog.showMessageBox(mainWindow, {
          type: 'info',
          title: 'Atualização Disponível',
          message: `Versão ${info.version} está disponível. Deseja baixar?`,
          buttons: ['Sim', 'Não'],
        }).then((result) => {
          if (result.response === 0) {
            autoUpdater.downloadUpdate();
          }
        });
      });

      autoUpdater.on('update-downloaded', () => {
        dialog.showMessageBox(mainWindow, {
          type: 'info',
          title: 'Atualização Pronta',
          message: 'A atualização será instalada ao reiniciar o aplicativo.',
          buttons: ['Reiniciar Agora', 'Mais Tarde'],
        }).then((result) => {
          if (result.response === 0) {
            autoUpdater.quitAndInstall();
          }
        });
      });
    }
  }, 1000);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    isQuitting = true;
    stopBackend();
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
    setTimeout(() => app.quit(), 2000);
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
