# OAuth Configuration

This directory contains the bundled OAuth client configuration for the YT Music Manager CLI application.

## 🔐 Bundled OAuth Credentials

The `oauth_client_bundled.json` file contains OAuth credentials that enable the `auto_oauth` authentication method. These credentials are bundled with the application to provide a seamless user experience.

### For Desktop Applications
- OAuth client secrets provide minimal security for desktop applications
- The real security comes from Google's OAuth flow and user consent
- These credentials are thus safe to distribute with desktop applications

## Authentication Methods

YT Music Manager CLI supports three authentication methods:

### 1. `no_auth` (Default)
- Access public playlists only
- No setup required
- No Google account needed

### 2. `auto_oauth` (Recommended)
- Uses bundled OAuth credentials
- Full access to private playlists
- Simple setup: `ytmm auth mode auto_oauth`

### 3. `manual_oauth` (Advanced)
- Use your own Google Cloud project credentials
- For advanced users or custom deployments
- Setup: `ytmm auth mode manual_oauth`

## 📝 For End Users

To enable Google sign-in for private playlist access:

```bash
ytmm auth mode auto_oauth
```

The application will open your browser for Google authentication and handle the OAuth flow automatically.

## 🛠️ For Advanced Users (Manual OAuth)

If you prefer to use your own OAuth credentials:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project and enable YouTube Data API v3
3. Create OAuth 2.0 credentials (Desktop application)
4. Run: `ytmm auth mode manual_oauth`
5. Enter your credentials when prompted

The bundled OAuth configuration provides the best user experience for most users.