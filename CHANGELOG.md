# Changelog

All notable changes to YT Music Manager CLI (YTMM CLI) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of YT Music Manager CLI (YTMM CLI)
- YouTube playlist synchronization with three authentication modes (no_auth, auto_oauth, manual_oauth)
- MP3 audio download and conversion with configurable quality
- Production-ready CLI interface with rich progress display
- Comprehensive error handling and logging
- Rich progress display and status tracking
- Configurable download settings via TOML and runtime commands
- Automatic playlist organization with subfolders
- Playlist syncing with change detection (new/removed songs)
- `-y/--yes` flag for non-interactive authentication mode switching
- Ctrl+C cancellation support during OAuth flow with clean error messages
- Bundled OAuth credentials for zero-setup authentication (auto_oauth mode)
- Encrypted token storage using Fernet with machine-specific keys
- `settings` command group for runtime configuration management

### Features
- **CLI Commands**: 
  - Core: `init`, `add-playlist`, `sync`, `list-playlists`, `list-user-playlists`, `status`, `config`, `remove-playlist`
  - Authentication: `auth status`, `auth mode`, `auth login`, `auth logout`
  - Configuration: `settings get`, `settings set`
- **Configuration**: Pydantic-based TOML configuration with validation and hot-reload
- **Authentication**: Three modes with seamless switching:
  - `no_auth`: Public playlists only (zero setup)
  - `auto_oauth`: Bundled OAuth credentials (zero setup, full access)
  - `manual_oauth`: Custom OAuth credentials (full access)
- **Download Manager**: yt-dlp integration with concurrent downloads and progress tracking
- **Sync Engine**: Smart synchronization with caching and change detection
- **Logging**: Structured logging with rich console output and file rotation
- **Error Handling**: Production-ready exception handling with automatic auth mode reversion on failures
- **Security**: Encrypted OAuth token storage, secure credential management

### Technical
- Python 3.8+ support with full type hints
- Pydantic 2.0+ for configuration management
- Clean exception hierarchy with custom error classes
- Comprehensive test suite (46 unit/integration tests)
- Rich terminal output with progress bars and colored status messages
- File system safety and permission handling
- Threading-based OAuth flow with cancellation support
- Cross-platform compatibility (Windows, macOS, Linux)

---

## Release Notes Template

### [Version] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes in existing functionality

### Deprecated  
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security improvements