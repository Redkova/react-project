import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StrictMode } from 'react';
import App from './App';

const renderMock = vi.fn();
const createRootMock = vi.fn(() => ({ render: renderMock }));

vi.mock('react-dom/client', () => ({
  createRoot: createRootMock,
}));

describe('main entry file', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `<div id="root"></div>`;
  });

  it('renders App inside StrictMode', async () => {
    await import('./main');

    expect(createRootMock).toHaveBeenCalledTimes(1);

    const root = document.getElementById('root');
    expect(createRootMock).toHaveBeenCalledWith(root);

    expect(renderMock).toHaveBeenCalledTimes(1);

    const rendered = renderMock.mock.calls[0][0];

    expect(rendered.type).toBe(StrictMode);
    expect(rendered.props.children.type).toBe(App);
  });
});
