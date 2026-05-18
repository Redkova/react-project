import { vi } from 'vitest';

export function mockReactRouter() {
  vi.mock('react-router', async () => {
    const actual =
      await vi.importActual<typeof import('react-router')>('react-router');

    return {
      ...actual,

      useSearchParams: vi.fn(),
      useNavigate: () => vi.fn(),

      Link: function LinkMock(props: {
        to: string;
        children: React.ReactNode;
      }) {
        return <a href={props.to}>{props.children}</a>;
      },
    };
  });
}
