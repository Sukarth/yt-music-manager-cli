// Application state
const state = {
  playlists: [],
  currentPage: 'playlists',
  config: {},
  authStatus: null
};

// DOM Elements
const elements = {
  navItems: document.querySelectorAll('.nav-item'),
  pages: document.querySelectorAll('.page'),
  addPlaylistBtn: document.getElementById('add-playlist-btn'),
  addPlaylistModal: document.getElementById('add-playlist-modal'),
  confirmAddPlaylist: document.getElementById('confirm-add-playlist'),
  playlistUrl: document.getElementById('playlist-url'),
  playlistName: document.getElementById('playlist-name'),
  playlistsGrid: document.getElementById('playlists-grid'),
  syncAllBtn: document.getElementById('sync-all-btn'),
  syncStatus: document.getElementById('sync-status'),
  syncLog: document.getElementById('sync-log'),
  saveSettingsBtn: document.getElementById('save-settings-btn'),
  selectFolderBtn: document.getElementById('select-folder-btn'),
  basePath: document.getElementById('base-path'),
  audioQuality: document.getElementById('audio-quality'),
  audioFormat: document.getElementById('audio-format'),
  maxDownloads: document.getElementById('max-downloads'),
  autoSync: document.getElementById('auto-sync'),
  preserveDeleted: document.getElementById('preserve-deleted'),
  authStatusCard: document.getElementById('auth-status-card'),
  toast: document.getElementById('toast')
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeModals();
  initializeEventListeners();
  loadInitialData();
});

// Navigation
function initializeNavigation() {
  elements.navItems.forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      switchPage(page);
    });
  });
}

function switchPage(pageName) {
  // Update nav items
  elements.navItems.forEach(item => {
    item.classList.toggle('active', item.dataset.page === pageName);
  });

  // Update pages
  elements.pages.forEach(page => {
    page.classList.toggle('active', page.id === `${pageName}-page`);
  });

  state.currentPage = pageName;

  // Load page-specific data
  switch (pageName) {
    case 'playlists':
      loadPlaylists();
      break;
    case 'sync':
      loadSyncStatus();
      break;
    case 'settings':
      loadSettings();
      break;
    case 'auth':
      loadAuthStatus();
      break;
  }
}

// Modals
function initializeModals() {
  const modalCloses = document.querySelectorAll('.modal-close, .modal-cancel');
  modalCloses.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Close modal on outside click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
}

// Event Listeners
function initializeEventListeners() {
  elements.addPlaylistBtn.addEventListener('click', () => {
    elements.addPlaylistModal.classList.add('active');
  });

  elements.confirmAddPlaylist.addEventListener('click', addPlaylist);
  elements.syncAllBtn.addEventListener('click', syncAllPlaylists);
  elements.saveSettingsBtn.addEventListener('click', saveSettings);
  elements.selectFolderBtn.addEventListener('click', selectFolder);

  // Auth mode buttons
  document.querySelectorAll('[data-auth-mode]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const mode = e.target.dataset.authMode;
      await setAuthMode(mode);
    });
  });
}

// Load initial data
async function loadInitialData() {
  await loadPlaylists();
}

// Playlist operations
async function loadPlaylists() {
  try {
    elements.playlistsGrid.innerHTML = '<div class="loading">Loading playlists...</div>';
    
    const result = await window.api.getPlaylists();
    
    if (result.success && result.data) {
      state.playlists = result.data;
      renderPlaylists(result.data);
    } else {
      elements.playlistsGrid.innerHTML = '<div class="loading">No playlists found. Add one to get started!</div>';
    }
  } catch (error) {
    console.error('Error loading playlists:', error);
    showToast('Failed to load playlists', 'error');
    elements.playlistsGrid.innerHTML = '<div class="loading">Error loading playlists</div>';
  }
}

function renderPlaylists(playlists) {
  if (playlists.length === 0) {
    elements.playlistsGrid.innerHTML = '<div class="loading">No playlists found. Add one to get started!</div>';
    return;
  }

  elements.playlistsGrid.innerHTML = playlists.map(playlist => `
    <div class="playlist-card" data-id="${playlist.id || playlist.name}">
      <div class="playlist-thumbnail">
        ${playlist.thumbnail ? 
          `<img src="${playlist.thumbnail}" alt="${playlist.name}">` :
          `<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" fill="#FF0000"/>
            <path d="M32 24L56 40L32 56V24Z" fill="white"/>
          </svg>`
        }
      </div>
      <div class="playlist-info">
        <h3 title="${playlist.name}">${playlist.name}</h3>
        <div class="playlist-meta">
          <span>${playlist.tracks || 0} tracks</span>
          <span>${playlist.status || 'Not synced'}</span>
        </div>
        <div class="playlist-actions">
          <button class="btn btn-primary btn-sync" data-id="${playlist.id || playlist.name}">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M12 3.5L10 5.5H13V2L12 3.5zM10 8.5L12 10.5L13 9V12H10L12 10.5zM2.5 10.5L4.5 8.5H1.5V11.5L2.5 10.5zM4 5.5L2 3.5L1 5V2H4L2 3.5z"/>
            </svg>
            Sync
          </button>
          <button class="btn btn-secondary btn-remove" data-id="${playlist.id || playlist.name}">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Remove
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Add event listeners to playlist action buttons
  document.querySelectorAll('.btn-sync').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = e.currentTarget.dataset.id;
      syncPlaylist(id);
    });
  });

  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = e.currentTarget.dataset.id;
      removePlaylist(id);
    });
  });
}

async function addPlaylist() {
  const url = elements.playlistUrl.value.trim();
  const name = elements.playlistName.value.trim();

  if (!url) {
    showToast('Please enter a playlist URL', 'error');
    return;
  }

  try {
    showToast('Adding playlist...', 'info');
    const result = await window.api.addPlaylist(url, name || null);
    
    if (result.success) {
      showToast('Playlist added successfully!', 'success');
      elements.addPlaylistModal.classList.remove('active');
      elements.playlistUrl.value = '';
      elements.playlistName.value = '';
      await loadPlaylists();
    } else {
      showToast(`Failed to add playlist: ${result.error}`, 'error');
    }
  } catch (error) {
    console.error('Error adding playlist:', error);
    showToast('Failed to add playlist', 'error');
  }
}

async function syncPlaylist(playlistId) {
  try {
    showToast(`Syncing playlist...`, 'info');
    const result = await window.api.syncPlaylists(playlistId);
    
    if (result.success) {
      showToast('Playlist synced successfully!', 'success');
      await loadPlaylists();
    } else {
      showToast(`Sync failed: ${result.error}`, 'error');
    }
  } catch (error) {
    console.error('Error syncing playlist:', error);
    showToast('Failed to sync playlist', 'error');
  }
}

async function syncAllPlaylists() {
  try {
    showToast('Syncing all playlists...', 'info');
    elements.syncAllBtn.disabled = true;
    
    const result = await window.api.syncPlaylists(null);
    
    if (result.success) {
      showToast('All playlists synced successfully!', 'success');
      updateSyncLog('All playlists synced successfully at ' + new Date().toLocaleString());
      await loadPlaylists();
    } else {
      showToast(`Sync failed: ${result.error}`, 'error');
      updateSyncLog('Sync failed: ' + result.error);
    }
  } catch (error) {
    console.error('Error syncing playlists:', error);
    showToast('Failed to sync playlists', 'error');
    updateSyncLog('Sync error: ' + error.message);
  } finally {
    elements.syncAllBtn.disabled = false;
  }
}

async function removePlaylist(playlistId) {
  if (!confirm('Are you sure you want to remove this playlist?')) {
    return;
  }

  try {
    showToast('Removing playlist...', 'info');
    const result = await window.api.removePlaylist(playlistId, false);
    
    if (result.success) {
      showToast('Playlist removed successfully!', 'success');
      await loadPlaylists();
    } else {
      showToast(`Failed to remove playlist: ${result.error}`, 'error');
    }
  } catch (error) {
    console.error('Error removing playlist:', error);
    showToast('Failed to remove playlist', 'error');
  }
}

// Sync operations
function loadSyncStatus() {
  // This would load actual sync status from the backend
  updateSyncLog('Ready to sync playlists');
}

function updateSyncLog(message) {
  const logContent = elements.syncLog.querySelector('.log-content');
  const logItem = document.createElement('p');
  logItem.className = 'log-item';
  logItem.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  
  if (logContent.querySelector('.log-item').textContent.includes('No recent sync activity')) {
    logContent.innerHTML = '';
  }
  
  logContent.insertBefore(logItem, logContent.firstChild);
  
  // Keep only last 50 log entries
  const items = logContent.querySelectorAll('.log-item');
  if (items.length > 50) {
    items[items.length - 1].remove();
  }
}

// Settings operations
async function loadSettings() {
  try {
    const result = await window.api.getConfig();
    
    if (result.success && result.config) {
      state.config = result.config;
      populateSettings(result.config);
    }
  } catch (error) {
    console.error('Error loading settings:', error);
    showToast('Failed to load settings', 'error');
  }
}

function populateSettings(config) {
  if (config['download.base_path']) {
    elements.basePath.value = config['download.base_path'];
  }
  if (config['download.audio_quality']) {
    elements.audioQuality.value = config['download.audio_quality'];
  }
  if (config['download.audio_format']) {
    elements.audioFormat.value = config['download.audio_format'];
  }
  if (config['sync.max_concurrent_downloads']) {
    elements.maxDownloads.value = config['sync.max_concurrent_downloads'];
  }
  if (config['sync.auto_sync_interval']) {
    elements.autoSync.value = Math.floor(config['sync.auto_sync_interval'] / 60);
  }
  if (config['sync.preserve_deleted_locally']) {
    elements.preserveDeleted.checked = config['sync.preserve_deleted_locally'] === 'true';
  }
}

async function saveSettings() {
  try {
    showToast('Saving settings...', 'info');
    
    const settings = {
      'download.audio_quality': elements.audioQuality.value,
      'download.audio_format': elements.audioFormat.value,
      'sync.max_concurrent_downloads': elements.maxDownloads.value,
      'sync.auto_sync_interval': (parseInt(elements.autoSync.value) * 60).toString(),
      'sync.preserve_deleted_locally': elements.preserveDeleted.checked.toString()
    };

    if (elements.basePath.value) {
      settings['download.base_path'] = elements.basePath.value;
    }

    let allSuccess = true;
    for (const [key, value] of Object.entries(settings)) {
      const result = await window.api.setConfig(key, value);
      if (!result.success) {
        allSuccess = false;
        console.error(`Failed to set ${key}:`, result.error);
      }
    }

    if (allSuccess) {
      showToast('Settings saved successfully!', 'success');
    } else {
      showToast('Some settings failed to save', 'error');
    }
  } catch (error) {
    console.error('Error saving settings:', error);
    showToast('Failed to save settings', 'error');
  }
}

async function selectFolder() {
  try {
    const folderPath = await window.api.selectFolder();
    if (folderPath) {
      elements.basePath.value = folderPath;
    }
  } catch (error) {
    console.error('Error selecting folder:', error);
    showToast('Failed to select folder', 'error');
  }
}

// Authentication operations
async function loadAuthStatus() {
  try {
    const statusBadge = elements.authStatusCard.querySelector('.status-badge');
    const statusDesc = elements.authStatusCard.querySelector('.auth-description');
    
    statusBadge.innerHTML = '<span class="badge badge-info">Checking...</span>';
    statusDesc.textContent = 'Loading authentication status...';
    
    const result = await window.api.authStatus();
    
    if (result.success) {
      state.authStatus = result.status;
      
      // Parse status and update UI
      if (result.status.includes('auto_oauth') || result.status.includes('authenticated')) {
        statusBadge.innerHTML = '<span class="badge badge-success">Authenticated</span>';
        statusDesc.textContent = 'You are signed in with Google OAuth. You have access to all your playlists.';
      } else if (result.status.includes('no_auth')) {
        statusBadge.innerHTML = '<span class="badge badge-warning">No Authentication</span>';
        statusDesc.textContent = 'You can access public playlists only. Sign in to access private playlists.';
      } else {
        statusBadge.innerHTML = '<span class="badge badge-info">Unknown</span>';
        statusDesc.textContent = result.status;
      }
    } else {
      statusBadge.innerHTML = '<span class="badge badge-error">Error</span>';
      statusDesc.textContent = 'Failed to load authentication status';
    }
  } catch (error) {
    console.error('Error loading auth status:', error);
    showToast('Failed to load authentication status', 'error');
  }
}

async function setAuthMode(mode) {
  try {
    showToast(`Setting authentication mode to ${mode}...`, 'info');
    
    const result = await window.api.authMode(mode);
    
    if (result.success) {
      showToast('Authentication mode updated successfully!', 'success');
      await loadAuthStatus();
    } else {
      showToast(`Failed to set auth mode: ${result.error}`, 'error');
    }
  } catch (error) {
    console.error('Error setting auth mode:', error);
    showToast('Failed to set authentication mode', 'error');
  }
}

// Toast notifications
function showToast(message, type = 'info') {
  elements.toast.textContent = message;
  elements.toast.className = `toast ${type} active`;
  
  setTimeout(() => {
    elements.toast.classList.remove('active');
  }, 3000);
}

// Error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  showToast('An error occurred. Please check the console for details.', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  showToast('An error occurred. Please check the console for details.', 'error');
});
