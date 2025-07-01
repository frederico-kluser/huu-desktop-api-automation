# Changelog

## [2.0.0] - 2025-01-01

### Added
- **Keyboard Support**: Complete keyboard automation functionality
  - Type text with configurable timing modes:
    - `instant`: Immediate typing (default)
    - `perChar`: Configurable delay between each character
    - `total`: Total duration for typing all text
  - Press individual keys (Enter, Tab, F1-F12, etc.)
  - Execute key combinations (Ctrl+C, Cmd+V, etc.)
  - Support for up to 10,000 characters with sanitization
  - Configurable via environment variables:
    - `KEYBOARD_DEFAULT_MODE`: Default typing mode
    - `KEYBOARD_MAX_TEXT_LENGTH`: Maximum text length
    - `KEYBOARD_DEFAULT_DELAY_PER_CHAR`: Default delay per character
    - `KEYBOARD_MAX_DELAY`: Maximum delay allowed (5 minutes)
    - `KEYBOARD_BATCH_SIZE`: Batch size for character processing
    - `KEYBOARD_DEBUG`: Enable debug logs

- **Clipboard Support**: System clipboard operations
  - Copy text to clipboard (max 1 MB)
  - Paste/read current clipboard content
  - Clear clipboard content
  - Full Unicode support

- **Enhanced Error Handling**:
  - Custom error classes for different scenarios
  - Structured error responses with error codes
  - Better validation error messages
  - Request context in error logs

- **Updated Postman Collection**:
  - Complete collection with all endpoints
  - Examples for all operations
  - Error response examples
  - Environment variables setup
  - Pre-request scripts and tests

### API Endpoints Added

#### Keyboard Operations
- `POST /api/v1/keyboard/type` - Type text with timing options
- `POST /api/v1/keyboard/press` - Press a specific key
- `POST /api/v1/keyboard/combination` - Execute key combinations

#### Clipboard Operations
- `POST /api/v1/clipboard/copy` - Copy text to clipboard
- `GET /api/v1/clipboard/paste` - Get clipboard content
- `POST /api/v1/clipboard/clear` - Clear clipboard

### Technical Details
- New services: `KeyboardService`, `ClipboardService`
- New adapter: `NutJSKeyboardAdapter`
- Strategy pattern for typing modes
- Full TypeScript type safety
- Dependency injection integration
- Comprehensive input validation with Zod schemas

### Dependencies Added
- `clipboardy`: Cross-platform clipboard library
- `@types/clipboardy`: TypeScript definitions

### Configuration
- New config file: `src/config/keyboard.config.ts`
- Environment variable validation
- Configurable timing parameters

### Breaking Changes
- None - all existing functionality remains unchanged

### Security
- Input sanitization for control characters
- Size limits for clipboard operations (1 MB)
- API key authentication for sensitive operations

### Performance
- Batch processing for large text (50 characters per batch)
- Efficient timing strategies
- Minimal overhead for instant typing