# Building and Distributing YT Music Manager GUI

This guide explains how to build and distribute the YT Music Manager GUI application for macOS, Windows, and Linux.

## Prerequisites

Before building, ensure you have:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **Python 3.8+** with `yt-music-manager-cli` installed
4. **Platform-specific tools** (see below)

### Platform-Specific Requirements

#### macOS
- Xcode Command Line Tools: `xcode-select --install`
- For code signing: Apple Developer account

#### Windows
- Windows SDK (for building installers)
- For code signing: Code signing certificate

#### Linux
- Standard build tools: `sudo apt-get install build-essential`
- For creating packages: `dpkg`, `rpm`, `fuse`

## Installation

```bash
cd gui
npm install
```

## Development

### Running in Development Mode

```bash
npm start
```

This will launch the application with:
- Hot reload capabilities
- Developer tools enabled
- Console logging visible

### Development Tips

1. **View Console Logs**: Open Developer Tools (View > Toggle Developer Tools)
2. **Debugging**: Set breakpoints in renderer code
3. **Testing Changes**: The app reloads when you modify files

## Building

### Build for Current Platform

```bash
npm run build
```

This creates a distributable package for your current operating system in the `dist/` directory.

### Build for Specific Platforms

#### macOS
```bash
npm run build:mac
```

**Output:**
- `dist/YT Music Manager-1.0.2.dmg` - Disk image for distribution
- `dist/YT Music Manager-1.0.2-mac.zip` - Zip archive

**Installation:**
- Mount the DMG and drag to Applications folder
- Or extract the ZIP and move to Applications

#### Windows
```bash
npm run build:win
```

**Output:**
- `dist/YT Music Manager Setup 1.0.2.exe` - NSIS installer
- `dist/YT Music Manager 1.0.2.exe` - Portable executable

**Installation:**
- Run the installer for standard installation
- Or use the portable version (no installation required)

#### Linux
```bash
npm run build:linux
```

**Output:**
- `dist/YT-Music-Manager-1.0.2.AppImage` - Universal Linux package
- `dist/yt-music-manager-gui_1.0.2_amd64.deb` - Debian/Ubuntu package
- `dist/yt-music-manager-gui-1.0.2.x86_64.rpm` - RedHat/Fedora package

**Installation:**
```bash
# AppImage (works on most distributions)
chmod +x YT-Music-Manager-1.0.2.AppImage
./YT-Music-Manager-1.0.2.AppImage

# Debian/Ubuntu
sudo dpkg -i yt-music-manager-gui_1.0.2_amd64.deb

# RedHat/Fedora
sudo rpm -i yt-music-manager-gui-1.0.2.x86_64.rpm
```

### Cross-Platform Building

You can build for multiple platforms from a single OS:

**From macOS:**
```bash
# Can build for macOS, Windows, and Linux
npm run build
```

**From Windows:**
```bash
# Can build for Windows and Linux (macOS requires macOS)
npm run build:win
npm run build:linux
```

**From Linux:**
```bash
# Can build for Linux and Windows (macOS requires macOS)
npm run build:linux
npm run build:win
```

## Advanced Configuration

### Custom Build Options

Edit `package.json` to customize build settings:

```json
{
  "build": {
    "appId": "com.ytmusicmanager.app",
    "productName": "YT Music Manager",
    "copyright": "Copyright © 2024",
    "directories": {
      "output": "dist",
      "buildResources": "assets"
    },
    "files": [
      "main.js",
      "preload.js",
      "renderer/**/*",
      "assets/**/*"
    ],
    "mac": {
      "category": "public.app-category.music",
      "icon": "assets/icon.icns",
      "target": ["dmg", "zip"],
      "hardenedRuntime": true,
      "gatekeeperAssess": false,
      "entitlements": "build/entitlements.mac.plist",
      "entitlementsInherit": "build/entitlements.mac.plist"
    },
    "win": {
      "icon": "assets/icon.ico",
      "target": ["nsis", "portable"],
      "publisherName": "Your Name",
      "verifyUpdateCodeSignature": false
    },
    "linux": {
      "icon": "assets/icon.png",
      "target": ["AppImage", "deb", "rpm"],
      "category": "Audio",
      "maintainer": "your-email@example.com"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true
    }
  }
}
```

### Code Signing

#### macOS
```bash
# Set environment variables
export CSC_LINK="/path/to/certificate.p12"
export CSC_KEY_PASSWORD="certificate-password"

# Build with code signing
npm run build:mac
```

#### Windows
```bash
# Set environment variables
set CSC_LINK=C:\path\to\certificate.pfx
set CSC_KEY_PASSWORD=certificate-password

# Build with code signing
npm run build:win
```

### Notarization (macOS)

For macOS distribution outside the App Store:

```bash
export APPLE_ID="your-apple-id@example.com"
export APPLE_ID_PASSWORD="app-specific-password"
export TEAM_ID="your-team-id"

npm run build:mac
```

## Distribution

### Direct Download

1. Upload built packages to:
   - GitHub Releases
   - Your website
   - Cloud storage (Google Drive, Dropbox, etc.)

2. Create checksums:
   ```bash
   # macOS/Linux
   shasum -a 256 dist/YT-Music-Manager-*.* > checksums.txt
   
   # Windows
   certutil -hashfile "dist\YT Music Manager Setup 1.0.2.exe" SHA256
   ```

### Package Managers

#### Homebrew (macOS)
Create a Homebrew Cask:
```ruby
cask "yt-music-manager" do
  version "1.0.2"
  sha256 "checksum-here"
  url "https://github.com/sukarth/yt-music-manager-cli/releases/download/v#{version}/YT-Music-Manager-#{version}.dmg"
  name "YT Music Manager"
  desc "YouTube music playlist manager"
  homepage "https://github.com/sukarth/yt-music-manager-cli"
  app "YT Music Manager.app"
end
```

#### Chocolatey (Windows)
Create a Chocolatey package with a `.nuspec` file.

#### Snap (Linux)
Create a `snapcraft.yaml` file for Snap Store distribution.

### Update Mechanism

electron-builder supports auto-updates. Configure in `package.json`:

```json
{
  "build": {
    "publish": {
      "provider": "github",
      "owner": "sukarth",
      "repo": "yt-music-manager-cli"
    }
  }
}
```

Add to `main.js`:
```javascript
const { autoUpdater } = require('electron-updater');

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();
});
```

## Testing Builds

### Before Distribution

1. **Install the built package** on a clean system
2. **Test all features:**
   - Adding playlists
   - Syncing
   - Changing settings
   - Authentication
3. **Check console for errors**
4. **Verify file permissions**
5. **Test update mechanism** (if implemented)

### Automated Testing

Consider adding:
- Unit tests for renderer logic
- Integration tests for IPC
- E2E tests with Spectron or Playwright

## Troubleshooting Build Issues

### "Python not found" Error

Ensure Python is in PATH:
```bash
which python3  # macOS/Linux
where python   # Windows
```

### "electron-builder not found"

Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails on Linux

Install required dependencies:
```bash
sudo apt-get install -y rpm fuse libfuse2
```

### Large Package Size

Optimize by:
1. Excluding unnecessary files in `package.json` `files` array
2. Using `asar` archive (enabled by default)
3. Compressing with UPX (for executables)

## Size Optimization

### Reducing Bundle Size

1. **Exclude development dependencies:**
   - Only include `electron` and `electron-builder` in `devDependencies`

2. **Minimize included files:**
   ```json
   "files": [
     "main.js",
     "preload.js",
     "renderer/**/*",
     "assets/icon.*",
     "!**/*.map"
   ]
   ```

3. **Use asar compression:**
   ```json
   "asar": true
   ```

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-latest, windows-latest, ubuntu-latest]
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install dependencies
        working-directory: gui
        run: npm install
      
      - name: Build
        working-directory: gui
        run: npm run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v2
        with:
          name: ${{ matrix.os }}-build
          path: gui/dist/*
```

## Support

For build issues or questions:
- Check [electron-builder documentation](https://www.electron.build/)
- Open an issue on GitHub
- Review the troubleshooting section above

## License

Same as the main project (MIT)
