# YT Music Manager - GUI Application

Modern, cross-platform desktop application for managing YouTube music playlists.

## Features

- **Modern UI/UX**: Beautiful, dark-themed interface built with Electron
- **Cross-Platform**: Works on macOS, Windows, and Linux
- **Playlist Management**: Easy-to-use interface for adding, syncing, and removing playlists
- **Authentication**: Support for multiple authentication modes (no auth, Google OAuth, custom OAuth)
- **Settings**: Configurable download quality, format, location, and sync options
- **Real-time Updates**: Live sync progress and status updates

## Prerequisites

- **Node.js** (v14 or higher)
- **Python 3.8+** with `yt-music-manager-cli` package installed
- **npm** or **yarn**

## Installation

1. Install the YT Music Manager CLI Python package:
   ```bash
   pip install yt-music-manager-cli
   ```

2. Navigate to the GUI directory:
   ```bash
   cd gui
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Development

Run the application in development mode:

```bash
npm start
```

## Building

Build the application for your platform:

### macOS
```bash
npm run build:mac
```

### Windows
```bash
npm run build:win
```

### Linux
```bash
npm run build:linux
```

### All Platforms
```bash
npm run build
```

Built applications will be available in the `dist/` directory.

## Usage

### Starting the Application

Launch the built application or run `npm start` in development mode.

### Adding Playlists

1. Click the "Add Playlist" button
2. Enter the YouTube playlist URL or ID
3. Optionally provide a custom name
4. Click "Add Playlist"

### Syncing Playlists

- **Single Playlist**: Click the "Sync" button on any playlist card
- **All Playlists**: Click "Sync All" on the Sync page

### Configuring Settings

1. Navigate to the Settings page
2. Configure download location, quality, format, and sync options
3. Click "Save Settings"

### Authentication

1. Navigate to the Authentication page
2. Choose your preferred authentication method:
   - **No Authentication**: Public playlists only
   - **Bundled Google Sign-In**: Recommended for full access
   - **Custom OAuth**: For advanced users with their own credentials

## Project Structure

```
gui/
├── main.js              # Electron main process
├── preload.js           # Preload script for IPC
├── package.json         # Package configuration
├── renderer/            # Frontend files
│   ├── index.html      # Main HTML
│   ├── styles.css      # Styling
│   └── app.js          # Application logic
├── assets/             # Icons and images
└── README.md           # This file
```

## Technologies

- **Electron**: Desktop application framework
- **HTML/CSS/JavaScript**: Frontend
- **Python**: Backend CLI tool integration
- **IPC**: Inter-process communication between Electron and Python

## Distribution

The built applications are portable and can be distributed as:

- **macOS**: `.dmg` and `.zip`
- **Windows**: `.exe` installer and portable `.exe`
- **Linux**: `.AppImage`, `.deb`, and `.rpm`

## Troubleshooting

### Application Won't Start

- Ensure Python 3.8+ is installed and in your PATH
- Verify `yt-music-manager-cli` is installed: `pip list | grep yt-music-manager-cli`
- Check that the `ytmm` command works: `ytmm --help`

### Playlists Not Loading

- Check your internet connection
- Verify authentication if accessing private playlists
- Check the application logs in the Developer Tools (View > Toggle Developer Tools)

### Build Errors

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Update electron-builder: `npm install --save-dev electron-builder@latest`

## License

MIT License - Same as the main YT Music Manager CLI project

## Contributing

Contributions are welcome! Please submit issues and pull requests to the main repository.

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/sukarth/yt-music-manager-cli).
