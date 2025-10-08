import json
from pathlib import Path
from typing import Iterable

import pytest

from yt_music_manager_cli import config
from yt_music_manager_cli.config import Settings
from yt_music_manager_cli.youtube_api import PlaylistInfo, VideoInfo


@pytest.fixture(autouse=True)
def reset_settings(tmp_path):
    """Provide an isolated Settings instance for each test."""
    settings = Settings()
    settings.youtube.auth_method = "no_auth"
    settings.youtube.oauth_client_id = ""
    settings.youtube.oauth_client_secret = ""
    settings.download.base_path = str(tmp_path / "downloads")
    settings.download.audio_format = "mp3"
    settings.download.audio_quality = "192"
    settings.sync.max_concurrent_downloads = 2
    settings.sync.auto_sync_interval = 600
    settings.logging.log_file = str(tmp_path / "logs" / "yt_music_manager_cli.log")
    settings.logging.max_log_size = "1MB"
    settings.logging.backup_count = 2
    settings.advanced.retry_attempts = 2
    settings.advanced.retry_delay = 1
    settings.advanced.connection_timeout = 5
    settings.advanced.user_agent = "ytmm-tests"

    config._settings = settings
    yield settings
    config._settings = None


@pytest.fixture
def sample_videos() -> Iterable[VideoInfo]:
    return [
        VideoInfo(
            video_id="vid-1",
            title="First Video",
            duration="PT3M15S",
            upload_date="2024-01-01",
            uploader="Uploader",
            uploader_id="channel-1",
            view_count=100,
            like_count=10,
            description="Test video 1",
            thumbnail_url="https://example.com/1.jpg",
        ),
        VideoInfo(
            video_id="vid-2",
            title="Second Video",
            duration="PT4M",
            upload_date="2024-01-02",
            uploader="Uploader",
            uploader_id="channel-1",
            view_count=200,
            like_count=None,
            description="Test video 2",
            thumbnail_url="https://example.com/2.jpg",
        ),
    ]


@pytest.fixture
def sample_playlist(sample_videos) -> PlaylistInfo:
    return PlaylistInfo(
        playlist_id="playlist-1",
        title="My Playlist",
        description="Playlist description",
        channel_title="Channel",
        channel_id="channel-1",
        video_count=len(list(sample_videos)),
        last_updated="2024-02-01T00:00:00+00:00",
        thumbnail_url="https://example.com/thumb.jpg",
        videos=list(sample_videos),
    )


@pytest.fixture
def data_dir(tmp_path) -> Path:
    path = tmp_path / "data"
    path.mkdir()
    return path


@pytest.fixture
def write_json(tmp_path):
    def _writer(relative_path: str, payload: dict) -> Path:
        file_path = tmp_path / relative_path
        file_path.parent.mkdir(parents=True, exist_ok=True)
        file_path.write_text(json.dumps(payload, indent=2))
        return file_path

    return _writer
