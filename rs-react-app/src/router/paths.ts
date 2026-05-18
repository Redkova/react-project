export const PagePath = {
  root: '/',
  about: '/about',
  notFound: '/404',
} as const;

export type PagePath = (typeof PagePath)[keyof typeof PagePath];
