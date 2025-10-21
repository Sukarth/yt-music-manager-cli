# Quick Start Guide - YT Music Manager GUI

Welcome to YT Music Manager! This guide will help you get started with the desktop GUI application.

## Prerequisites

Before you begin, make sure you have:

1. ✅ **Python 3.8+** installed ([Download](https://python.org))
2. ✅ **Node.js 14+** installed ([Download](https://nodejs.org))
3. ✅ **Internet connection**

## Installation

### Step 1: Install the CLI Tool

The GUI requires the command-line tool to be installed first:

```bash
pip install yt-music-manager-cli
```

Verify installation:
```bash
ytmm --help
```

### Step 2: Get the GUI

**Option A: Clone the Repository**
```bash
git clone https://github.com/sukarth/yt-music-manager-cli.git
cd yt-music-manager-cli/gui
```

**Option B: Download Pre-built App** (when available)
- Download the appropriate installer for your platform from [Releases](https://github.com/sukarth/yt-music-manager-cli/releases)
- Install and skip to "First Time Setup"

### Step 3: Install GUI Dependencies

```bash
npm install
```

### Step 4: Launch the Application

**Easy Way:**
```bash
# macOS/Linux
./start.sh

# Windows
start.bat
```

**Manual Way:**
```bash
npm start
```

## First Time Setup

### 1. Choose Authentication Method

When you first open the application, navigate to the **Authentication** page.

You have three options:

#### Option 1: No Authentication (Default)
- **Best for:** Public playlists only
- **Pros:** No setup required, works immediately
- **Cons:** Cannot access private playlists

**Steps:**
1. Click "Use No Auth" on the Authentication page
2. You're ready to go!

#### Option 2: Bundled Google Sign-In (Recommended)
- **Best for:** Most users who want full access
- **Pros:** Access all playlists (public and private), no API keys needed
- **Cons:** Requires Google account sign-in

**Steps:**
1. Click "Sign In with Google" on the Authentication page
2. Your browser will open
3. Sign in to your Google account
4. Grant permissions
5. Return to the app - you're authenticated!

#### Option 3: Custom OAuth
- **Best for:** Advanced users who want their own credentials
- **Pros:** Full control, your own OAuth app
- **Cons:** Requires setting up Google Cloud project

**Steps:**
1. Set up a Google Cloud project and OAuth credentials
2. Click "Setup Custom OAuth" on the Authentication page
3. Follow the interactive setup process

### 2. Add Your First Playlist

1. Click the **Playlists** tab in the sidebar
2. Click the **"+ Add Playlist"** button
3. Enter a YouTube playlist URL, for example:
   ```
   https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf
   ```
4. Optionally, give it a custom name
5. Click **"Add Playlist"**

### 3. Sync Your Playlist

Once the playlist is added:

1. Click the **"Sync"** button on the playlist card
2. Watch the progress in real-time
3. Your music will be downloaded to the configured location

**Or sync all playlists at once:**
1. Go to the **Sync** tab
2. Click **"Sync All"**

## Daily Usage

### Adding More Playlists

Repeat the process from "Add Your First Playlist" to add as many playlists as you want.

### Syncing Playlists

- **Individual Playlist:** Click "Sync" on any playlist card
- **All Playlists:** Use the "Sync All" button on the Sync page

### Managing Playlists

- **Remove:** Click the "Remove" button on a playlist card
- **View Details:** Check the sync status and track count on each card

### Changing Settings

Navigate to the **Settings** page to customize:

#### Download Settings
- **Location:** Choose where music files are saved
- **Quality:** Select audio quality (128-320 kbps)
- **Format:** Choose MP3, AAC, OGG, or FLAC

#### Sync Settings
- **Concurrent Downloads:** How many files to download simultaneously
- **Auto Sync:** Set automatic sync interval (or disable)
- **Preserve Deleted:** Keep files locally even if removed from playlist

## Tips & Tricks

### Keyboard Shortcuts
- Navigate pages with sidebar menu
- Use Tab to move between form fields
- Press Enter to submit forms

### Performance Tips
1. **Adjust concurrent downloads** based on your internet speed
   - Fast connection: 5-10 concurrent downloads
   - Slow connection: 1-3 concurrent downloads

2. **Choose appropriate quality** based on your needs
   - High quality (320 kbps): Best audio, larger files
   - Medium quality (192 kbps): Good balance
   - Low quality (128 kbps): Smaller files, acceptable quality

3. **Use auto-sync** for automatic updates
   - Set interval to 60+ minutes
   - Keeps playlists always up-to-date

### File Organization

Your music files are organized like this:
```
~/Music/YouTube Playlists/
├── My Chill Playlist/
│   ├── Song 1.mp3
│   ├── Song 2.mp3
│   └── Song 3.mp3
├── Workout Music/
│   ├── High Energy Track.mp3
│   └── Motivational Song.mp3
```

Each playlist gets its own folder with all its tracks.

## Troubleshooting

### App Won't Start

**Problem:** Error messages on launch

**Solutions:**
1. Verify Python is installed: `python --version`
2. Verify yt-music-manager-cli is installed: `ytmm --help`
3. Check Node.js version: `node --version` (should be 14+)
4. Reinstall dependencies:
   ```bash
   cd gui
   rm -rf node_modules
   npm install
   ```

### Playlists Won't Load

**Problem:** "No playlists found" or loading errors

**Solutions:**
1. Check internet connection
2. Verify authentication (if accessing private playlists)
3. Try adding a public playlist first
4. Check the sync log for error messages

### Downloads Failing

**Problem:** Sync starts but downloads fail

**Solutions:**
1. Check internet connection
2. Verify you have write permissions to the download folder
3. Try reducing concurrent downloads in Settings
4. Some videos may be region-restricted or unavailable

### Authentication Issues

**Problem:** Can't sign in or authenticate

**Solutions:**
1. Use "No Auth" mode for public playlists
2. Clear browser cache and try again
3. Check firewall settings
4. Try the bundled OAuth mode first before custom OAuth

## Getting Help

If you're stuck:

1. **Check the logs:**
   - View > Toggle Developer Tools
   - Look for error messages in the Console tab

2. **Review documentation:**
   - [Main README](../README.md)
   - [Build Guide](BUILD.md)
   - [Screenshots Guide](SCREENSHOTS.md)

3. **Ask for help:**
   - Open an issue on [GitHub](https://github.com/sukarth/yt-music-manager-cli/issues)
   - Include: OS version, error messages, what you were trying to do

## Next Steps

Now that you're set up:

1. ✅ Add all your favorite playlists
2. ✅ Configure your preferred settings
3. ✅ Set up auto-sync for hands-free updates
4. ✅ Enjoy your music offline!

## Resources

- [Main Documentation](../README.md)
- [CLI Guide](../README.md#-usage-guide)
- [Build Instructions](BUILD.md)
- [GitHub Repository](https://github.com/sukarth/yt-music-manager-cli)

---

**Happy listening! 🎵**
