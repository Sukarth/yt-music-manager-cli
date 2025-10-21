# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interface Layer                      │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Electron Renderer                       │  │
│  │                                                            │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │ Playlists  │  │    Sync    │  │  Settings  │         │  │
│  │  │    Page    │  │    Page    │  │    Page    │  ...    │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │         app.js (Application Logic)                   │ │  │
│  │  │  - State management                                  │ │  │
│  │  │  - Event handling                                    │ │  │
│  │  │  - API communication                                 │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │         styles.css (Modern UI Styling)               │ │  │
│  │  │  - Dark theme                                        │ │  │
│  │  │  - Responsive layout                                 │ │  │
│  │  │  - Animations                                        │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ IPC (Inter-Process Communication)
                            │ window.api.* methods
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                   Communication Layer                            │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    preload.js                             │  │
│  │                                                            │  │
│  │  - contextBridge.exposeInMainWorld()                      │  │
│  │  - Secure API exposure                                    │  │
│  │  - Context isolation                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ ipcRenderer.invoke()
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                     Electron Main Process                        │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                       main.js                             │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │  IPC Handlers                                        │ │  │
│  │  │  - execute-ytmm-command                              │ │  │
│  │  │  - get-playlists                                     │ │  │
│  │  │  - add-playlist                                      │ │  │
│  │  │  - sync-playlists                                    │ │  │
│  │  │  - remove-playlist                                   │ │  │
│  │  │  - get-config / set-config                           │ │  │
│  │  │  - auth-status / auth-mode                           │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │  Window Management                                   │ │  │
│  │  │  - createWindow()                                    │ │  │
│  │  │  - app lifecycle                                     │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ child_process.spawn()
                            │ Python subprocess
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                    Backend Integration Layer                     │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Python CLI (yt-music-manager-cli)            │  │
│  │                                                            │  │
│  │  Commands:                                                 │  │
│  │  - ytmm list-playlists                                    │  │
│  │  - ytmm add-playlist <url>                                │  │
│  │  - ytmm sync [--all]                                      │  │
│  │  - ytmm remove-playlist <id>                              │  │
│  │  - ytmm config [list|set]                                 │  │
│  │  - ytmm auth [status|mode]                                │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ YouTube API / yt-dlp
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                       External Services                          │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐ │
│  │   YouTube API   │  │     yt-dlp      │  │  Google OAuth  │ │
│  │                 │  │                 │  │                │ │
│  │  - Playlist     │  │  - Video        │  │  - Sign in     │ │
│  │    metadata     │  │    download     │  │  - Tokens      │ │
│  │  - Video info   │  │  - Audio        │  │                │ │
│  └─────────────────┘  │    extraction   │  └────────────────┘ │
│                       └─────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Adding a Playlist

```
User Interface (Add Playlist Button)
         ↓
    app.js (addPlaylist function)
         ↓
    window.api.addPlaylist(url, name)
         ↓
    preload.js (IPC bridge)
         ↓
    main.js (ipcMain.handle('add-playlist'))
         ↓
    spawn('python', ['-m', 'yt_music_manager_cli.cli', 'add-playlist', url])
         ↓
    Python CLI (ytmm add-playlist)
         ↓
    YouTube API (fetch playlist info)
         ↓
    Database/Config (save playlist)
         ↓
    Response back through IPC chain
         ↓
    UI Update (refresh playlist list)
```

### Syncing Playlists

```
User Interface (Sync Button)
         ↓
    app.js (syncPlaylist/syncAllPlaylists)
         ↓
    window.api.syncPlaylists(playlistId)
         ↓
    main.js (ipcMain.handle('sync-playlists'))
         ↓
    spawn('python', ['-m', 'yt_music_manager_cli.cli', 'sync', ...])
         ↓
    Python CLI (ytmm sync)
         ↓
    yt-dlp (download videos)
         ↓
    File System (save audio files)
         ↓
    Response with status/progress
         ↓
    UI Update (show completion, update status)
```

## Component Responsibilities

### Frontend (Renderer)

**index.html**
- Structure and layout
- Page containers
- Modal templates
- Toast notifications

**styles.css**
- Visual design
- Theming
- Responsive layouts
- Animations

**app.js**
- Application state
- User interactions
- API calls
- DOM manipulation
- Error handling

### Communication (Preload)

**preload.js**
- Security boundary
- API exposure
- Context isolation
- Type-safe IPC bridge

### Backend (Main)

**main.js**
- Application lifecycle
- Window management
- IPC handlers
- Process spawning
- Command execution

### External (Python CLI)

**ytmm**
- Playlist management
- Video downloading
- Configuration
- Authentication
- File organization

## Security Model

```
┌─────────────────────────────────────────┐
│  Renderer Process (Untrusted)           │
│  - No direct Node.js access             │
│  - No direct file system access         │
│  - No direct process spawning           │
│  - Only API exposed by preload          │
└───────────────┬─────────────────────────┘
                │
                │ Controlled API
                │
┌───────────────┴─────────────────────────┐
│  Preload Script (Bridge)                │
│  - contextIsolation: true               │
│  - Whitelisted APIs only                │
│  - Type validation                      │
└───────────────┬─────────────────────────┘
                │
                │ IPC
                │
┌───────────────┴─────────────────────────┐
│  Main Process (Trusted)                 │
│  - Full Node.js access                  │
│  - Process spawning                     │
│  - File system access                   │
│  - System integration                   │
└─────────────────────────────────────────┘
```

## Build Process

```
Source Files
     ↓
npm run build
     ↓
electron-builder
     ↓
┌─────────┬────────┬───────┐
│  macOS  │ Windows│ Linux │
│         │        │       │
│  .dmg   │  .exe  │.AppImage
│  .zip   │ .nsis  │  .deb │
│         │portable│  .rpm │
└─────────┴────────┴───────┘
     ↓
Distribution
```

## Deployment Options

### Development
```bash
npm start → Electron in dev mode
```

### Production
```bash
npm run build → Platform-specific packages
```

### Distribution Channels
- GitHub Releases
- Direct download
- Package managers (Homebrew, Chocolatey, Snap)
- App stores (future)

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Electron | Desktop application framework |
| **Frontend** | HTML5/CSS3/JS | User interface |
| **Styling** | Custom CSS | Modern dark theme |
| **Backend** | Python | CLI tool integration |
| **IPC** | Electron IPC | Process communication |
| **Build** | electron-builder | Application packaging |
| **Package** | npm | Dependency management |

## Performance Considerations

- **Lazy Loading**: Pages load content only when visited
- **Efficient Updates**: DOM updates only when necessary
- **Process Isolation**: Renderer and main processes separated
- **Async Operations**: All I/O operations are asynchronous
- **Memory Management**: Proper cleanup and garbage collection

## Scalability

The architecture supports:
- **Multiple Windows**: Can spawn additional windows if needed
- **Background Tasks**: Main process can run tasks while UI is idle
- **Large Playlists**: Streaming and pagination ready
- **Concurrent Operations**: Multiple syncs can run simultaneously
- **Plugin System**: Extensible through IPC handlers
