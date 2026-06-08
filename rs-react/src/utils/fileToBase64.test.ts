import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fileToBase64 } from './fileToBase64';

interface MockFileReaderInstance {
  onload: null | (() => void);
  onerror: null | ((e: unknown) => void);
  readAsDataURL: ReturnType<typeof vi.fn>;
  result: string | null;
}

describe('fileToBase64', () => {
  let mockInstance: MockFileReaderInstance;

  beforeEach(() => {
    mockInstance = {
      onload: null,
      onerror: null,
      readAsDataURL: vi.fn(),
      result: null,
    };

    class MockFileReader {
      onload: null | (() => void) = null;
      onerror: null | ((e: unknown) => void) = null;
      result: string | null = null;

      readAsDataURL = mockInstance.readAsDataURL;

      constructor() {
        return mockInstance;
      }
    }

    vi.stubGlobal('FileReader', MockFileReader);
  });

  it('resolves with base64 string when FileReader succeeds', async () => {
    const file = new File(['hello'], 'test.txt', {
      type: 'text/plain',
    });

    const promise = fileToBase64(file);

    mockInstance.result = 'data:text/plain;base64,aGVsbG8=';
    mockInstance.onload?.();

    await expect(promise).resolves.toBe('data:text/plain;base64,aGVsbG8=');

    expect(mockInstance.readAsDataURL).toHaveBeenCalledWith(file);
  });

  it('rejects when FileReader errors', async () => {
    const file = new File(['oops'], 'error.txt', {
      type: 'text/plain',
    });

    const promise = fileToBase64(file);

    const error = new Error('File read error');
    mockInstance.onerror?.(error);

    await expect(promise).rejects.toThrow('File read error');
  });

  it('calls readAsDataURL exactly once', () => {
    const file = new File(['abc'], 'file.txt', {
      type: 'text/plain',
    });

    fileToBase64(file);

    expect(mockInstance.readAsDataURL).toHaveBeenCalledTimes(1);
    expect(mockInstance.readAsDataURL).toHaveBeenCalledWith(file);
  });
});
