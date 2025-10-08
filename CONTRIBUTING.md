# Contributing to YT Music Manager CLI

Thank you for your interest in contributing to YT Music Manager CLI! This guide covers everything you need to know about contributing to the project.

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- Git
- FFmpeg (optional, but highly recommended for audio processing tests)

### Setup Development Environment

1. **Fork and Clone**
    ```bash
    git clone https://github.com/sukarth/yt-music-manager-cli.git
    cd yt-music-manager-cli
    ```

2. **Create Virtual Environment**
   ```bash
   python -m venv .venv
   # On Windows:
   .venv\Scripts\activate
   # On macOS/Linux:
   source .venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -e ".[dev]"
   ```

4. **Run Tests**
   ```bash
   pytest
   # Or using the venv directly:
   .venv\Scripts\python.exe -m pytest
   ```

## 🏗️ Project Structure

```
yt-music-manager-cli/
├── src/yt_music_manager_cli/          # Main application code
│   ├── __init__.py             # Package initialization
│   ├── __main__.py             # CLI entry point
│   ├── cli.py                  # Command-line interface
│   ├── config.py               # Configuration management
│   ├── unified_youtube_client.py # Unified YouTube client
│   ├── youtube_api.py          # YouTube Data API integration
│   ├── youtube_extractor.py    # yt-dlp based extraction
│   ├── oauth_handler.py        # OAuth authentication
│   ├── oauth_client_config.py  # OAuth config management
│   ├── oauth_security.py       # Token encryption/security
│   ├── oauth_flow.py           # Enhanced OAuth flow
│   ├── download_manager.py     # Download functionality
│   ├── playlist_manager.py     # Playlist persistence
│   ├── sync_engine.py          # Synchronization logic
│   ├── logging_utils.py        # Logging setup
│   ├── console_utils.py        # Console/color utilities
│   └── exceptions.py           # Custom exceptions
├── tests/                      # Test suite
│   ├── conftest.py             # Test configuration
│   ├── test_cli.py             # CLI tests
│   ├── test_config.py          # Configuration tests
│   ├── test_youtube_extractor.py # Extractor tests
│   ├── test_unified_youtube_client.py # Client tests
│   ├── test_download_manager.py # Download tests
│   ├── test_playlist_manager.py # Playlist tests
│   ├── test_sync_engine.py     # Sync tests
│   ├── test_exceptions.py      # Exception tests
│   └── test_logging_utils.py   # Logging tests
├── config/                     # Configuration templates
├── data/                       # Runtime data (gitignored)
├── logs/                       # Log files (gitignored)
└── docs/                       # Documentation
```

## 🐛 Issue Guidelines

### Reporting Bugs

When reporting bugs, please include:

1. **Environment Information**
   - Python version
   - Operating system
   - YT Music Manager CLI version

2. **Steps to Reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior
   - Screenshots if applicable

3. **Log Files**
   - Include relevant logs from `logs/yt_music_manager_cli.log`
   - Use debug mode: `ytmm --debug command`

### Feature Requests

For new features, please:

1. Check existing issues first
2. Describe the use case clearly
3. Explain why it would benefit users
4. Consider implementation complexity

## 💻 Development Guidelines

### Code Style and Standards

- **PEP 8**: Follow PEP 8 style guidelines strictly
- **Type Hints**: Use type hints for all function parameters and return values
- **Line Length**: Maximum 88 characters (Black formatter default)
- **Naming**: Use descriptive variable and function names
- **Documentation**: Add docstrings to all public functions and classes with usage examples
- **Error Handling**: Use custom exceptions from `exceptions.py`, provide meaningful error messages
- **Formatter**: Use `black` for code formatting
- **Linter**: Use `flake8` for linting
- **Docstrings**: Follow Google docstring style

```bash
# Format code
black src/yt_music_manager_cli/

# Check linting
flake8 src/yt_music_manager_cli/

# Type checking
mypy src/yt_music_manager_cli/
```

### CLI Tools and Commands

The project includes a comprehensive CLI tool for managing YouTube playlists:

```bash
# Basic usage
ytmm --help
ytmm config
ytmm add-playlist <url>
ytmm sync --all
ytmm list-playlists
```

**Available Commands:**

- `init`: Initialize configuration and setup
- `config`: Show current configuration
- `auth`: Manage authentication settings (supports -y/--yes for non-interactive mode)
- `add-playlist`: Add a YouTube playlist to track
- `list-playlists`: List all tracked playlists
- `list-user-playlists`: List playlists from your Google account
- `sync`: Sync playlists (download new songs, remove old ones)
- `remove-playlist`: Remove a playlist from tracking
- `status`: Show sync status and statistics
- `settings`: Manage configuration settings

**Settings Management:**

The `settings` command group allows runtime configuration changes:

```bash
# Set authentication method
ytmm settings set youtube.auth_method auto_oauth

# Set download quality
ytmm settings set download.audio_quality 320

# Get specific setting
ytmm settings get youtube.auth_method

# Show all settings
ytmm settings get
```

### Testing

- **Coverage**: Maintain good test coverage
- **Test Types**: Unit tests for logic, integration tests for API calls
- **Mocking**: Mock external APIs in tests
- **Test Structure**: Follow AAA pattern (Arrange, Act, Assert)

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=yt_music_manager_cli --cov-report=html

# Run specific test file
pytest tests/test_config.py

# Run specific test
pytest -k "test_config_validation"

# Using venv directly on Windows:
.venv\Scripts\python.exe -m pytest
```

**Test Guidelines:**

- Write tests for all new features and bug fixes
- Use descriptive test names that explain what is being tested
- Test both success and failure cases
- Mock external API calls to avoid dependencies
- Use fixtures from `conftest.py` for common test data
- Keep mocks simple and focused
- Maintain high test coverage (>80%)

### Documentation

- **Docstrings**: Document all public functions and classes with usage examples
- **Comments**: Explain complex logic and algorithms, not obvious operations
- **README**: Update if adding user-facing features
- **CHANGELOG**: Add entry for all user-facing changes
- **Code Examples**: Include usage examples in docstrings where helpful

**Documentation Files:**

- `README.md`: Main project documentation
- `CONTRIBUTING.md`: Contribution guidelines (this file)
- `CHANGELOG.md`: Version history and release notes
- `LICENSE`: Project license

## 📝 Pull Request Process

### Before Submitting

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Write Tests**
   - Add tests for new functionality
   - Ensure existing tests pass

3. **Update Documentation**
   - Update docstrings
   - Update README if needed
   - Add changelog entry

4. **Check Code Quality**
   ```bash
   black src/yt_music_manager_cli/
   flake8 src/yt_music_manager_cli/
   pytest --cov=yt_music_manager_cli

### Submitting

1. **Commit Messages**
   - Use clear, descriptive messages
   - Follow conventional commit format:
   ```
   feat(scope): add new feature
   fix(scope): resolve bug
   docs: update documentation
   style: code style changes
   refactor: code refactoring
   test: add or update tests
   chore: maintenance tasks
   ```
   
   **Examples:**
   - `feat(cli): add settings management commands`
   - `fix(auth): resolve oauth token refresh issue`
   - `docs(readme): update installation instructions`
   - `test(sync): add edge case coverage`

2. **Pull Request Template**
   - Fill out the PR template completely
   - Reference related issues with `Fixes #123` or `Closes #456`
   - Include screenshots for UI changes
   - Note any breaking changes clearly

3. **Review Process**
   - Address reviewer feedback promptly
   - Keep commits focused and atomic
   - Rebase if needed to maintain clean history
   - Ensure CI/CD pipeline passes

## 🏷️ Types of Contributions

### Code Contributions

- **Bug Fixes**: Fix reported issues
- **Features**: Add new functionality
- **Performance**: Optimize existing code
- **Refactoring**: Improve code structure

### Non-Code Contributions

- **Documentation**: Improve README, docstrings, examples
- **Testing**: Add test cases, improve coverage
- **Issue Triage**: Help categorize and reproduce issues
- **Community**: Answer questions, help users

## 🧪 Testing Guidelines

### Test Structure

```python
def test_feature_name():
    """Test description following AAA pattern."""
    # Arrange
    setup_test_data()
    
    # Act  
    result = function_under_test()
    
    # Assert
    assert result == expected_value
```

### Test Categories

- **Unit Tests**: Test individual functions/methods
- **Integration Tests**: Test component interactions
- **End-to-End Tests**: Test complete workflows

### Mocking Guidelines

- Mock external APIs (YouTube, file system)
- Use fixtures for common test data
- Keep mocks simple and focused

## 📊 Performance Considerations

### API Usage

- **Respect YouTube API quota limits** (10,000 units/day default)
- Implement proper rate limiting to avoid quota exhaustion
- Cache responses when possible to reduce API calls
- Use batch requests where supported by the API
- Monitor quota usage and warn users appropriately

### Download Performance

- Support concurrent downloads for efficiency
- Handle network interruptions with retry logic
- Provide progress feedback to users
- Stream large downloads to avoid memory issues
- Clean up temporary files after downloads

### Memory Usage

- Stream large downloads instead of loading into memory
- Clean up temporary files promptly
- Avoid loading entire playlists into memory at once
- Use generators for processing large datasets
- Profile memory usage for large playlists

### Optimization Guidelines

- Profile code for bottlenecks before optimizing
- Use async/await for concurrent operations where beneficial
- Implement proper caching strategies
- Optimize database queries (if applicable)
- Monitor and log performance metrics

## 🔒 Security Guidelines

### API Keys and Secrets

- **Never commit API keys or secrets** to the repository
- Use environment variables for sensitive data
- Use the bundled OAuth credentials (auto_oauth mode) when possible
- Store custom credentials securely using the encrypted token storage

### OAuth Security

- Follow OAuth 2.0 security best practices
- Tokens are encrypted using Fernet with machine-specific keys
- Token files are stored in user-specific data directories
- Implement proper token refresh mechanisms
- Handle authorization errors gracefully

### Input Validation

- Validate all user inputs (URLs, file paths, configuration values)
- Sanitize file names to prevent path traversal attacks
- Validate file paths and handle permissions properly
- Use allowlists for configuration options where possible

### Error Handling

- Don't expose sensitive information in error messages
- Log security-relevant events appropriately
- Fail securely (deny by default)
- Handle exceptions without leaking internal details

### Dependency Security

- Regularly update dependencies to patch vulnerabilities
- Review dependency licenses for compatibility
- Use `pip-audit` to check for known vulnerabilities
- Pin dependency versions for reproducible builds

## 📋 Checklist for Contributors

### Before Opening PR

- [ ] Code follows PEP 8 and project style guidelines
- [ ] Code formatted with `black`
- [ ] Linting passes (`flake8`)
- [ ] Type hints added where applicable
- [ ] All tests pass locally (`pytest`)
- [ ] Test coverage maintained (>80%)
- [ ] Documentation updated (docstrings, README, etc.)
- [ ] Changelog entry added if user-facing
- [ ] No sensitive data (API keys, tokens) in commits
- [ ] Commit messages follow conventional format

### PR Description

- [ ] Clear description of changes and motivation
- [ ] Links to related issues (Fixes #123)
- [ ] Screenshots if applicable (for UI/CLI changes)
- [ ] Breaking changes clearly noted
- [ ] Testing approach described
- [ ] Performance impact considered

### Code Review Checklist

Reviewers should verify:

- [ ] Code follows style guidelines
- [ ] Tests pass and coverage maintained  
- [ ] Documentation updated appropriately
- [ ] No breaking changes without justification
- [ ] Security implications considered
- [ ] Performance impact assessed
- [ ] Error handling is comprehensive
- [ ] Edge cases are handled

## 🤝 Community Guidelines

### Be Respectful

- Use inclusive language
- Be patient with newcomers
- Provide constructive feedback
- Help others learn

### Communication

- Use GitHub issues for bug reports
- Use discussions for questions
- Be clear and concise
- Include context

## 📞 Getting Help

### Resources

- **Documentation**: Check README and docstrings first
- **Issues**: Search existing issues
- **Discussions**: Use GitHub Discussions for questions

### Contact

- **Bug Reports**: GitHub Issues
- **Feature Requests**: GitHub Issues
- **General Questions**: GitHub Discussions
- **Security Issues**: Email maintainers

## 🏆 Recognition

Contributors will be:

- Mentioned in release notes
- Invited to maintainer team (for regular contributors)

## 📈 Roadmap

See [GitHub Issues](https://github.com/sukarth/yt-music-manager-cli/issues) for planned features and improvements.

**Current Focus Areas:**

- Enhanced playlist management features
- Improved error handling and recovery
- Performance optimizations for large playlists
- Extended metadata support
- Additional authentication methods

## 📦 Release Process

For preparing releases:

1. **Update Version**
   - Update version in `pyproject.toml`
   - Update `__version__` in `src/yt_music_manager_cli/__init__.py`

2. **Update Documentation**
   - Update `CHANGELOG.md` with all changes since last release
   - Review and update README.md if needed
   - Ensure all documentation is accurate

3. **Create Release**
   - Create git tag: `git tag -a v1.0.0 -m "Release v1.0.0"`
   - Push tag: `git push origin v1.0.0`

4. **Build and Publish** (if applicable)
   - Build distribution: `python -m build`
   - Upload to PyPI: `twine upload dist/*`
   - Create GitHub release with notes

5. **Post-Release**
   - Announce release in discussions
   - Update any external documentation
   - Monitor for issues

## 🛠️ IDE Configuration

### VS Code

Recommended extensions:
- Python (ms-python.python)
- Pylance (ms-python.vscode-pylance)
- Black Formatter (ms-python.black-formatter)

Recommended settings (`.vscode/settings.json`):
```json
{
  "python.formatting.provider": "black",
  "python.linting.enabled": true,
  "python.linting.flake8Enabled": true,
  "python.testing.pytestEnabled": true,
  "editor.formatOnSave": true
}
```

### Pre-commit Hooks

Consider setting up pre-commit hooks for automated checks:

```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install
```

Create `.pre-commit-config.yaml`:
```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.0.0
    hooks:
      - id: black
  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8
```

---

Thank you for contributing to YT Music Manager CLI (YTMM CLI)! Your help makes this project better for everyone. 🎵