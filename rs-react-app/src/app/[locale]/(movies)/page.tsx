import { ReactElement } from 'react';
import SearchSection from '@/components/layout/search/SearchSection';
import ResultsSection from '@/components/layout/resultSection/ResultSection';

export default function HomePage(): ReactElement {
  return (
    <div className="flex w-full justify-center px-4">
      <div className="w-full max-w-2xl">
        <SearchSection />
        <ResultsSection />
      </div>
    </div>
  );
}
