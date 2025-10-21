const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  // Playlist operations
  getPlaylists: () => ipcRenderer.invoke('get-playlists'),
  addPlaylist: (url, name) => ipcRenderer.invoke('add-playlist', url, name),
  syncPlaylists: (playlistName) => ipcRenderer.invoke('sync-playlists', playlistName),
  removePlaylist: (playlistId, keepFiles) => ipcRenderer.invoke('remove-playlist', playlistId, keepFiles),
  
  // Configuration
  getConfig: () => ipcRenderer.invoke('get-config'),
  setConfig: (key, value) => ipcRenderer.invoke('set-config', key, value),
  
  // Authentication
  authStatus: () => ipcRenderer.invoke('auth-status'),
  authMode: (mode) => ipcRenderer.invoke('auth-mode', mode),
  
  // System
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  
  // Execute raw command
  executeCommand: (command, args) => ipcRenderer.invoke('execute-ytmm-command', command, args)
});
