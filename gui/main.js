const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let pythonProcess = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    backgroundColor: '#1a1a2e',
    titleBarStyle: 'hiddenInset',
    icon: path.join(__dirname, 'assets', 'icon.png')
  });

  mainWindow.loadFile('renderer/index.html');

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (pythonProcess) {
    pythonProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for communication with renderer
ipcMain.handle('execute-ytmm-command', async (event, command, args = []) => {
  return new Promise((resolve, reject) => {
    const fullArgs = ['-m', 'yt_music_manager_cli.cli', command, ...args];
    const process = spawn('python', fullArgs);

    let stdout = '';
    let stderr = '';

    process.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, output: stdout });
      } else {
        reject({ success: false, error: stderr || stdout });
      }
    });

    process.on('error', (err) => {
      reject({ success: false, error: err.message });
    });
  });
});

ipcMain.handle('get-playlists', async () => {
  try {
    const result = await executeCommand('list-playlists', ['--detailed']);
    return { success: true, data: parsePlaylistOutput(result.output) };
  } catch (error) {
    return { success: false, error: error.error || error.message };
  }
});

ipcMain.handle('add-playlist', async (event, url, name) => {
  try {
    const args = [url];
    if (name) {
      args.push('--name', name);
    }
    const result = await executeCommand('add-playlist', args);
    return { success: true, message: result.output };
  } catch (error) {
    return { success: false, error: error.error || error.message };
  }
});

ipcMain.handle('sync-playlists', async (event, playlistName) => {
  try {
    const args = playlistName ? [playlistName] : ['--all'];
    const result = await executeCommand('sync', args);
    return { success: true, message: result.output };
  } catch (error) {
    return { success: false, error: error.error || error.message };
  }
});

ipcMain.handle('remove-playlist', async (event, playlistId, keepFiles) => {
  try {
    const args = [playlistId];
    if (keepFiles) {
      args.push('--keep-files');
    }
    const result = await executeCommand('remove-playlist', args);
    return { success: true, message: result.output };
  } catch (error) {
    return { success: false, error: error.error || error.message };
  }
});

ipcMain.handle('get-config', async () => {
  try {
    const result = await executeCommand('config', ['list']);
    return { success: true, config: parseConfigOutput(result.output) };
  } catch (error) {
    return { success: false, error: error.error || error.message };
  }
});

ipcMain.handle('set-config', async (event, key, value) => {
  try {
    const result = await executeCommand('config', ['set', key, value]);
    return { success: true, message: result.output };
  } catch (error) {
    return { success: false, error: error.error || error.message };
  }
});

ipcMain.handle('auth-status', async () => {
  try {
    const result = await executeCommand('auth', ['status']);
    return { success: true, status: result.output };
  } catch (error) {
    return { success: false, error: error.error || error.message };
  }
});

ipcMain.handle('auth-mode', async (event, mode) => {
  try {
    const result = await executeCommand('auth', ['mode', mode, '-y']);
    return { success: true, message: result.output };
  } catch (error) {
    return { success: false, error: error.error || error.message };
  }
});

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  return result.filePaths[0];
});

// Helper function to execute ytmm commands
function executeCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const fullArgs = ['-m', 'yt_music_manager_cli.cli', command, ...args];
    const process = spawn('python', fullArgs);

    let stdout = '';
    let stderr = '';

    process.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, output: stdout });
      } else {
        reject({ success: false, error: stderr || stdout });
      }
    });

    process.on('error', (err) => {
      reject({ success: false, error: err.message });
    });
  });
}

// Parse playlist output from CLI
function parsePlaylistOutput(output) {
  const playlists = [];
  const lines = output.split('\n');
  
  // Simple parsing - in production, you'd want more robust parsing
  // This is a placeholder that would need to be adjusted based on actual CLI output
  let currentPlaylist = null;
  
  for (const line of lines) {
    if (line.includes('Playlist:') || line.includes('Title:')) {
      if (currentPlaylist) {
        playlists.push(currentPlaylist);
      }
      currentPlaylist = { name: '', id: '', tracks: 0 };
    }
    // Add more parsing logic based on actual output format
  }
  
  if (currentPlaylist) {
    playlists.push(currentPlaylist);
  }
  
  return playlists;
}

// Parse config output from CLI
function parseConfigOutput(output) {
  const config = {};
  const lines = output.split('\n');
  
  for (const line of lines) {
    const match = line.match(/(.+?)\s*=\s*(.+)/);
    if (match) {
      config[match[1].trim()] = match[2].trim();
    }
  }
  
  return config;
}
