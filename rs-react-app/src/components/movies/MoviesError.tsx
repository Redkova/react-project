'use client';

import { ReactElement } from 'react';

interface Props {
  message: string;
}
function MovieError({ message }: Props): ReactElement {
  return (
    <p className="mt-4 text-sm text-(--error-text) bg-(--error-text-bg) border border-red-300 px-4 py-2 rounded-md text-center">
      {message}
    </p>
  );
}

export default MovieError;
