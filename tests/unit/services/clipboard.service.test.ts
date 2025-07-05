import { ClipboardService } from '../../../src/application/services/clipboard.service.js';
import clipboardy from 'clipboardy';

// Mock clipboardy
jest.mock('clipboardy');

describe('ClipboardService', () => {
  let service: ClipboardService;
  const mockedClipboardy = clipboardy as jest.Mocked<typeof clipboardy>;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ClipboardService();
  });

  describe('copy', () => {
    it('should copy content successfully', async () => {
      mockedClipboardy.write.mockResolvedValue();

      const result = await service.copy('test content');

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        contentLength: 12,
        sizeBytes: 12,
      });
      expect(mockedClipboardy.write).toHaveBeenCalledWith('test content');
    });

    it('should handle empty content error', async () => {
      const result = await service.copy('');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Clipboard copy error: Content cannot be empty');
      expect(mockedClipboardy.write).not.toHaveBeenCalled();
    });

    it('should handle content size exceeding limit', async () => {
      const largeContent = 'a'.repeat(1048577); // 1 MB + 1 byte

      const result = await service.copy(largeContent);

      expect(result.success).toBe(false);
      expect(result.error).toContain('exceeds maximum of 1048576 bytes');
      expect(mockedClipboardy.write).not.toHaveBeenCalled();
    });

    it('should handle unicode content correctly', async () => {
      mockedClipboardy.write.mockResolvedValue();
      const unicodeContent = '🚀 Unicode test 你好';

      const result = await service.copy(unicodeContent);

      expect(result.success).toBe(true);
      expect(result.data?.contentLength).toBe(unicodeContent.length);
      expect(result.data?.sizeBytes).toBe(Buffer.byteLength(unicodeContent, 'utf8'));
    });

    it('should handle clipboardy write errors', async () => {
      mockedClipboardy.write.mockRejectedValue(new Error('Write failed'));

      const result = await service.copy('test');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Clipboard copy error: Write failed');
    });

    it('should handle non-Error exceptions', async () => {
      mockedClipboardy.write.mockRejectedValue('Unknown error');

      const result = await service.copy('test');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Clipboard copy error: Unknown error');
    });
  });

  describe('paste', () => {
    it('should paste content successfully', async () => {
      mockedClipboardy.read.mockResolvedValue('pasted content');

      const result = await service.paste();

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        content: 'pasted content',
        isEmpty: false,
        contentLength: 14,
      });
    });

    it('should handle empty clipboard', async () => {
      mockedClipboardy.read.mockResolvedValue('');

      const result = await service.paste();

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        content: '',
        isEmpty: true,
        contentLength: 0,
      });
    });

    it('should handle clipboardy read errors', async () => {
      mockedClipboardy.read.mockRejectedValue(new Error('Read failed'));

      const result = await service.paste();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Clipboard paste error: Read failed');
    });

    it('should handle non-Error exceptions in paste', async () => {
      mockedClipboardy.read.mockRejectedValue('Unknown error');

      const result = await service.paste();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Clipboard paste error: Unknown error');
    });
  });

  describe('clear', () => {
    it('should clear clipboard successfully', async () => {
      mockedClipboardy.write.mockResolvedValue();

      const result = await service.clear();

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        cleared: true,
      });
      expect(mockedClipboardy.write).toHaveBeenCalledWith('');
    });

    it('should handle clipboardy clear errors', async () => {
      mockedClipboardy.write.mockRejectedValue(new Error('Clear failed'));

      const result = await service.clear();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Clipboard clear error: Clear failed');
    });

    it('should handle non-Error exceptions in clear', async () => {
      mockedClipboardy.write.mockRejectedValue('Unknown error');

      const result = await service.clear();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Clipboard clear error: Unknown error');
    });
  });
});
