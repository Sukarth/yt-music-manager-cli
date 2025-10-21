# YT Music Manager - GUI Screenshots

## Overview

The YT Music Manager GUI is a modern, cross-platform desktop application with a beautiful dark theme interface.

## Main Interface

### Playlists View
The main view displays all your synced YouTube music playlists in a grid layout. Each playlist card shows:
- Playlist thumbnail (or YouTube icon placeholder)
- Playlist name
- Number of tracks
- Sync status
- Action buttons (Sync, Remove)

**Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│ Sidebar                    │ Main Content Area                 │
│ ┌────────────────┐        │ ┌──────────────────────────────┐ │
│ │ YT Music       │        │ │ Your Playlists    [+Add]     │ │
│ │ Manager        │        │ └──────────────────────────────┘ │
│ └────────────────┘        │                                   │
│                            │ ┌─────┐  ┌─────┐  ┌─────┐      │
│ ☰ Playlists      ←         │ │ 🎵  │  │ 🎵  │  │ 🎵  │      │
│ ⟳ Sync                     │ │Chill│  │Rock │  │Jazz │      │
│ ⚙ Settings                 │ │20↓  │  │35↓  │  │42↓  │      │
│ 🔐 Authentication          │ │[Sync]│  │[Sync]│  │[Sync]│    │
│                            │ └─────┘  └─────┘  └─────┘      │
│                            │                                   │
│ v1.0.2                     │                                   │
└────────────────────────────────────────────────────────────────┘
```

### Sync Page
Monitor and control playlist synchronization:
- Sync all playlists with one click
- View sync progress in real-time
- Check sync history and logs

**Features:**
- Progress bar showing sync status
- Live log output
- "Sync All" button for batch operations

### Settings Page
Configure all aspects of the application:

**Download Settings:**
- Download location (with folder browser)
- Audio quality (128-320 kbps)
- Audio format (MP3, AAC, OGG, FLAC)

**Sync Settings:**
- Max concurrent downloads (1-10)
- Auto-sync interval (in minutes)
- Preserve deleted files option

### Authentication Page
Choose your authentication method:

1. **No Authentication** (Default)
   - Access public playlists only
   - No setup required
   - Works immediately

2. **Bundled Google Sign-In** (Recommended)
   - Access all your playlists
   - No API keys needed
   - Public and private playlists

3. **Custom OAuth** (Advanced)
   - Use your own OAuth credentials
   - Full control
   - For advanced users

## Design Features

### Color Palette
- **Primary:** YouTube Red (#FF0000)
- **Background:** Dark (#0d1117)
- **Surface:** Elevated Dark (#161b22)
- **Text:** Light (#e6edf3)
- **Accent:** Various status colors

### UI Components
- **Cards:** Elevated surfaces with hover effects
- **Buttons:** Rounded with smooth transitions
- **Icons:** Clean, modern SVG icons
- **Modal Dialogs:** Centered overlays for actions
- **Toast Notifications:** Non-intrusive feedback

### Responsive Design
- Sidebar collapses on smaller screens
- Grid layout adapts to available space
- Touch-friendly on tablets

## User Experience

### Workflow
1. **First Time:**
   - Launch application
   - Choose authentication method (optional)
   - Add first playlist
   - Click sync

2. **Regular Use:**
   - View playlists at a glance
   - Sync individual or all playlists
   - Monitor progress
   - Adjust settings as needed

### Interactions
- **Hover Effects:** Visual feedback on all interactive elements
- **Loading States:** Clear indication when operations are in progress
- **Error Handling:** User-friendly error messages
- **Confirmations:** Prevent accidental deletions

## Accessibility
- High contrast text
- Clear visual hierarchy
- Keyboard navigation support
- Screen reader friendly (semantic HTML)

## Platform Integration
- **macOS:** Native title bar, menu integration
- **Windows:** Standard window controls, taskbar progress
- **Linux:** Follows system theme preferences

## Screenshots Location

To see actual screenshots of the application, run the GUI and capture them:

```bash
cd gui
npm start
```

Then use your system's screenshot tool to capture:
1. Main playlists view
2. Sync page with active sync
3. Settings page
4. Authentication page
5. Add playlist modal

Save screenshots to `gui/screenshots/` directory for documentation.
