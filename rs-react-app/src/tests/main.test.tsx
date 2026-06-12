import { describe, it, expect, vi } from 'vitest';

const renderMock = vi.fn();
const createRootMock = vi.fn(() => ({ render: renderMock }));

vi.mock('react-dom/client', () => ({
  createRoot: createRootMock,
}));

vi.mock('./App.tsx', () => ({
  default: () => null,
}));

vi.mock('./components/errorBoundary/ErrorBoundary.tsx', () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}));

describe('main.tsx', () => {
  it('calls createRoot and render with the React tree', async () => {
    const fakeRoot = {} as HTMLElement;
    vi.spyOn(document, 'getElementById').mockReturnValue(fakeRoot);

    await import('../main.tsx');

    expect(createRootMock).toHaveBeenCalledWith(fakeRoot);
    expect(renderMock).toHaveBeenCalledTimes(1);

    const renderedTree = renderMock.mock.calls[0][0];
    expect(renderedTree).toBeTruthy();

    const strictMode = renderedTree;
    const errorBoundary = strictMode.props.children;
    const app = errorBoundary.props.children;

    expect(strictMode.type).toBeDefined();
    expect(errorBoundary.type).toBeDefined();
    expect(app.type).toBeDefined();
  });
});
